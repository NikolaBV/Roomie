import ProfileTabs from "./components/ProfileTabs";

export default function Profile() {
  return (
    <div className="container" style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "60%",
            height: "auto",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            id="header"
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "1rem",
              alignItems: "flex-start",
              alignContent: "flex-start",
            }}
          >
            <ProfileTabs activeTab="myPosts" />
            <p className="heading-text">Home</p>
          </div>
        </div>
      </div>
    </div>
  );
}
