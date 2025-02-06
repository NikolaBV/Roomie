import "../../styles/index.css";
import { useNavigate } from "react-router-dom";
import Button from "antd/es/button";
import { Col, Image, Row } from "antd";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container column">
      <div
        className="content-wrapper"
        style={{
          margin: "10rem 0 5rem 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <h1 style={{ fontSize: "5rem", marginBottom: "1rem" }}>
          Find your roommate
        </h1>
        <p
          className="heading-text"
          style={{ marginBottom: "2rem", fontSize: "2rem" }}
        >
          They are 1 click away
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

      <div
        id="about-us"
        className="blue-gradient p-2"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          className="heading-text mb-3"
          style={{
            color: "var(--primary-color)",
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          About Us
        </h1>
        <Row
          gutter={[32, 16]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            maxWidth: "1000px",
          }}
        >
          <Col
            xs={24}
            sm={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Image preview={false} src="/assets/plovdiv.webp" height={300} />
          </Col>
          <Col xs={24} sm={12} style={{ display: "flex" }}>
            <div>
              <p style={{ fontSize: "1.5rem", color: "var(--light-color)" }}>
                Finding the right roommate should be simple. Our platform
                achieves just that. It allows you to find your perfect roomate
                with as little effort as possible.
              </p>
              <br></br>
              <p style={{ fontSize: "1.5rem", color: "var(--light-color)" }}>
                Request to be a roommate, chat, and get approved. Manage rent,
                payments, and shared expenses easily, get notifications so you
                never have to worry about it again. We take care of that for
                you.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
