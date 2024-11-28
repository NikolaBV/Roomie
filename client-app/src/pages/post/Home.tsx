import { useQuery } from "@tanstack/react-query";
import agent from "../../api/agent";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  const postDetails = useQuery({
    queryKey: ["postsQuery"],
    queryFn: () => {
      return agent.Posts.details(id as string);
    },
  });
  console.log(postDetails.data);
  return (
    <>
      <h1>Post</h1>
    </>
  );
}
