import { ColumnsType } from "antd/es/table";
import { RoomateRequest } from "../../../../../../../api/models";
import { Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
interface Props {
  handleDeleteRequest: (id: string) => void;
}
const TableColumns = ({
  handleDeleteRequest,
}: Props): ColumnsType<RoomateRequest> => {
  return [
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
          title="Are you sure you want to delete this request?"
          onConfirm={() => handleDeleteRequest(record.id)}
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
};
export default TableColumns;
