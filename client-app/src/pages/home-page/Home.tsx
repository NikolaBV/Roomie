import { useQuery } from "@tanstack/react-query";
import "../../styles/index.css";
import agent from "../../api/agent";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function HomePage() {
  const ordersQuery = useQuery({
    queryKey: ["ordersQuery"],
    queryFn: () => {
      return agent.Orders.list();
    },
  });
  console.log(ordersQuery.data);

  const navigate = useNavigate();

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            margin: "10rem 0 1rem 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
            onClick={() => {
              navigate("/posts");
            }}
          >
            Go to posts
          </Button>
        </div>
      </div>
    </>
  );
}
