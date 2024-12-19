import { useQuery } from "@tanstack/react-query";
import PostCard from "./components/PostCard";
import agent from "../../api/agent";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import routes from "../../utils/PageRoutes";

export default function Posts() {
  const postsQuery = useQuery({
    queryKey: ["postsQuery"],
    queryFn: () => {
      return agent.Posts.list();
    },
  });

  const navigate = useNavigate();

  const placeholders = Array(6).fill(null);

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <div>
          <h1 style={{ fontSize: "5rem" }}>Posts</h1>
        </div>
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
        <div className="grid-container">
          {postsQuery.isLoading
            ? placeholders.map((_, index) => (
                <PostCard
                  id="id"
                  key={index}
                  isLoading={postsQuery.isLoading}
                  title={""}
                  description={""}
                />
              ))
            : postsQuery?.data?.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  isLoading={false}
                />
              ))}
        </div>
      </div>
    </>
  );
}
