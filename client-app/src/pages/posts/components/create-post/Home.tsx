import { Button, Form, Input } from "antd";
import { CreatePostModel } from "../../../../api/models";
import { useMutation } from "@tanstack/react-query";
import agent from "../../../../api/agent";
import dayjs from "dayjs";
import { decodeToken } from "../../../../utils/globals";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navgiate = useNavigate();
  const createPost = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (model: CreatePostModel) => {
      return agent.Posts.create(model);
    },
  });

  const handleSubmit = (values: CreatePostModel) => {
    console.log(values);
    if (decodeToken(localStorage.getItem("token"))) {
      let model: CreatePostModel = {
        title: values.title,
        description: values.description,
        freeSpots: values.freeSpots,
        status: true,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
        userId: decodeToken(localStorage.getItem("token"))?.nameid,
      };
      createPost.mutate(model);
      navgiate("/posts");
    }
  };
  return (
    <>
      <div className="container" style={{ minHeight: "100vh" }}>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "2rem" }}
        >
          <p className="heading-text">Create a post</p>
          <Form onFinish={handleSubmit}>
            <Form.Item name="title" rules={[{ required: true }]}>
              <Input
                placeholder="Enter the title"
                style={{
                  width: "100%",
                  height: "2.25rem",
                }}
              ></Input>
            </Form.Item>
            <Form.Item name="description" rules={[{ required: true }]}>
              <Input
                placeholder="Decscription"
                style={{
                  width: "100%",
                  height: "2.25rem",
                }}
              ></Input>
            </Form.Item>
            <Form.Item name="freeSpots" rules={[{ required: true }]}>
              <Input
                placeholder="Number of free spots"
                style={{
                  width: "100%",
                  height: "2.25rem",
                }}
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Create Post</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
