import { ColumnsType } from "antd/es/table";
import { Post } from "../../../../../../../api/models";

interface Props {
  setSelectedProjectId: (value: string) => void;
}

const TableColumns = ({ setSelectedProjectId }: Props): ColumnsType<Post> => {
  return [
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
          onClick={() => setSelectedProjectId(record.id)}
        >
          <p>
            {record.roomateRequests && record.roomateRequests.length > 0 && (
              <span style={{ marginRight: "0.25rem" }}>
                ({record.roomateRequests.length})
              </span>
            )}
            Requests
          </p>
        </span>
      ),
    },
  ];
};
export default TableColumns;
