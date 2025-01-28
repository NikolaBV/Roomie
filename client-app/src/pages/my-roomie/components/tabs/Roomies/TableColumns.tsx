import { ColumnsType } from "antd/es/table";
import { RoomieUser, User } from "../../../../../api/models";

const TableColumns = (): ColumnsType<RoomieUser> => {
  return [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
    },
  ];
};
export default TableColumns;
