import { Layout } from "antd";
import PageSider from "../PageSider";
import { Content } from "antd/es/layout/layout";
import { useQuery } from "@tanstack/react-query";
import agent from "../../../../api/agent";
import { getToken } from "../../../../utils/globals";

export default function PropertyInfo() {
  const token = getToken();

  // Fetch user posts


  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Layout hasSider>
        <PageSider activeTab={"Property"}></PageSider>
        <Layout>
          <Content>
            <p>Content</p>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
