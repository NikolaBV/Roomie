import { useQuery } from "@tanstack/react-query";
import "../../styles/index.css";
import agent from "../../api/agent";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const ordersQuery = useQuery({
    queryKey: ["ordersQuery"],
    queryFn: () => {
      return agent.Orders.list();
    },
  });
  console.log(ordersQuery.data);

  const navigate = useNavigate();

  return (
    <>
      <h1>home</h1>
    </>
  );
}
