import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router-dom";
import routes from "../../../utils/PageRoutes";
import { MyRoomieTabs } from "../../../api/models";

interface Props {
  activeTab: MyRoomieTabs;
}
export default function PageSider({ activeTab }: Props) {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "General",
      label: "General",
      onClick: () => navigate(routes.myRoomie.home),
    },
    {
      key: "Property",
      label: "Property",
      onClick: () => navigate(routes.myRoomie.property),
    },
    {
      key: "Roomies",
      label: "Roomies",
    },
    {
      key: "Rent & Utilities",
      label: "Rent",
    },
    {
      key: "Payments",
      label: "Payments",
    },
  ];
  return (
    <Sider theme="light">
      <div className="demo-logo-vertical" />
      <Menu
        defaultSelectedKeys={[activeTab]}
        theme="light"
        items={items}
        className="side-bar-menu"
      />
    </Sider>
  );
}
