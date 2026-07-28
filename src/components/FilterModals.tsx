"use client";

import { useState } from "react";
import { Modal, Checkbox, Button, Space } from "antd";

const productOptions = ["All", "Judgement", "Interim Order", "Other"];

interface ProductFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (selected: string[]) => void;
}

export function ProductFilterModal({
  open,
  onClose,
  onApply,
}: ProductFilterModalProps) {
  const [checked, setChecked] = useState<string[]>(["All"]);

  const handleReset = () => setChecked([]);

  return (
    <Modal title="Product filter" open={open} onCancel={onClose} width={280} footer={null}>
      <Checkbox.Group
        value={checked}
        onChange={(vals) => setChecked(vals as string[])}
        style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}
      >
        {productOptions.map((option) => (
          <Checkbox key={option} value={option}>
            {option}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button onClick={handleReset}>Reset Filter</Button>
        <Button
          type="primary"
          onClick={() => {
            onApply(checked);
            onClose();
          }}
        >
          Apply
        </Button>
      </Space>
    </Modal>
  );
}

const tagOptions = [
  "Subscription Pending",
  "Nakul",
  "Follow up case for Details",
  "Add Case",
  "Aadhaar Verified",
  "Autopay Concern",
  "Background Check for Case",
  "Call Back",
  "Case Added",
  "Gouri",
];

interface TagsQuickFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (selected: string[]) => void;
}

export function TagsQuickFilterModal({
  open,
  onClose,
  onApply,
}: TagsQuickFilterModalProps) {
  const [checked, setChecked] = useState<string[]>([]);

  const handleReset = () => setChecked([]);

  return (
    <Modal title="tags quick filter" open={open} onCancel={onClose} width={280} footer={null}>
      <Checkbox.Group
        value={checked}
        onChange={(vals) => setChecked(vals as string[])}
        style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}
      >
        {tagOptions.map((option) => (
          <Checkbox key={option} value={option}>
            {option}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button onClick={handleReset}>Reset Filter</Button>
        <Button
          type="primary"
          onClick={() => {
            onApply(checked);
            onClose();
          }}
        >
          Apply
        </Button>
      </Space>
    </Modal>
  );
}
