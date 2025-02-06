import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import SectionCard from "./components/SectionCard";
import PageSider from "./components/PageSider";
import { useQuery } from "@tanstack/react-query";
import agent from "../../api/agent";
import { getToken } from "../../utils/globals";
import { useNavigate } from "react-router-dom";

export default function MyRoomie() {
  const token = getToken();
  const navigate = useNavigate();

  const IsUserInARoomie = useQuery({
    queryKey: ["isUserApproved"],
    queryFn: () => {
      if (token) {
        return agent.Roomies.IsUserInARoomie(token?.nameid);
      }
    },
  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {IsUserInARoomie.data ? (
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
        <div className="container column">
          <div
            className="content-wrapper"
            style={{
              margin: "10rem 0 1rem 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <h1 style={{ fontSize: "5rem", marginBottom: "1rem" }}>
              You are not a Roomie yet
            </h1>
            <p
              className="heading-text"
              style={{ marginBottom: "2rem", fontSize: "2rem" }}
            >
              No approvals yet, find your Roomie in posts!
            </p>
            <Button
              style={{
                width: "15rem",
                height: "5rem",
                fontSize: "2rem",
              }}
              onClick={() => navigate("/posts")}
            >
              Go to posts
            </Button>
          </div>
          {/*TODO Finish up the landing page content*/}
          <div style={{ height: "100vh" }}></div>
        </div>
      )}
    </div>
  );
}
