import { Table } from "antd";
import { useState } from "react";
import { getToken } from "../../../../utils/globals";
import { useQuery } from "@tanstack/react-query";
import agent from "../../../../api/agent";
import { Post } from "../../../../api/models";
import PendingRequests from "../PendingRequests";

export default function MyPosts() {
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const token = getToken();

  // Fetch user posts
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

  const postColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Requests",
      key: "requests",
      render: (record: Post) => (
        <span
          className="force-link"
          onClick={() => {
            setSelectedProjectId(record.id);
          }}
        >
          <p>
            <span style={{ marginRight: "0.25rem" }}>
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
      <div>
        <Table
          columns={postColumns}
          dataSource={userPosts.data}
          rowKey="id"
          pagination={false}
        />
      </div>
      {selectedProjectId && (
        <PendingRequests
          selectedProjectId={selectedProjectId}
          onCancel={() => {
            setSelectedProjectId("");
          }}
        />
      )}
    </>
  );
}
