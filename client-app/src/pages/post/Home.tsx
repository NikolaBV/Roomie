import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Button from "antd/es/button";
import Image from "antd/es/image";
import agent from "../../api/agent";
import {
  RoomateRequestCreateModel,
  UserAvailabilityModel,
} from "../../api/models";
import { decodeToken } from "../../utils/globals";
import { getPostButtonText, isPostButtonDisabled } from "./utils/utility";

export default function Post() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const token = decodeToken(localStorage.getItem("token"));

  const isUserAvailable = useQuery({
    queryKey: ["availableUser"],
    queryFn: () => {
      const model: UserAvailabilityModel = { userId: token?.nameid };
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
    mutationFn: (model: RoomateRequestCreateModel) =>
      agent.RoomateRequests.create(model),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["postsQuery"] }),
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
    <div className="container column p-1">
      <div style={{ width: "100%", maxWidth: "50rem", margin: "1rem 0" }}>
        <Image
          src="/assets/plovdiv.webp"
          style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}
        />
      </div>
      <div className="post-card">
        <div style={{ textAlign: "left" }}>
          <h2 className="post-card-title">{postDetails.data?.post.title}</h2>
          <p className="post-card-description">
            {postDetails.data?.post.description}
          </p>
          <p style={{ fontWeight: "500" }}>
            Free Spots: {postDetails.data?.post.freeSpots}
          </p>
        </div>
        <div id="footer">
          <Button
            disabled={isPostButtonDisabled(
              postDetails.data?.hasUserRequestedThePost,
              isUserAvailable.data
            )}
            onClick={onRequestClick}
            style={{
              height: "3rem",
              backgroundColor: "var(--secondary-color)",
              marginTop: "1rem",
            }}
          >
            <span style={{ color: "white", fontWeight: "600" }}>
              {getPostButtonText(
                isUserAvailable.data,
                postDetails.data?.requestStatus
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
