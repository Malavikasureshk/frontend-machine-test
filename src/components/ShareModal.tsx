"use client";

import { Modal, Button, Input, Space } from "antd";
import { CopyOutlined, MailOutlined } from "@ant-design/icons";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  orderNumber?: string;
}

export default function ShareModal({
  open,
  onClose,
  orderNumber,
}: ShareModalProps) {
  const shareLink = `https://courtclick.com/orders/${orderNumber ?? ""}`;

  return (
    <Modal title="Share" open={open} onCancel={onClose} width={380} footer={null}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>
          Shareable link
        </div>
        <Space.Compact style={{ width: "100%" }}>
          <Input value={shareLink} readOnly />
          <Button icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(shareLink)}>
            Copy
          </Button>
        </Space.Compact>
      </div>
      <Button icon={<MailOutlined />} block>
        Share via Email
      </Button>
    </Modal>
  );
}
