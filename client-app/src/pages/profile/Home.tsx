import routes from "../../utils/PageRoutes";
import ProfileTabs from "./components/ProfileTabs";
import ProfileLayout from "./components/{ProfileLayout";

export default function Profile() {
  return (
    <ProfileLayout>
      <ProfileTabs activeTab={routes.profile.home}></ProfileTabs>
      <p className="heading-text">Profile</p>
    </ProfileLayout>
  );
}
