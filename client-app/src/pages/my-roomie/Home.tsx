import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import SectionCard from "./components/SectionCard";
import PageSider from "./components/PageSider";
import { useQuery } from "@tanstack/react-query";
import agent from "../../api/agent";
import { getToken } from "../../utils/globals";

export default function MyRoomie() {
  const token = getToken();
  const isUserApproved = useQuery({
    queryKey: ["isUserApproved"],
    queryFn: () => {
      if (token) {
        return agent.ApprovedRoomates.isUserApproved(token?.nameid);
      }
    },
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {isUserApproved.data ? (
        <Layout hasSider>
          <PageSider activeTab={"General"}></PageSider>
          <Layout>
            <Content
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div className="grid-2-row ">
                <SectionCard
                  tab="Property"
                  description="Get info about the property"
                />
                <SectionCard
                  tab="Roomies"
                  description="Check on your Roomies!"
                />
                <SectionCard tab="Rent" description="Pay your share" />
                <SectionCard
                  tab="Payments"
                  description="Track payments history"
                />
              </div>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <div>
          <p>You are not a roomie yet </p>
        </div>
      )}
    </div>
  );
}
