"use client";

import { Modal, Form, Select, Checkbox, Button, Space } from "antd";

interface FilterUsersModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (values: FilterUsersValues) => void;
}

export interface FilterUsersValues {
  district?: string;
  courtEstablishment?: string;
  product?: string;
  testUsersOnly?: boolean;
}

const { Option } = Select;

export default function FilterUsersModal({
  open,
  onClose,
  onApply,
}: FilterUsersModalProps) {
  const [form] = Form.useForm<FilterUsersValues>();

  const handleApply = () => {
    form
      .validateFields()
      .then((values) => {
        onApply(values);
        onClose();
      })
      .catch(() => {
        // validation errors shown inline by antd
      });
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      title="Filter Users"
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label="District"
          name="district"
          rules={[{ required: true, message: "Please select a district" }]}
        >
          <Select placeholder="Choose District">
            <Option value="thrissur">Thrissur</Option>
            <Option value="ernakulam">Ernakulam</Option>
            <Option value="kochi">Kochi</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Court Establishment" name="courtEstablishment">
          <Select placeholder="Choose Court Establishment">
            <Option value="jfcm1">JFCM 1 District Court Thrissur</Option>
            <Option value="district-court">District Court</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Product" name="product" initialValue="all">
          <Select>
            <Option value="all">All</Option>
            <Option value="judgement">Judgement</Option>
            <Option value="interim-order">Interim Order</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="testUsersOnly" valuePropName="checked">
          <Checkbox>Test Users</Checkbox>
        </Form.Item>

        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button onClick={handleReset}>Reset Filter</Button>
          <Button type="primary" onClick={handleApply}>
            Apply Filter
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}
