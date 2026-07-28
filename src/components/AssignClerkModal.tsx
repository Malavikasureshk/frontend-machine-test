"use client";

import { useState } from "react";
import { Modal, Checkbox, Button, Select, Form, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Clerk {
  id: string;
  name: string;
}

const initialClerks: Clerk[] = [
  { id: "1", name: "Shaman" },
  { id: "2", name: "Shabarinath" },
  { id: "3", name: "Gopalan" },
];

interface AssignClerkModalProps {
  open: boolean;
  onClose: () => void;
  onAssign: (selectedIds: string[]) => void;
}

export default function AssignClerkModal({
  open,
  onClose,
  onAssign,
}: AssignClerkModalProps) {
  const [clerks, setClerks] = useState<Clerk[]>(initialClerks);
  const [selected, setSelected] = useState<string[]>([]);
  const [addClerkOpen, setAddClerkOpen] = useState(false);

  const toggleClerk = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleAddClerk = (clerk: Clerk) => {
    setClerks((prev) => [...prev, clerk]);
    setAddClerkOpen(false);
  };

  return (
    <>
      <Modal
        title="Assign Authorized Personnel"
        open={open}
        onCancel={onClose}
        width={420}
        footer={
          <Button type="primary" block onClick={() => onAssign(selected)}>
            Assign Personnel
          </Button>
        }
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddClerkOpen(true)}
          >
            Add New
          </Button>
        </div>
        <p style={{ color: "#888", marginBottom: 12 }}>
          Select the person who is authorized to collect CTC document.
        </p>
        <Space direction="vertical" style={{ width: "100%" }} size={12}>
          {clerks.map((clerk) => (
            <Checkbox
              key={clerk.id}
              checked={selected.includes(clerk.id)}
              onChange={() => toggleClerk(clerk.id)}
            >
              {clerk.name}
            </Checkbox>
          ))}
        </Space>

        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, marginBottom: 8 }}>More Clerks</div>
          <Select
            placeholder="Choose Clerks"
            style={{ width: "100%" }}
            options={clerks.map((c) => ({ label: c.name, value: c.id }))}
          />
        </div>
      </Modal>

      <AddClerkModal
        open={addClerkOpen}
        onClose={() => setAddClerkOpen(false)}
        onAdd={handleAddClerk}
      />
    </>
  );
}

interface AddClerkModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (clerk: Clerk) => void;
}

function AddClerkModal({ open, onClose, onAdd }: AddClerkModalProps) {
  const [form] = Form.useForm<{ name: string; phone: string; clerkId: string }>();

  const handleAddSave = () => {
    form
      .validateFields()
      .then((values) => {
        onAdd({ id: values.clerkId, name: values.name });
        form.resetFields();
      })
      .catch(() => {
        // validation errors shown inline
      });
  };

  return (
    <Modal
      title="Add Clerk"
      open={open}
      onCancel={onClose}
      width={480}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleAddSave}>
          Add & Save
        </Button>,
      ]}
    >
      <p style={{ color: "#888", marginBottom: 16 }}>
        Add a new authorized person by providing details
      </p>
      <Form form={form} layout="vertical" requiredMark="optional">
        <div style={{ display: "flex", gap: 16 }}>
          <Form.Item
            label="Clerk Name"
            name="name"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please enter clerk name" }]}
          >
            <Input placeholder="Enter clerk name" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="+91" />
          </Form.Item>
        </div>
        <Form.Item
          label="Clerk ID"
          name="clerkId"
          rules={[{ required: true, message: "Please enter clerk ID" }]}
        >
          <Input placeholder="Enter Clerk ID" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
