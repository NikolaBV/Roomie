import { Card } from "antd";

interface Props {
  title: string;
  description: string;
}
export default function PostCard({ title, description }: Props) {
  return (
    <Card
      onClick={() => {
        console.log(title);
      }}
      hoverable
      style={{ width: 300, margin: "2rem" }}
      cover={
        <img
          alt="example"
          src="https://ksb.bg/wp-content/uploads/2019/10/1200px-Plovdiv_view.jpg"
        />
      }
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}
