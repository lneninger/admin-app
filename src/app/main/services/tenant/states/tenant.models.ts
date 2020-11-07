


export interface TenantStateModel {
  globalTenants: Tenant[];
  defaultTenants: string[];
}

export interface Tenant {
  id: number;
  // name: string;
  tenantName: string;
}
