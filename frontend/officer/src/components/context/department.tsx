// src/types/index.ts (or src/types/department.ts)

// Interface for the metrics within each department
export interface DepartmentMetrics {
  totalRequests?: number;
  voterRegistrationsPending?: number;
  electionResultsInquiries?: number;
  postalVoteApplicationsPending?: number;
  newLicenseApplications?: number;
  licenseRenewalsPending?: number;
  vehicleRegistrationsPending?: number;
  revenueLicensesDue?: number;
  newPassportApplications?: number;
  passportRenewalsPending?: number;
  visaApplicationsPending?: number;
  citizenshipApplicationsInProgress?: number;
  birthCertificatesIssued?: number;
  marriageRegistrationsPending?: number;
  deathCertificatesPending?: number;
  correctionRequestsOpen?: number;
  trend: "up" | "down"; // Explicitly define possible values for trend
}

// Interface for each department's KPI data object
export interface DepartmentKPI {
  department: string;
  icon: string;
  description: string;
  metrics: DepartmentMetrics;
}

// Interface for the props of SectionCards component
export interface SectionCardsProps {
  departmentsToShow: DepartmentKPI[];
}