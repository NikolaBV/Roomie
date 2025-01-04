import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import SectionCard from "./components/SectionCard";
import { MyRoomieTabs } from "../../api/models";
import PageSider from "./components/PageSider";

export default function MyRoomie() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
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
              <SectionCard tab="Roomies" description="Check on your Roomies!" />
              <SectionCard tab="Rent" description="Pay your share" />
              <SectionCard
                tab="Payments"
                description="Track payments history"
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
