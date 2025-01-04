import { Layout } from "antd";
import PageSider from "../PageSider";
import { Content } from "antd/es/layout/layout";

export default function PropertyInfo() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Layout hasSider>
        <PageSider activeTab={"Property"}></PageSider>
        <Layout>
          <Content>
            <p>content</p>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
