import { Card, Image } from "antd";
import { Link } from "react-router-dom";
import routes from "../../../utils/PageRoutes";

interface Props {
  id: string;
  title: string;
  description: string;
  isLoading: boolean;
}

export default function PostCard({ id, title, description, isLoading }: Props) {
  return (
    <Link to={`${routes.posts.posts}/${id}`}>
      <Card
        loading={isLoading}
        hoverable
        style={{ width: 300, margin: "2rem" }}
        cover={
          <Image
            preview={false}
            alt="example"
            src="/assets/plovdiv.webp"
            loading={isLoading ? "eager" : "lazy"}
          />
        }
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </Card>
    </Link>
  );
}
