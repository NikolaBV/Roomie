import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import { Button, Image } from "antd";
import {
  RoomateRequestCreateModel,
  UserAvailabilityModel,
} from "../../api/models";
import { decodeToken } from "../../utils/globals";

export default function Post() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const token = decodeToken(localStorage.getItem("token"));

  const isUserAvaiable = useQuery({
    queryKey: ["availableUser"],
    queryFn: (model: UserAvailabilityModel) => {
      model = {
        userId: token?.nameid,
      };
      return agent.Accounts.isUserAvaiable(model);
    },
    enabled: !!token,
  });
  const postDetails = useQuery({
    queryKey: ["postsQuery", id],
    queryFn: () => agent.Posts.details(id as string, token?.nameid),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const createRequest = useMutation({
    mutationKey: ["createRequest"],
    mutationFn: (model: RoomateRequestCreateModel) => {
      return agent.RoomateRequests.create(model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postsQuery"] });
    },
  });

  const onRequestClick = () => {
    if (token && id) {
      const model: RoomateRequestCreateModel = {
        userId: token.nameid,
        postId: id,
      };
      createRequest.mutate(model);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",

        minHeight: "100vh",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "50rem",
          margin: "1rem 0",
        }}
      >
        <Image
          src="/assets/plovdiv.webp"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div
        id="content"
        style={{
          backgroundColor: "var(--light-color)",
          padding: "1rem",
          width: "100%",
          maxWidth: "50rem",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            textAlign: "left",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: "0 0 1rem 0",
              wordBreak: "break-word",
            }}
          >
            {postDetails.data?.post.title}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "1rem",
              lineHeight: "1.5",
              wordBreak: "break-word",
            }}
          >
            {postDetails.data?.post.description}
          </p>
          <p style={{ fontWeight: "500" }}>
            Free Spots: {postDetails.data?.post.freeSpots}
          </p>
        </div>
        <div id="footer">
          <Button
            disabled={
              postDetails.data?.hasUserRequestedThePost ||
              !!!isUserAvaiable.data
            }
            onClick={onRequestClick}
            style={{
              height: "3rem",
              backgroundColor: "var( --secondary-color)",
              marginTop: "1rem",
            }}
          >
            <span style={{ color: "white", fontWeight: "600" }}>
              {!!isUserAvaiable.data === false
                ? "You are already a Roomie!"
                : postDetails.data?.requestStatus === "None"
                ? "Send a Roomie Request"
                : postDetails.data?.requestStatus === "Pending"
                ? "Pending Request"
                : postDetails.data?.requestStatus === "Rejected"
                ? "You have been rejected"
                : postDetails.data?.requestStatus === "Approved"
                ? "You are a Roomie!"
                : ""}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
