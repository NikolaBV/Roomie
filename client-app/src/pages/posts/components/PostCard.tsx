import { Card, Image } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  description: string;
  isLoading: boolean;
}

export default function PostCard({ id, title, description, isLoading }: Props) {
  const navigate = useNavigate();
  return (
    <Card
      loading={isLoading}
      onClick={() => {
        navigate(`/post/${id}`);
      }}
      hoverable
      style={{ width: 300, margin: "2rem" }}
      cover={
        <Image
          preview={false}
          alt="example"
          src="/assets/plovdiv.webp"
          loading={isLoading ? "eager" : "lazy"} // Change the image loading based on the query state
        />
      }
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}
