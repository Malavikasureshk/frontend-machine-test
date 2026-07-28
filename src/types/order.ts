export interface OrderDetails {
  applicant: string;
  caseNumber: string;
  caseName: string;
  cnrNumber: string;
  courtEstablishment: string;
  documentType: string;
  orderNumber: string;
  orderDate: string;
  orderId?: string;
  trackingId?: string;
  paymentCompleted?: string;
  orderPlaced?: string;
  assigned?: string;
  applied?: string;
  dispatched?: string;
  delivered?: string;
  address?: {
    pincode: string;
    line1: string;
    line2: string;
    city: string;
    district: string;
    state: string;
    country: string;
  };
}

export interface OrderRecord {
  key: string;
  userInfo: string;
  phone: string;
  courtComplex: string;
  product: string;
  productNumber: string;
  orderDate: string;
  time: string;
  status: string;
  tags: string[];
  clerk: string;
  details: OrderDetails;
}