import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../../../../api/agent";
import { getToken } from "../../../../utils/globals";
import { useState } from "react";
import { RoomateRequest } from "../../../../api/models";
import { Popconfirm, Table, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PendingRequests from "../PendingRequests";
import ProfileTabs from "../ProfileTabs";

export default function MyRequests() {
  const token = getToken();
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const queryClient = useQueryClient();

  // Fetch user requests
  const userRequests = useQuery({
    queryKey: ["userRequests"],
    queryFn: () => {
      if (token) {
        return agent.RoomateRequests.getRequestsForUser(token?.nameid);
      }
    },
    enabled: !!token,
    retry: false,
  });

  // Delete request mutation
  const deleteRequest = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (id: string) => {
      return agent.RoomateRequests.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRequests"] });
    },
  });

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
    {
      title: "",
      key: "actions",
      render: (_: any, record: RoomateRequest) => (
        <Popconfirm
          title={"Are you sure you want to delete this request?"}
          onConfirm={() => deleteRequest.mutate(record.id)}
        >
          <Tooltip title="Delete Request">
            <DeleteOutlined
              className="force-link"
              style={{ fontSize: "1.25rem" }}
            />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <ProfileTabs activeTab={"myRequests"}></ProfileTabs>
      <div className="heading-text" style={{ margin: "1rem 0" }}>
        My Requests
      </div>
      <Table
        columns={requestsColumns}
        dataSource={userRequests.data}
        rowKey="id"
        pagination={false}
      />
      {selectedProjectId && (
        <PendingRequests
          selectedProjectId={selectedProjectId}
          onCancel={() => {
            setSelectedProjectId("");
          }}
        />
      )}
    </div>
  );
}
