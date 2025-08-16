// src/data/departmentKPIs.ts

import { DepartmentKPI } from '@/components/context/department'; // Import the interface
import { useUser } from '../context/UserContext'; // Import useUser hook
import { useState, useEffect } from 'react';

// Define types for API responses
interface ServiceRequest {
    id: string;
    serviceId: string;
    requestedById: string;
    status: string;
    submittedAt: string;
    completedAt: string | null;
}

interface Service {
    id: string;
    serviceName: string;
    description: string;
    requirements: string;
    processingTime: number;
    feeAmount: number;
    departmentId: string;
}

const useDepartmentKPIs = () => {
    const { userData } = useUser();
    const [kpis, setKpis] = useState<DepartmentKPI[]>([]);

    useEffect(() => {
        const fetchKPIs = async () => {
            if (!userData || !userData.departmentId) {
                setKpis([]); // Clear KPIs if no user data or department ID
                return;
            }

            try {
                // Fetch Service Requests
                const serviceRequestsResponse = await fetch('http://localhost:5102/api/ServiceRequest');
                if (!serviceRequestsResponse.ok) throw new Error('Failed to fetch service requests');
                const serviceRequests: ServiceRequest[] = await serviceRequestsResponse.json();

                // Fetch Services
                const servicesResponse = await fetch('http://localhost:5102/api/Service');
                if (!servicesResponse.ok) throw new Error('Failed to fetch services');
                const services: Service[] = await servicesResponse.json();

                const userDepartmentId = userData.departmentId;

                // Map services by ID for quick lookup
                const serviceMap = new Map<string, Service>();
                services.forEach(service => serviceMap.set(service.id, service));

                // Filter service requests relevant to the user's department
                const filteredServiceRequests = serviceRequests.filter(request => {
                    const service = serviceMap.get(request.serviceId);
                    return service && service.departmentId === userDepartmentId;
                });

                // Get the department name for the current user
                const currentDepartmentService = services.find(service => service.departmentId === userDepartmentId);
                const currentDepartmentName = currentDepartmentService?.departmentId ? getDepartmentNameById(currentDepartmentService.departmentId) : "Unknown Department";
                const currentDepartmentIcon = getDepartmentIconByName(currentDepartmentName);


                // Initialize metrics for the current department
                let departmentMetrics: DepartmentKPI = {
                    department: currentDepartmentName,
                    icon: currentDepartmentIcon,
                    description: `Key operational metrics for ${currentDepartmentName}.`,
                    metrics: {
                        totalRequests: filteredServiceRequests.length,
                        trend: "up" // Default trend, can be made dynamic based on historical data
                    }
                };
                
                // Calculate specific KPIs based on department and service names
                switch (currentDepartmentName) {
                    case "Election Commission of Sri Lanka":
                        departmentMetrics.metrics.voterRegistrationsPending = filteredServiceRequests.filter(req => 
                            serviceMap.get(req.serviceId)?.serviceName === "Voter Registration and Amendments" && req.status === "pending"
                        ).length;
                        departmentMetrics.metrics.electionResultsInquiries = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Inquiring Election Results"
                        ).length;
                        departmentMetrics.metrics.postalVoteApplicationsPending = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Application for Postal Voting" && req.status === "pending"
                        ).length;
                        break;
                    case "Department of Motor Traffic":
                        departmentMetrics.metrics.newLicenseApplications = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "New Driving License Application" && req.status === "pending"
                        ).length;
                        departmentMetrics.metrics.licenseRenewalsPending = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Driving License Renewal" && req.status === "pending"
                        ).length;
                        departmentMetrics.metrics.vehicleRegistrationsPending = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Vehicle Registration" && req.status === "pending"
                        ).length;
                        departmentMetrics.metrics.revenueLicensesDue = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Revenue License Renewal" && req.status === "pending"
                        ).length;
                        break;
                    case "Department of Immigration & Emigration":
                        departmentMetrics.metrics.newPassportApplications = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "New Passport Application" && req.status === "pending"
                        ).length;
                        departmentMetrics.metrics.passportRenewalsPending = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Passport Renewal" && req.status === "pending"
                        ).length;
                        departmentMetrics.metrics.visaApplicationsPending = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName.includes("Visa Applications") && req.status === "pending"
                        ).length;
                        departmentMetrics.metrics.citizenshipApplicationsInProgress = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName.includes("Citizenship Application") && req.status === "pending"
                        ).length;
                        break;
                    case "Registrar General's Department":
                        departmentMetrics.metrics.birthCertificatesIssued = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Obtaining Birth Certificates" && req.status === "completed"
                        ).length;
                        departmentMetrics.metrics.marriageRegistrationsPending = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Registration of Births, Marriages, and Deaths" && req.status === "pending" && new Date(req.submittedAt).getFullYear() === new Date().getFullYear() // Example for current year
                        ).length;
                        departmentMetrics.metrics.deathCertificatesPending = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Obtaining Death Certificates" && req.status === "pending"
                        ).length;
                        departmentMetrics.metrics.correctionRequestsOpen = filteredServiceRequests.filter(req =>
                            serviceMap.get(req.serviceId)?.serviceName === "Correction of Errors in Certificates" && req.status === "pending"
                        ).length;
                        break;
                    default:
                        // No specific KPIs for other departments
                        break;
                }

                setKpis([departmentMetrics]); // Only show KPIs for the user's department

            } catch (error) {
                console.error('Error fetching department KPIs:', error);
                setKpis([]); // Set to empty on error
            }
        };

        fetchKPIs();
    }, [userData]); // Re-run when userData changes

    return kpis;
};

// Helper function to map departmentId to department name
const getDepartmentNameById = (departmentId: string): string => {
    switch (departmentId) {
        case "66c1f1a0b7e2d9a5c8f3e1b4": return "Election Commission of Sri Lanka";
        case "66c1f1a0b7e2d9a5c8f3e1b5": return "Department of Motor Traffic";
        case "66c1f1a0b7e2d9a5c8f3e1b6": return "Department of Immigration & Emigration";
        case "66c1f1a0b7e2d9a5c8f3e1b7": return "Registrar General's Department";
        default: return "Unknown Department";
    }
};

// Helper function to get department icon by name
const getDepartmentIconByName = (departmentName: string): string => {
    switch (departmentName) {
        case "Election Commission of Sri Lanka": return "🗳️";
        case "Department of Motor Traffic": return "🚗";
        case "Department of Immigration & Emigration": return "🛂";
        case "Registrar General's Department": return "📜";
        default: return "🏢"; // Default icon
    }
};

export default useDepartmentKPIs;