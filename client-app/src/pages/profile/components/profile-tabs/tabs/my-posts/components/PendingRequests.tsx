import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, Modal, Popconfirm, Table, Tooltip } from "antd/es";
import agent from "../../../../../../../api/agent";
import {
  RequestStatus,
  RoomateRequest,
  UpdateRequestStatusDTO,
} from "../../../../../../../api/models";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";

interface Props {
  selectedProjectId: string;
  onCancel: () => void;
}

export default function PendingRequests({
  selectedProjectId,
  onCancel,
}: Props) {
  const queryClient = useQueryClient();

  const requestsForPost = useQuery({
    queryKey: ["requestsForPost", selectedProjectId],
    queryFn: () => agent.RoomateRequests.getRequestsForPost(selectedProjectId),
  });

  const updateStatus = useMutation({
    mutationKey: ["updateStatus"],
    mutationFn: (model: UpdateRequestStatusDTO) =>
      agent.RoomateRequests.updateStatus(model),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requestsForPost"] });
    },
    onError: (error: AxiosError) => {
      message.error(error.response?.data as string);
    },
  });

  const handleConfirm = (requestId: string, newStatus: RequestStatus) => {
    updateStatus.mutate({ requestId, newStatus });
  };

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "User Id", dataIndex: "userId", key: "userId" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "",
      dataIndex: "actionColumn",
      key: "actionColumn",
      render: (_: any, record: RoomateRequest) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Popconfirm
            title="Are you sure you want to accept this request?"
            onConfirm={() => handleConfirm(record.id, "Approved")}
          >
            <Tooltip title="Accept Request">
              <CheckOutlined
                className="force-link"
                style={{ fontSize: "1.25rem", marginRight: "1rem" }}
              />
            </Tooltip>
          </Popconfirm>
          <Popconfirm
            title="Are you sure you want to reject this request?"
            onConfirm={() => handleConfirm(record.id, "Rejected")}
          >
            <Tooltip title="Reject Request">
              <CloseOutlined
                className="force-link"
                style={{ fontSize: "1.25rem" }}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Modal open={!!selectedProjectId} onCancel={onCancel} onOk={onCancel}>
      <Table
        columns={columns}
        dataSource={requestsForPost.data}
        pagination={false}
      />
    </Modal>
  );
}
