import { Tag } from "antd";

interface OrderStatusTagProps {
  status: string;
}

const statusColorMap: Record<string, string> = {
  cancelled: "red",
  "order placed": "orange",
  "payment completed": "green",
};

export default function OrderStatusTag({ status }: OrderStatusTagProps) {
  return <Tag color={statusColorMap[status] || "default"}>{status}</Tag>;
}