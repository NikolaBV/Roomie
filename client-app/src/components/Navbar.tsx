import { ConfigProvider, Dropdown, Menu, MenuProps, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import routes from "../utils/PageRoutes";

export default function Navbar() {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Log Out",
      onClick: () => {
        localStorage.removeItem("token");
        message.success("You have been signed out");
      },
    },
  ];

  const menuItems: MenuItem[] = [
    {
      key: "1",
      label: <p className="heading-text">Home</p>,
      onClick: () => navigate(routes.staticUri.root),
    },
    {
      key: "2",
      label: <p className="heading-text">Posts</p>,
      onClick: () => navigate(routes.posts.posts),
    },
    {
      key: "5",
      label: <p className="heading-text">My Roomie</p>,
      onClick: () => navigate(routes.myRoomie.home),
    },
    {
      key: "4",
      label: (
        <div>
          {localStorage.getItem("token") ? (
            <div>
              <Dropdown menu={{ items }}>
                <p className="heading-text">Profile</p>
              </Dropdown>
            </div>
          ) : (
            <div>
              <p className="heading-text">Sign In</p>
            </div>
          )}
        </div>
      ),
      onClick: () =>
        navigate(
          localStorage.getItem("token")
            ? routes.profile.home
            : routes.authenticate.signIn
        ),
    },
  ];

  const onClick = (item: { key: string }) => {
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
