import { Layout, Menu, MenuProps } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

export default function MyRoomie() {
  const items: MenuProps["items"] = [
    {
      key: "General",
      label: "General",
    },
    {
      key: "Property",
      label: "Property",
    },
    {
      key: "Roomies",
      label: "Roomies",
    },
    {
      key: "Rent & Utilities",
      label: "Rent",
    },
  ];
  return (
    <div>
      <Layout hasSider>
        <Sider theme="light">
          <div className="demo-logo-vertical" />
          <Menu theme="light" items={items} className="side-bar-menu" />
        </Sider>
        <Layout>
          <Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div className="grid-container">
              <div
                style={{
                  backgroundColor: "red",
                  height: "15rem",
                  width: "25rem",
                  margin: "1rem",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "red",
                  height: "15rem",
                  width: "25rem",
                  margin: "1rem",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "red",
                  height: "15rem",
                  width: "25rem",
                  margin: "1rem",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "red",
                  height: "15rem",
                  width: "25rem",
                  margin: "1rem",
                }}
              ></div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
