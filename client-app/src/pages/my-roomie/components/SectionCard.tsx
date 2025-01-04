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
        backgroundColor: "#ddd",
        height: "15rem",
        width: "25rem",
        margin: "1rem",
      }}
    >
      <p className="heading-text">{tab}</p>
      <p>{description}</p>
      <Button onClick={() => navigate(tab.toLowerCase())}>View Details</Button>
    </div>
  );
}
