import { ConfigProvider, Menu, MenuProps, Tooltip } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Key, useState } from "react";

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>["items"][number];

  const menuItems: MenuItem[] = [
    {
      key: "1",
      label: <h1 className="force-link">Home</h1>,
      onClick: () => navigate("/"),
    },
    {
      key: "3",
      label: <h1 className="force-link">Posts</h1>,
      onClick: () => navigate("/posts"),
    },
  ];

  const onClick = (item: MenuItem) => {
    setCurrent(item?.key);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemBg: "transparent",
            darkItemSelectedBg: "transparent",
            darkItemSelectedColor: "var(--link-color-hover)",
          },
        },
      }}
    >
      <div className="nav-bar-container">
        <Menu
          mode="horizontal"
          theme="dark"
          items={menuItems}
          selectedKeys={[current]}
          className="nav-bar-items"
          onClick={(item) => onClick(item)}
        />
        <div className="right-navbar">
          <Tooltip title="Shopping Cart">
            <ShoppingCartOutlined
              style={{
                fontSize: "2rem",
                marginRight: "2rem",
              }}
              className="force-link"
            />
          </Tooltip>

          <Tooltip title="Go To Profile">
            <UserOutlined
              style={{ fontSize: "2rem", color: "var(--link-color)" }}
              className="force-link"
            />
          </Tooltip>
        </div>
      </div>
    </ConfigProvider>
  );
}
