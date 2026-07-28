"use client";

import { Tag, Select, Button, Space } from "antd";
import { FormOutlined } from "@ant-design/icons";

interface TagListProps {
  tags: string[];
  onRemoveTag?: (tag: string) => void;
  onChooseTag?: () => void;
  onEdit?: () => void;
}

const tagColorMap: Record<string, string> = {
  "Subscription Pending": "#5b8aa8",
  Nakul: "#7fae7e",
  "Follow up case for Details": "#c96b4e",
  "Add Case": "#a89a76",
  "Aadhaar Verified": "#c9a83f",
  "Autopay Concern": "#9b8bc4",
  "Background Check for Case": "#5f7fa3",
  "Call Back": "#c98a95",
  "Case Added": "#9aa3ab",
  Gouri: "#5fa88e",
};

export default function TagList({
  tags,
  onRemoveTag,
  onChooseTag,
  onEdit,
}: TagListProps) {
  return (
    <div>
      <Space size={6} style={{ marginBottom: 8 }}>
        <Select
          placeholder="Choose Tag"
          style={{ width: 140, fontWeight: 700 }}
          open={false}
          onClick={onChooseTag}
        />
        <Button icon={<FormOutlined />} onClick={onEdit} />
      </Space>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={(e) => {
              e.preventDefault();
              onRemoveTag?.(tag);
            }}
            style={{
              background: tagColorMap[tag] || "#999",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}
