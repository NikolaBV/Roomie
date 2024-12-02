import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import { Button, Image } from "antd";
import { RoomateRequestCreateModel } from "../../api/models";
import { getUserId } from "../../utils/globals";

export default function Post() {
  const { id } = useParams();

  const postDetails = useQuery({
    queryKey: ["postsQuery", id],
    queryFn: () => {
      return agent.Posts.details(id as string);
    },
  });

  const createRequest = useMutation({
    mutationKey: ["createRequest"],
    mutationFn: (model: RoomateRequestCreateModel) => {
      return agent.RoomateRequests.create(model);
    },
  });

  const onRequestClick = () => {
    const token = getUserId(localStorage.getItem("token"));
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
            {postDetails.data?.title}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "1rem",
              lineHeight: "1.5",
              wordBreak: "break-word",
            }}
          >
            {postDetails.data?.description}
          </p>
          <p style={{ fontWeight: "500" }}>
            Free Spots: {postDetails.data?.freeSpots}
          </p>
        </div>
        <div id="footer">
          <Button
            onClick={onRequestClick}
            style={{
              height: "3rem",
              backgroundColor: "var( --secondary-color)",
              marginTop: "1rem",
            }}
          >
            <span style={{ color: "white", fontWeight: "600" }}>
              Send A Request
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
