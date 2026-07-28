"use client";

import { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ShareAltOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  SwapOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { OrderRecord } from "@/types/order";
import { mockOrders } from "@/data/mockOrders";
import OrderStatusTag from "@/components/OrderStatusTag";
import TagList from "@/components/TagList";
import FilterUsersModal, { FilterUsersValues } from "@/components/FilterUsersModal";
import ChooseTagModal from "@/components/TagModals";
import OrderDetailsModal from "@/components/OrderDetailsModal";
import { ProductFilterModal, TagsQuickFilterModal } from "@/components/FilterModals";
import AddressCardModal, { AddressInfo } from "@/components/AddressCardModal";
import ShareModal from "@/components/ShareModal";
import AssignClerkModal from "@/components/AssignClerkModal";

const sampleAddress: AddressInfo = {
  name: "Laisamma George",
  line1: "67/67A flat no D 1st floor,",
  line2: "attaniyathu road vemala, Kochi, Kerala, 654321",
  phone: "+91 9876543210",
};

const tabItems = [
  { key: "1", label: "Orders (121)" },
  { key: "2", label: "Clerks (44)" },
  { key: "3", label: "Counts (32)" },
  { key: "4", label: "Districts (14)" },
  { key: "5", label: "Eligible Users (11)" },
];

export default function Home() {
  const [orders, setOrders] = useState<OrderRecord[]>(mockOrders);
  const [activeTab, setActiveTab] = useState("1");
  const [filterOpen, setFilterOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [activeRowKey, setActiveRowKey] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState<OrderRecord | null>(null);
  const [productFilterOpen, setProductFilterOpen] = useState(false);
  const [tagsQuickFilterOpen, setTagsQuickFilterOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareOrderNumber, setShareOrderNumber] = useState<string>("");
  const [assignOpen, setAssignOpen] = useState(false);

  const handleApplyFilter = (values: FilterUsersValues) => {
    console.log("Applied filters:", values);
  };

  const openTagModal = (rowKey: string) => {
    setActiveRowKey(rowKey);
    setTagModalOpen(true);
  };

  const handleApplyTags = (selectedTags: string[]) => {
    if (activeRowKey) {
      setOrders((prev) =>
        prev.map((o) =>
          o.key === activeRowKey
            ? { ...o, tags: Array.from(new Set([...o.tags, ...selectedTags])) }
            : o
        )
      );
    }
    setTagModalOpen(false);
  };

  const handleRemoveTag = (rowKey: string, tag: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.key === rowKey ? { ...o, tags: o.tags.filter((t) => t !== tag) } : o
      )
    );
  };

  const openDetailsModal = (record: OrderRecord) => {
    setActiveRecord(record);
    setDetailsOpen(true);
  };

  const openShareModal = (orderNumber: string) => {
    setShareOrderNumber(orderNumber);
    setShareOpen(true);
  };

  const handleAssignPersonnel = (selectedIds: string[]) => {
    console.log("Assigned personnel:", selectedIds);
    setAssignOpen(false);
  };

  const boldText: React.CSSProperties = { fontWeight: 700 };

  const columns: ColumnsType<OrderRecord> = [
    {
      title: "#",
      key: "rowNumber",
      width: 40,
      render: (_, __, index) => <span style={boldText}>{index + 1}</span>,
    },
    {
      title: "USER INFO",
      dataIndex: "userInfo",
      key: "userInfo",
      render: (text, record) => (
        <div>
          <div style={boldText}>{text}</div>
          <div style={{ fontSize: 12, color: "#888", fontWeight: 700 }}>
            {record.phone}
          </div>
          <Button
            size="small"
            icon={<EnvironmentOutlined />}
            style={{ marginTop: 4, fontWeight: 700 }}
            onClick={() => setAddressOpen(true)}
          >
            Copy Address
          </Button>
        </div>
      ),
    },
    {
      title: "COURT COMPLEX",
      dataIndex: "courtComplex",
      key: "courtComplex",
      render: (text) => <span style={boldText}>{text}</span>,
    },
    {
      title: "PRODUCTS",
      dataIndex: "product",
      key: "product",
      render: (text, record) => (
        <div>
          <div style={boldText}>{text}</div>
          <div style={{ fontSize: 12, color: "#888", fontWeight: 700 }}>
            {record.productNumber}
          </div>
        </div>
      ),
    },
    {
      title: (
        <span>
          ORDER DATE <CalendarOutlined />
        </span>
      ),
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text, record) => (
        <div>
          <div style={boldText}>{text}</div>
          <div style={{ fontSize: 12, color: "#888", fontWeight: 700 }}>
            {record.time}
          </div>
        </div>
      ),
    },
    {
      title: (
        <span>
          STATUS <SwapOutlined rotate={90} />
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status: string) => <OrderStatusTag status={status} />,
    },
    {
      title: "ORDER DETAILS/E-SIGN",
      key: "actions",
      render: (_, record) => (
        <Space direction="vertical" size={4}>
          <Button
            size="small"
            style={{ fontWeight: 700 }}
            onClick={() => openDetailsModal(record)}
          >
            View
          </Button>
          <Button size="small" icon={<EyeOutlined />} style={{ fontWeight: 700 }}>
            E-sign
          </Button>
        </Space>
      ),
    },
    {
      title: (
        <span>
          TAGS / NOTE <SwapOutlined rotate={90} />
        </span>
      ),
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[], record) => (
        <TagList
          tags={tags}
          onChooseTag={() => openTagModal(record.key)}
          onEdit={() => openTagModal(record.key)}
          onRemoveTag={(tag) => handleRemoveTag(record.key, tag)}
        />
      ),
    },
    {
      title: (
        <span>
          CLERK <SwapOutlined rotate={90} />
        </span>
      ),
      dataIndex: "clerk",
      key: "clerk",
      render: (clerk: string, record) =>
        clerk ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={boldText}>{clerk}</span>
            <Button
              type="text"
              size="small"
              icon={<ShareAltOutlined />}
              onClick={() => openShareModal(record.productNumber)}
            />
          </div>
        ) : (
          <Button
            size="small"
            style={{ fontWeight: 700 }}
            onClick={() => setAssignOpen(true)}
          >
            Assign
          </Button>
        ),
    },
  ];

  return (
    <div style={{ background: "#f5f6f8", minHeight: "100vh", padding: 24 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontWeight: 700 }}>
              Certified True Copy (47834)
            </h2>
            <p style={{ margin: 0, color: "#888", fontWeight: 700 }}>
              Manage Your CTC Orders Here
            </p>
          </div>
          <Space>
            <Button icon={<ShareAltOutlined />} shape="circle" />
            <Button icon={<FilterOutlined />} shape="circle" onClick={() => setFilterOpen(true)} />
            <Input
              placeholder="Search"
              suffix={<SearchOutlined />}
              style={{ width: 200, fontWeight: 700 }}
            />
          </Space>
        </div>

        <div
          style={{
            display: "inline-flex",
            background: "#fff",
            borderRadius: 999,
            border: "1px solid #222",
            padding: 4,
            marginBottom: 16,
          }}
        >
          {tabItems.map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "8px 20px",
                borderRadius: 999,
                cursor: "pointer",
                fontWeight: 700,
                background: activeTab === tab.key ? "#1a1a1a" : "transparent",
                color: activeTab === tab.key ? "#fff" : "#1a1a1a",
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 12 }}>
          <Space>
            <Button style={{ fontWeight: 700 }} onClick={() => setProductFilterOpen(true)}>
              Product Filter
            </Button>
            <Button style={{ fontWeight: 700 }} onClick={() => setTagsQuickFilterOpen(true)}>
              Tags Filter
            </Button>
          </Space>
        </div>

        <div style={{ background: "#fff", borderRadius: 8, padding: 16 }}>
          <Table
            columns={columns}
            dataSource={orders}
            pagination={{ total: 4810, pageSize: 1 }}
            scroll={{ x: true }}
            expandable={{
              expandedRowRender: (record) => (
                <div style={{ padding: 12, background: "#fafafa" }}>
                  <strong>Case:</strong> {record.details.caseName} <br />
                  <strong>CNR:</strong> {record.details.cnrNumber} <br />
                  <strong>Document Type:</strong> {record.details.documentType}
                </div>
              ),
            }}
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

      <ProductFilterModal
        open={productFilterOpen}
        onClose={() => setProductFilterOpen(false)}
        onApply={(selected) => console.log("Product filter applied:", selected)}
      />

      <TagsQuickFilterModal
        open={tagsQuickFilterOpen}
        onClose={() => setTagsQuickFilterOpen(false)}
        onApply={(selected) => console.log("Tags quick filter applied:", selected)}
      />

      <AddressCardModal
        open={addressOpen}
        onClose={() => setAddressOpen(false)}
        address={sampleAddress}
      />

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        orderNumber={shareOrderNumber}
      />

      <AssignClerkModal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        onAssign={handleAssignPersonnel}
      />
    </div>
  );
}
