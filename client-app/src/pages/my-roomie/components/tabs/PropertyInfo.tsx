import { Col, Image, Layout, Row } from "antd";
import PageSider from "../PageSider";
import { Content } from "antd/es/layout/layout";
import { getToken } from "../../../../utils/globals";
import { useQuery } from "@tanstack/react-query";
import agent from "../../../../api/agent";

export default function PropertyInfo() {
  const token = getToken();

  // Fetch user posts
  const propertyInfo = useQuery({
    queryKey: ["propertyInfo"],
    queryFn: () => {
      if (token) {
        return agent.Roomies.GetPropertyInfoByUserId(token?.nameid);
      }
    },
  });

  const property = propertyInfo.data;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Layout hasSider>
        <PageSider activeTab={"Property"}></PageSider>
        <Layout>
          <Content style={{ padding: "2rem" }}>
            <Row>
              <p
                className="heading-text"
                style={{ marginBottom: "1rem", fontSize: "2rem" }}
              >
                Property Info
              </p>
            </Row>
            <Row>
              <Col style={{ marginRight: "2rem" }}>
                <div>
                  <Image
                    src="/assets/plovdiv.webp"
                    height={300}
                    alt="Property"
                  />
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "1.5rem",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "30rem",
                  }}
                >
                  <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                    <span
                      className="heading-text"
                      style={{ fontWeight: "bold" }}
                    >
                      Address:
                    </span>{" "}
                    {property?.address || "N/A"}
                  </p>
                  <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                    <span
                      className="heading-text"
                      style={{ fontWeight: "bold" }}
                    >
                      Apartment Type:
                    </span>{" "}
                    {property?.apartmentType || "N/A"}
                  </p>
                  <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                    <span
                      className="heading-text"
                      style={{ fontWeight: "bold" }}
                    >
                      Number of Rooms:
                    </span>{" "}
                    {property?.numberOfRooms || "N/A"}
                  </p>
                  <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                    <span
                      className="heading-text"
                      style={{ fontWeight: "bold" }}
                    >
                      Furnished:
                    </span>{" "}
                    {property?.furnished ? "Yes" : "No"}
                  </p>
                  <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                    <span
                      className="heading-text"
                      style={{ fontWeight: "bold" }}
                    >
                      Rent:
                    </span>{" "}
                    ${property?.rent || "N/A"}
                  </p>
                  <p style={{ fontSize: "1rem" }}>
                    <span
                      className="heading-text"
                      style={{ fontWeight: "bold" }}
                    >
                      Additional Notes:
                    </span>{" "}
                    {property?.additionalNotes || "N/A"}
                  </p>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
