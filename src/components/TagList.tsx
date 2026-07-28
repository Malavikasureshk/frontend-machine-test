import { Tag, Space } from "antd";

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <Space size={[4, 4]} wrap>
      {tags.map((tag) => (
        <Tag key={tag} color="purple">
          {tag}
        </Tag>
      ))}
    </Space>
  );
}