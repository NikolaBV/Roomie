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
          {postsQuery?.data?.map((post) => (
            <PostCard
              title={post.title}
              description={post.description}
            ></PostCard>
          ))}
        </div>
      </div>
    </>
  );
}
