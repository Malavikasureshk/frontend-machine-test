"use client";

import { useState } from "react";
import { Modal, Button, Tag, Space, Form, Input, Radio } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface TagItem {
  name: string;
  color: string;
}

const initialTags: TagItem[] = [
  { name: "Subscription Pending", color: "#5b8aa8" },
  { name: "Nakul", color: "#7fae7e" },
  { name: "Follow up case for Details", color: "#c96b4e" },
  { name: "Add Case", color: "#a89a76" },
  { name: "Aadhaar Verified", color: "#c9a83f" },
  { name: "Autopay Concern", color: "#9b8bc4" },
  { name: "Background Check for Case", color: "#5f7fa3" },
  { name: "Call Back", color: "#c98a95" },
  { name: "Case Added", color: "#9aa3ab" },
  { name: "Gouri", color: "#5fa88e" },
];

const colorOptions = [
  "#5b8aa8",
  "#7fae7e",
  "#c96b4e",
  "#a89a76",
  "#c9a83f",
  "#9b8bc4",
  "#5f7fa3",
  "#c98a95",
  "#9aa3ab",
  "#5fa88e",
  "#5c1f3a",
];

interface ChooseTagModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (tags: string[]) => void;
}

export default function ChooseTagModal({
  open,
  onClose,
  onApply,
}: ChooseTagModalProps) {
  const [tags, setTags] = useState<TagItem[]>(initialTags);
  const [selected, setSelected] = useState<string[]>([]);
  const [createOpen, setCreateOpen] = useState(false);

  const toggleTag = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const handleDelete = (name: string) => {
    setTags((prev) => prev.filter((t) => t.name !== name));
  };

  const handleCreateTag = (newTag: TagItem) => {
    setTags((prev) => [...prev, newTag]);
    setCreateOpen(false);
  };

  return (
    <>
      <Modal
        title="Choose tag"
        open={open}
        onCancel={onClose}
        width={340}
        footer={
          <Button type="primary" block onClick={() => onApply(selected)}>
            Add Tag
          </Button>
        }
      >
        <Button
          block
          style={{ marginBottom: 12 }}
          onClick={() => setCreateOpen(true)}
        >
          + Create New Tag
        </Button>
        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {tags.map((tag) => (
            <div
              key={tag.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
              }}
            >
              <Tag
                style={{
                  cursor: "pointer",
                  marginRight: 8,
                  background: tag.color,
                  color: "#fff",
                  border: "none",
                }}
                onClick={() => toggleTag(tag.name)}
              >
                {selected.includes(tag.name) ? "✓ " : ""}
                {tag.name}
              </Tag>
              <Space>
                <EditOutlined style={{ color: "#888", cursor: "pointer" }} />
                <DeleteOutlined
                  style={{ color: "#888", cursor: "pointer" }}
                  onClick={() => handleDelete(tag.name)}
                />
              </Space>
            </div>
          ))}
        </div>
      </Modal>

      <CreateNewTagModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateTag}
      />
    </>
  );
}

interface CreateNewTagModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (tag: TagItem) => void;
}

function CreateNewTagModal({
  open,
  onClose,
  onCreate,
}: CreateNewTagModalProps) {
  const [form] = Form.useForm<{ name: string; color: string }>();

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate({ name: values.name, color: values.color });
        form.resetFields();
      })
      .catch(() => {
        // validation errors shown inline
      });
  };

  return (
    <Modal
      title="Support Tags"
      open={open}
      onCancel={onClose}
      width={380}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAdd}>
          Add Tag
        </Button>,
      ]}
    >
      <p style={{ color: "#888", marginBottom: 16 }}>Create new tags here</p>
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label="New Tag Name"
          name="name"
          rules={[{ required: true, message: "Please enter a tag name" }]}
        >
          <Input placeholder="Enter Tag Name" />
        </Form.Item>
        <Form.Item
          label="Choose Tag Color"
          name="color"
          rules={[{ required: true, message: "Please choose a color" }]}
        >
          <Radio.Group>
            <Space wrap>
              {colorOptions.map((color) => (
                <Radio.Button
                  key={color}
                  value={color}
                  style={{ background: color, width: 28, height: 28 }}
                />
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
