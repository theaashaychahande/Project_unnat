export type Role = "Citizen" | "Admin";
export type Urgency = "Low" | "Medium" | "High" | "Critical";
export type Status = "Pending" | "In Progress" | "Resolved";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  location: string;
  urgency: Urgency;
  photoUrl?: string;
  date: string;
  status: Status;
  latitude: number;
  longitude: number;
}
