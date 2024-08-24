export class RajaOngkirWaybillModel {
  delivered?: boolean;
  summary?: Summary;
  details?: Details;
  delivery_status?: DeliveryStatus;
  manifest?: Manifest[];
}

export interface DeliveryStatus {
  status?: string;
  pod_receiver?: string;
  pod_date?: Date | string;
  pod_time?: string;
}

export interface Details {
  waybill_number?: string;
  waybill_date?: Date | string;
  waybill_time?: string;
  weight?: string;
  origin?: string;
  destination?: string;
  shippper_name?: string;
  shipper_address1?: string;
  shipper_address2?: null;
  shipper_address3?: null;
  shipper_city?: string;
  receiver_name?: string;
  receiver_address1?: string;
  receiver_address2?: string;
  receiver_address3?: string;
  receiver_city?: string;
}

export interface Manifest {
  manifest_code?: string;
  manifest_description?: string;
  manifest_date?: Date | string;
  manifest_time?: string;
  city_name?: string;
}

export interface Summary {
  courier_code?: string;
  courier_name?: string;
  waybill_number?: string;
  service_code?: string;
  waybill_date?: Date | string;
  shipper_name?: string;
  receiver_name?: string;
  origin?: string;
  destination?: string;
  status?: string;
}
