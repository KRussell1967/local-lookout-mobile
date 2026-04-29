export type ApprovalStatus = "pending" | "approved" | "rejected";
export type Role = "staff" | "manager" | "admin" | "resident";

export interface Profile {
  id: string;
  email: string | null;
  role: Role | string;
  network_id: string | null;
  organization_id: string | null;
  approval_status: ApprovalStatus | string;
  created_at?: string;
}

export interface Network {
  id: string;
  name: string;
  is_active?: boolean;
}

export interface Organization {
  id: string;
  name: string;
  network_id: string;
}
