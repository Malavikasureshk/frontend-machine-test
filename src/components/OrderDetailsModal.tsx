"use client";

import { Modal, Button, Tabs } from "antd";
import { CopyOutlined } from "@ant-design/icons";

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

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  details: OrderDetails | null;
}

const timelineRows: { label: string; key: keyof OrderDetails }[] = [
  { label: "Order ID", key: "orderId" },
  { label: "Tracking ID", key: "trackingId" },
  { label: "Payment completed", key: "paymentCompleted" },
  { label: "Order placed", key: "orderPlaced" },
  { label: "Assigned", key: "assigned" },
  { label: "Applied", key: "applied" },
  { label: "Dispatched", key: "dispatched" },
  { label: "Delivered", key: "delivered" },
];

const caseFieldRows: { label: string; key: keyof OrderDetails }[] = [
  { label: "APPLICANT", key: "applicant" },
  { label: "CASE NUMBER", key: "caseNumber" },
  { label: "CASE NAME", key: "caseName" },
  { label: "CNR NUMBER", key: "cnrNumber" },
  { label: "COURT ESTABLISHMENT", key: "courtEstablishment" },
  { label: "DOCUMENT TYPE", key: "documentType" },
  { label: "ORDER NUMBER", key: "orderNumber" },
  { label: "ORDER DATE", key: "orderDate" },
];

export default function OrderDetailsModal({
  open,
  onClose,
  details,
}: OrderDetailsModalProps) {
  if (!details) return null;

  const tabItems = [
    {
      key: "case",
      label: "Case & Customer Details",
      children: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {caseFieldRows.map((row) => (
            <div key={row.key}>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>
                {row.label}
              </div>
              <div>{details[row.key] as string}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "address",
      label: "Address",
      children: details.address ? (
        <div style={{ background: "#fafafa", padding: 16, borderRadius: 8 }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: "#888" }}>Pincode: </span>
            {details.address.pincode}
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: "#888" }}>Address Line 1: </span>
            {details.address.line1}
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: "#888" }}>Address Line 2: </span>
            {details.address.line2}
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: "#888" }}>City: </span>
            {details.address.city}
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: "#888" }}>District: </span>
            {details.address.district}
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: "#888" }}>State: </span>
            {details.address.state}
          </div>
          <div>
            <span style={{ color: "#888" }}>Country: </span>
            {details.address.country}
          </div>
        </div>
      ) : (
        <p style={{ color: "#888" }}>No address on file.</p>
      ),
    },
    {
      key: "products",
      label: "Products",
      children: (
        <div>
          <div style={{ fontWeight: 500 }}>{details.documentType}</div>
          <div style={{ color: "#888" }}>Order Number: {details.orderNumber}</div>
        </div>
      ),
    },
    {
      key: "esign",
      label: "Digio eSign Documents",
      children: <p style={{ color: "#888" }}>No eSign documents available yet.</p>,
    },
  ];

  return (
    <Modal
      title="Order Details"
      open={open}
      onCancel={onClose}
      width={520}
      footer={
        <Button icon={<CopyOutlined />} onClick={onClose}>
          Copy Details
        </Button>
      }
    >
      <div style={{ marginBottom: 16 }}>
        {timelineRows.map((row) =>
          details[row.key] ? (
            <div
              key={row.key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
                fontSize: 13,
              }}
            >
              <span style={{ color: "#888" }}>{row.label}:</span>
              <span style={{ fontWeight: 500 }}>{details[row.key] as string}</span>
            </div>
          ) : null
        )}
      </div>

      <Tabs items={tabItems} />
    </Modal>
  );
}
