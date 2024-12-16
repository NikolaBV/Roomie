import { Tabs, TabsProps } from "antd";
import { useNavigate } from "react-router-dom";
import routes from "../../../utils/PageRoutes";
import { ProfileTabsType } from "../../../api/models";

interface Props {
  activeTab: ProfileTabsType;
}
export default function ProfileTabs({ activeTab }: Props) {
  const navigate = useNavigate();
  console.log(activeTab);

  const menuItems: TabsProps["items"] = [
    {
      key: routes.profile.myPosts,
      label: "My Posts",
    },
    {
      key: routes.profile.myRequests,
      label: "My Requests",
    },
  ];

  const handleTabsChange = (key: string) => {
    console.log(key);
    navigate(key);
  };
  return (
    <Tabs
      style={{ marginTop: "2rem" }}
      items={menuItems}
      onChange={handleTabsChange}
    ></Tabs>
  );
}
