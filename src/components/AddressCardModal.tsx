"use client";

import { Modal, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";

export interface AddressInfo {
  name: string;
  line1: string;
  line2: string;
  phone: string;
}

interface AddressCardModalProps {
  open: boolean;
  onClose: () => void;
  address: AddressInfo | null;
}

export default function AddressCardModal({
  open,
  onClose,
  address,
}: AddressCardModalProps) {
  if (!address) return null;

  return (
    <Modal
      title="Address format"
      open={open}
      onCancel={onClose}
      width={320}
      footer={
        <Button icon={<CopyOutlined />} onClick={onClose}>
          Copy Address
        </Button>
      }
    >
      <div style={{ lineHeight: 1.6 }}>
        <div style={{ fontWeight: 600 }}>{address.name}</div>
        <div>{address.line1}</div>
        <div>{address.line2}</div>
        <div>{address.phone}</div>
      </div>
    </Modal>
  );
}
