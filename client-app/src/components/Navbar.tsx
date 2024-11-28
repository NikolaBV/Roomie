import { ConfigProvider, Menu, MenuProps, Tooltip } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Key, useState } from "react";

export default function Navbar() {
  const [current, setCurrent] = useState<Key | undefined>("");
  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>["items"][number];

  const menuItems: MenuItem[] = [
    {
      key: "1",
      label: <p className="heading-text">Home</p>,
      onClick: () => navigate("/"),
    },
    {
      key: "2",
      label: <p className="heading-text">Posts</p>,
      onClick: () => navigate("/posts"),
    },
    {
      key: "4",
      label: <p className="heading-text">Sign In</p>,
      onClick: () => navigate("/sign-in"),
    },
  ];

  const onClick = (item: MenuItem) => {
    if (item) {
      setCurrent(item?.key);
    }
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
          onClick={(item) => onClick(item)}
          className="nav-bar-items"
        />
      </div>
    </ConfigProvider>
  );
}
