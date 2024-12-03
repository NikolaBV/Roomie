import { Table } from "antd";

export default function Profile() {
  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
  ];
  return (
    <>
      <div className="container" style={{ height: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "white",
              width: "60%",
              height: "20rem",
              padding: "2rem",
            }}
          >
            <div
              id="header"
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "1rem",
              }}
            >
              <p className="heading-text">Profile</p>
            </div>
            <Table columns={columns}></Table>
          </div>
        </div>
      </div>
    </>
  );
}
