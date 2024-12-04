import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { decodeToken } from "../../utils/globals";
import agent from "../../api/agent";
import { Post } from "../../api/models";

export default function Profile() {
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

  const columns = [
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
        <span className="force-link">
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
              height: "auto",
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
            <Table
              columns={columns}
              dataSource={userPosts.data}
              pagination={false}
            ></Table>
          </div>
        </div>
      </div>
    </>
  );
}
