export interface zone {
  id: number;
  operator: string;
  zone_details?: {
    zone_name?: string;
    zone_price?: number;
  };
}
