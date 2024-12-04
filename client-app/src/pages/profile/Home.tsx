import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { decodeToken } from "../../utils/globals";
import agent from "../../api/agent";
import { Post } from "../../api/models";
import { useState } from "react";
import PendingRequests from "./components/PendingRequests";

export default function Profile() {
  const [selectedProjectId, setselectedProjectId] = useState("");

  const token = decodeToken(localStorage.getItem("token"));
  //TODO Add the requsts pop up with the requests table
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

  const userReuests = useQuery({
    queryKey: ["userReuests"],
    queryFn: () => {
      if (token) {
        return agent.RoomateRequests.getRequestsForUser(token?.nameid);
      }
    },
    enabled: !!token,
    retry: false,
  });

  const postColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
    },
    {
      title: "Requests",
      key: "requests",
      render: (record: Post) => (
        <span
          className="force-link"
          onClick={() => {
            setselectedProjectId(record.id);
          }}
        >
          <p>
            <span style={{ marginRight: "0.25rem" }}>
              {" "}
              {record.roomateRequests
                ? `(${record.roomateRequests.length})`
                : ""}
            </span>
            Requests
          </p>
        </span>
      ),
    },
  ];

  const requestsColumns = [
    {
      title: "Post Id",
      dataIndex: "postId",
      key: "postId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <>
      <div className="container" style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "60%",
              height: "auto",
              padding: "2rem",
              marginBottom: "2rem",
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
            <div>
              <p className="heading-text" style={{ margin: "1rem 0 1rem 0" }}>
                Requests waiting approval
              </p>
              <Table
                columns={postColumns}
                dataSource={userPosts.data}
                pagination={false}
              ></Table>
            </div>
            <div className="heading-text" style={{ margin: "1rem 0 1rem 0" }}>
              My Requests
            </div>
            <Table
              columns={requestsColumns}
              dataSource={userReuests.data}
              pagination={false}
            ></Table>
          </div>
        </div>
        {selectedProjectId && (
          <PendingRequests
            selectedProjectId={selectedProjectId}
            onCancel={() => {
              setselectedProjectId("");
            }}
          ></PendingRequests>
        )}
      </div>
    </>
  );
}
