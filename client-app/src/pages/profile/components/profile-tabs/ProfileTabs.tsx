import Tabs from "antd/es/tabs";
import { useNavigate } from "react-router-dom";
import routes from "../../../../utils/PageRoutes";

interface Props {
  activeTab: string;
}

export default function ProfileTabs({ activeTab }: Props) {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: routes.profile.home,
      label: "Home",
    },
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
    navigate(key);
  };

  return (
    <Tabs
      style={{ marginTop: "2rem" }}
      items={menuItems}
      onChange={handleTabsChange}
      activeKey={activeTab}
    />
  );
}
