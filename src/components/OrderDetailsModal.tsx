"use client";

import { Modal, Button } from "antd";
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
}

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  details: OrderDetails | null;
}

const fieldRows: { label: string; key: keyof OrderDetails }[] = [
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

  return (
    <Modal
      title="Order Details"
      open={open}
      onCancel={onClose}
      width={420}
      footer={
        <Button icon={<CopyOutlined />} onClick={onClose}>
          Copy Details
        </Button>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fieldRows.map((row) => (
          <div key={row.key}>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>
              {row.label}
            </div>
            <div>{details[row.key]}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
