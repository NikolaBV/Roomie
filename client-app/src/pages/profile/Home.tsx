import { useMutation, useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { decodeToken } from "../../utils/globals";
import agent from "../../api/agent";
import { useEffect } from "react";

export default function Profile() {
  const token = decodeToken(localStorage.getItem("token"));
  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
  ];
  const userPosts = useQuery({
    queryKey: ["usersPosts"],
    queryFn: () => {
      if (token) {
        return agent.Posts.getPostByUser(token?.nameid);
      }
    },
    enabled: !!token,
    retry: false,
  });

  return (
    <>
      <div className="container" style={{ height: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "white",
              width: "60%",
              height: "20rem",
              padding: "2rem",
            }}
          >
            <div
              id="header"
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "1rem",
              }}
            >
              <p className="heading-text">Profile</p>
            </div>
            <p className="heading-text">Requests waiting approval</p>
            <Table columns={columns}></Table>
          </div>
        </div>
      </div>
    </>
  );
}
