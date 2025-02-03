import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Button from "antd/es/button";
import Image from "antd/es/image";
import agent from "../../api/agent";
import {
  EditPostModel,
  RoomateRequestCreateModel,
  UserAvailabilityModel,
} from "../../api/models";
import { decodeToken } from "../../utils/globals";
import { getPostButtonText, isPostButtonDisabled } from "./utils/utility";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Form, Input, message } from "antd";

export default function Post() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const token = decodeToken(localStorage.getItem("token"));
  const [editing, setEditing] = useState<boolean>(false);

  const isUserAvailable = useQuery({
    queryKey: ["availableUser"],
    queryFn: () => {
      const model: UserAvailabilityModel = { userId: token?.nameid };
      return agent.Accounts.isUserAvaiable(model);
    },
    enabled: !!token,
  });

  const postDetails = useQuery({
    queryKey: ["postQuery", id],
    queryFn: () => agent.Posts.details(id as string, token?.nameid),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const createRequest = useMutation({
    mutationKey: ["createRequest"],
    mutationFn: (model: RoomateRequestCreateModel) =>
      agent.RoomateRequests.create(model),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["postQuery"] }),
  });

  const editPost = useMutation({
    mutationKey: ["editPost"],
    mutationFn: (model: EditPostModel) => {
      if (postDetails.data) {
        return agent.Posts.edit(postDetails.data?.post.id, model);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postQuery"] });
      setEditing(false);
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

  const handleEditPost = (values: EditPostModel) => {
    if (postDetails.data) {
      values.id = postDetails.data?.post.id;
    }
    editPost.mutateAsync(values);
  };

  return (
    <div className="container column p-1">
      {editing ? (
        <div>
          <div style={{ width: "100%", maxWidth: "50rem", margin: "1rem 0" }}>
            <Image
              src="/assets/plovdiv.webp"
              style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}
            />
          </div>
          <div className="post-card">
            <div style={{ textAlign: "left" }}>
              <Form onFinish={handleEditPost}>
                <Form.Item
                  name="title"
                  initialValue={postDetails.data?.post?.title}
                >
                  <Input defaultValue={postDetails.data?.post?.title} />
                </Form.Item>
                <Form.Item
                  name="description"
                  initialValue={postDetails.data?.post?.description}
                >
                  <Input defaultValue={postDetails.data?.post?.description} />
                </Form.Item>
                <Form.Item
                  name="freeSpots"
                  initialValue={postDetails.data?.post?.freeSpots}
                  rules={[{ required: true }]}
                >
                  <Input defaultValue={postDetails.data?.post?.freeSpots} />
                </Form.Item>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "1rem",
                    gap: "1rem",
                  }}
                >
                  <Button
                    htmlType="submit"
                    style={{ height: "3rem", fontWeight: "700" }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    style={{ height: "3rem", width: "3rem" }}
                    onClick={() => setEditing(!editing)}
                  >
                    <EditOutlined style={{ fontSize: "1.5rem" }} />
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ width: "100%", maxWidth: "50rem", margin: "1rem 0" }}>
            <Image
              src="/assets/plovdiv.webp"
              style={{ width: "100%", height: "auto", borderRadius: "0.5rem" }}
            />
          </div>
          <div className="post-card">
            <div style={{ textAlign: "left" }}>
              <h2 className="post-card-title">
                {postDetails.data?.post?.title}
              </h2>
              <p className="post-card-description">
                {postDetails.data?.post?.description}
              </p>
              <p style={{ fontWeight: "500" }}>
                Free Spots: {postDetails.data?.post?.freeSpots}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1rem",
                gap: "1rem",
              }}
            >
              <Button
                disabled={isPostButtonDisabled(
                  postDetails.data?.hasUserRequestedThePost,
                  isUserAvailable.data
                )}
                onClick={onRequestClick}
                style={{
                  height: "3rem",
                  backgroundColor: "var(--secondary-color)",
                }}
              >
                <span style={{ color: "white", fontWeight: "600" }}>
                  {getPostButtonText(
                    isUserAvailable?.data,
                    postDetails.data?.requestStatus
                  )}
                </span>
              </Button>
              {postDetails.data?.post.creatorId == token?.nameid && (
                <Button
                  style={{ height: "3rem", width: "3rem" }}
                  onClick={() => setEditing(!editing)}
                >
                  <EditOutlined style={{ fontSize: "1.5rem" }} />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
