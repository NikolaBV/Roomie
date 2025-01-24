import { Layout, Row, Table } from "antd";
import PageSider from "../../PageSider";
import { Content } from "antd/es/layout/layout";
import { getToken } from "../../../../../utils/globals";
import { useQuery } from "@tanstack/react-query";
import agent from "../../../../../api/agent";
import TableColumns from "./TableColumns";

export default function Roomies() {
  const token = getToken();
  const columns = TableColumns();
  // Fetch user posts
  const userQuery = useQuery({
    queryKey: ["usersQuery"],
    queryFn: () => {
      if (token) {
        return agent.Roomies.getUsersOfRoomie(token?.nameid);
      }
    },
  });
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Layout>
        <PageSider activeTab={"Roomies"} />
        <Layout>
          <Content style={{ padding: "2rem" }}>
            <Row>
              <p
                className="heading-text"
                style={{ marginBottom: "1rem", fontSize: "2rem" }}
              >
                Roomies
              </p>
            </Row>
            <Row>
              {userQuery.data && (
                <Table
                  columns={columns}
                  dataSource={userQuery.data}
                  pagination={false}
                  rowKey="id"
                />
              )}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
