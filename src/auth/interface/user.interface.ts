interface Address {
  addr1?: string;
  addr2?: string;
  city?: string;
  state?: string;
  zip?: number;
}

export interface User {
  id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  mobile: string;
  isActive: boolean;
  
}


export interface GuestUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  
}