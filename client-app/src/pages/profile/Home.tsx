import { UserOutlined } from "@ant-design/icons";
import routes from "../../utils/PageRoutes";
import ProfileTabs from "./components/profile-tabs/ProfileTabs";
import ProfileLayout from "./components/ProfileLayout";
import { getToken, signOut } from "../../utils/globals";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const token = getToken();
  const navigate = useNavigate();
  return (
    <ProfileLayout>
      <ProfileTabs activeTab={routes.profile.home} />
      <div className="mt-1" style={{ display: "flex", flexDirection: "row" }}>
        <div
          className="mr-5"
          style={{
            backgroundColor: "white",
            height: "12rem",
            width: "12rem",
            borderRadius: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UserOutlined style={{ fontSize: "10rem" }} />
        </div>
        <div>
          <p className="heading-text mb-05">Email</p>
          <p className="mb-2">{token?.email}</p>
          <p className="heading-text mb-05">Username</p>
          <p className="mb-2">{token?.unique_name}</p>
          <Button
            onClick={() => {
              signOut();
              navigate(routes.authenticate.signIn);
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </ProfileLayout>
  );
}
