"use client";

import Image from "next/image";
import {
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  FolderOutlined,
  BankOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const navItems = [
  { key: "apps", icon: <AppstoreOutlined /> },
  { key: "team", icon: <TeamOutlined /> },
  { key: "user", icon: <UserOutlined />, active: true },
  { key: "file", icon: <FileTextOutlined /> },
  { key: "folder", icon: <FolderOutlined /> },
  { key: "bank", icon: <BankOutlined /> },
  { key: "more", icon: <MoreOutlined /> },
];

export default function Sidebar() {
  return (
    <div
      className="app-sidebar"
      style={{
        width: 64,
        minHeight: "100vh",
        background: "#141414",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 0,
        gap: 20,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <Image src="/logo_1.png" alt="Court Click logo" width={64} height={64} />
      </div>

      {navItems.map((item) => (
        <div
          key={item.key}
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            background: item.active ? "#fadb14" : "transparent",
            color: item.active ? "#141414" : "#8c8c8c",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
