import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../../../../../../api/agent";
import { getToken } from "../../../../../../utils/globals";
import { useState } from "react";
import { Table } from "antd/es";
import ProfileTabs from "../../ProfileTabs";
import routes from "../../../../../../utils/PageRoutes";
import ProfileLayout from "../../../ProfileLayout";
import PendingRequests from "../my-posts/components/PendingRequests";
import TableColumns from "./components/RequestsColumns";

export default function MyRequests() {
  const token = getToken();
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const queryClient = useQueryClient();

  const userRequests = useQuery({
    queryKey: ["userRequests"],
    queryFn: () => {
      if(token){
        return agent.RoomateRequests.getRequestsForUser(token?.nameid);
      }
    },
    enabled: !!token,
    retry: false,
  });

  const deleteRequest = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (id: string) => agent.RoomateRequests.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRequests"] });
    },
  });

  const handleDeleteRequest = (id: string) => {
    deleteRequest.mutate(id);
  };

  const requestsColumns = TableColumns({ handleDeleteRequest });

  return (
    <ProfileLayout>
      <ProfileTabs activeTab={routes.profile.myRequests} />
      <Table
        columns={requestsColumns}
        dataSource={userRequests.data}
        rowKey="id"
        pagination={false}
      />
      {selectedProjectId && (
        <PendingRequests
          selectedProjectId={selectedProjectId}
          onCancel={() => setSelectedProjectId("")}
        />
      )}
    </ProfileLayout>
  );
}
