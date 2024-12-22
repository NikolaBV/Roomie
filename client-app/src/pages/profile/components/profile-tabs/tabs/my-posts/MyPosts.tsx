import { Table } from "antd/es";
import { useState } from "react";
import { getToken } from "../../../../../../utils/globals";
import { useQuery } from "@tanstack/react-query";
import agent from "../../../../../../api/agent";
import PendingRequests from "./components/PendingRequests";
import ProfileTabs from "../../ProfileTabs";
import routes from "../../../../../../utils/PageRoutes";
import ProfileLayout from "../../../ProfileLayout";
import TableColumns from "./components/PostsColumns";

export default function MyPosts() {
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const token = getToken();

  // Fetch user posts
  const userPosts = useQuery({
    queryKey: ["usersPosts"],
    queryFn: () => {
      if (token) {
        return agent.Posts.getPostByUser(token?.nameid);
      }
    },
    enabled: !!token,
    retry: false,
  });

  const postColumns = TableColumns({ setSelectedProjectId });

  return (
    <ProfileLayout>
      <div>
        <ProfileTabs activeTab={routes.profile.myPosts} />
        <Table
          columns={postColumns}
          dataSource={userPosts.data}
          rowKey="id"
          pagination={false}
        />
      </div>
      {selectedProjectId && (
        <PendingRequests
          selectedProjectId={selectedProjectId}
          onCancel={() => setSelectedProjectId("")}
        />
      )}
    </ProfileLayout>
  );
}
