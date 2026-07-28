export interface OrderDetails {
  applicant: string;
  caseNumber: string;
  caseName: string;
  cnrNumber: string;
  courtEstablishment: string;
  documentType: string;
  orderNumber: string;
  orderDate: string;
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
