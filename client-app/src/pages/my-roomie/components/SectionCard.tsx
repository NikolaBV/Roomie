import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MyRoomieTabs } from "../../../api/models";

interface Props {
  tab: MyRoomieTabs;
  description: string;
}
export default function SectionCard({ tab, description }: Props) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "50%",
        width: "30rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <div>
        <p className="heading-text mb-1" style={{ fontSize: "2rem" }}>
          {tab}
        </p>
        <p>{description}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={() => navigate(tab.toLowerCase())}>
          View Details
        </Button>
      </div>
    </div>
  );
}
