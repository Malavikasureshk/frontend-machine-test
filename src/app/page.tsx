"use client";

import { useState } from "react";
import { Table, Tabs, Input, Button, Space } from "antd";
import { SearchOutlined, FilterOutlined, UploadOutlined, TagOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { OrderRecord } from "@/types/order";
import { mockOrders } from "@/data/mockOrders";
import OrderStatusTag from "@/components/OrderStatusTag";
import TagList from "@/components/TagList";
import FilterUsersModal, { FilterUsersValues } from "@/components/FilterUsersModal";
import ChooseTagModal from "@/components/TagModals";
import OrderDetailsModal from "@/components/OrderDetailsModal";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [activeRowKey, setActiveRowKey] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState<OrderRecord | null>(null);

  const items = [
    { key: "1", label: "Orders (121)" },
    { key: "2", label: "Clerks (44)" },
    { key: "3", label: "Counts (32)" },
    { key: "4", label: "Districts (14)" },
    { key: "5", label: "Eligible Users (11)" },
  ];

  const handleApplyFilter = (values: FilterUsersValues) => {
    console.log("Applied filters:", values);
  };

  const openTagModal = (rowKey: string) => {
    setActiveRowKey(rowKey);
    setTagModalOpen(true);
  };

  const handleApplyTags = (selectedTags: string[]) => {
    console.log("Applied tags for row", activeRowKey, selectedTags);
    setTagModalOpen(false);
  };

  const openDetailsModal = (record: OrderRecord) => {
    setActiveRecord(record);
    setDetailsOpen(true);
  };

  const columns: ColumnsType<OrderRecord> = [
    {
      title: "USER INFO",
      dataIndex: "userInfo",
      key: "userInfo",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{record.phone}</div>
        </div>
      ),
    },
    {
      title: "COURT COMPLEX",
      dataIndex: "courtComplex",
      key: "courtComplex",
    },
    {
      title: "PRODUCTS",
      dataIndex: "product",
      key: "product",
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{record.productNumber}</div>
        </div>
      ),
    },
    {
      title: "ORDER DATE",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{record.time}</div>
        </div>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <OrderStatusTag status={status} />,
    },
    {
      title: "TAGS/NOTES",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[], record) => (
        <Space orientation="vertical" size={4}>
          <TagList tags={tags} />
          <Button
            size="small"
            icon={<TagOutlined />}
            onClick={() => openTagModal(record.key)}
          >
            Choose Tag
          </Button>
        </Space>
      ),
    },
    {
      title: "CLERK",
      dataIndex: "clerk",
      key: "clerk",
      render: (clerk: string) =>
        clerk ? clerk : <Button size="small">Assign</Button>,
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => openDetailsModal(record)}>
            View
          </Button>
          <Button size="small" icon={<UploadOutlined />}>
            E-sign
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: "#f5f6f8", minHeight: "100vh", padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Certified True Copy (47834)</h2>
            <p style={{ margin: 0, color: "#888" }}>Manage your CTC Orders Here</p>
          </div>
          <Space>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button icon={<FilterOutlined />} onClick={() => setFilterOpen(true)} />
          </Space>
        </div>

        <Tabs defaultActiveKey="1" items={items} />

        <div style={{ background: "#fff", borderRadius: 8, padding: 16 }}>
          <Table
            columns={columns}
            dataSource={mockOrders}
            pagination={{ total: 4810, pageSize: 1 }}
            scroll={{ x: true }}
          />
        </div>
      </div>

      <FilterUsersModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilter}
      />

      <ChooseTagModal
        open={tagModalOpen}
        onClose={() => setTagModalOpen(false)}
        onApply={handleApplyTags}
      />

      <OrderDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        details={activeRecord?.details ?? null}
      />
    </div>
  );
}
