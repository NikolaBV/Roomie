import { Layout } from "antd";
import PageSider from "../PageSider";
import { Content } from "antd/es/layout/layout";
import { useQuery } from "@tanstack/react-query";
import agent from "../../../../api/agent";
import { getToken } from "../../../../utils/globals";

export default function PropertyInfo() {

   const token = getToken();

  // Fetch user posts
  const userPosts = useQuery({
    queryKey: ["usersPosts"],
    queryFn: () => {
      if (token) {
        return agent.ApprovedRoomates.getPostIdByUser(token?.nameid);
      }
    },
    enabled: !!token,
    retry: false,
  });

  console.log(userPosts.data);
  
  const propertyDetails = useQuery({
    queryKey: ["propertyDetails"],
    queryFn: () => {
      if(userPosts.data){
      return agent.Properties.getPropertyByPostId(userPosts.data);

      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!userPosts.data 

  });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Layout hasSider>
        <PageSider activeTab={"Property"}></PageSider>
        <Layout>
          <Content>
            <p>content</p>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
