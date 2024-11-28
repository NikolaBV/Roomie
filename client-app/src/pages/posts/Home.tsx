import { useQuery } from "@tanstack/react-query";
import PostCard from "./components/PostCard";
import agent from "../../api/agent";

export default function Posts() {
  const postsQuery = useQuery({
    queryKey: ["postsQuery"],
    queryFn: () => {
      return agent.Posts.list();
    },
  });

  const placeholders = Array(6).fill(null);

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <div>
          <h1 style={{ fontSize: "5rem" }}>Posts</h1>
        </div>
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
