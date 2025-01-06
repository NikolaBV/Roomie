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
        return agent.Posts.getPostsByUser(token?.nameid);
      }
    },
    enabled: !!token,
    retry: false,
  });
  
  // const propertyDetails = useQuery({
  //   queryKey: ["propertyDetails"],
  //   queryFn: () => {
  //     return agent.Properties.getPropertyByPostId("A6F4B9AB-F559-44DC-A16D-CF3859410708");
  //   },
  //   retry: false,
  //   refetchOnWindowFocus: false,

  // });

  // console.log(propertyDetails.data);
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
