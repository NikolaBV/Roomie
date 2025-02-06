import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import agent from "../../api/agent";
import { PlusCircleOutlined } from "@ant-design/icons";
import Tooltip from "antd/es/tooltip";
import { useNavigate } from "react-router-dom";
import routes from "../../utils/PageRoutes";

const PostCard = React.lazy(() => import("./components/PostCard"));

export default function Posts() {
  const postsQuery = useQuery({
    queryKey: ["postsQuery"],
    queryFn: agent.Posts.list,
  });

  const navigate = useNavigate();

  return (
    <div
      className="container column"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "5rem" }}>Posts</h1>
      <Tooltip title="Create Post">
        <div
          style={{
            alignSelf: "flex-start",
            display: "flex",
            flexDirection: "row",
            marginLeft: "12rem",
            marginTop: "1rem",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(routes.posts.createPost);
          }}
        >
          <PlusCircleOutlined
            style={{ fontSize: "2rem", marginRight: "1rem" }}
          />
          <p className="heading-text" style={{ paddingTop: "0.2rem" }}>
            Create Post
          </p>
        </div>
      </Tooltip>
      <div className="grid-3-row">
        <Suspense fallback={<div>Loading posts...</div>}>
          {postsQuery?.data?.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              isLoading={false}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
