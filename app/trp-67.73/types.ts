export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  portfolio: string;
  domains: string[];
  why: string;
  date: string;
  status: "New" | "Reviewing" | "Shortlisted" | "Rejected" | "Accepted";
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  date: string;
  status: "New" | "Read" | "In Progress" | "Replied" | "Closed";
}

export interface ChartPoint {
  label: string;
  views: number;
  unique: number;
}

export interface AnalyticsData {
  views: ChartPoint[];
  uniqueViews: number;
  totalViews: number;
  conversionLeads: number;
}
