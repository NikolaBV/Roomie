import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreatePostModel, Property } from "../../../../api/models";
import agent from "../../../../api/agent";
import { decodeToken } from "../../../../utils/globals";
import { Checkbox, Select } from "antd";

export default function CreatePost() {
  const navigate = useNavigate();

  const createPost = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (model: CreatePostModel) => agent.Posts.create(model),
  });

  const handleSubmit = (values: CreatePostModel) => {
    const token = localStorage.getItem("token");
    const user = decodeToken(token);

    if (user) {
      const model: CreatePostModel = {
        title: values.title,
        description: values.description,
        freeSpots: values.freeSpots,
        status: true,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
        userId: user.nameid,
      };

      createPost.mutate(model, {
        onSuccess: () => navigate("/posts"),
      });
    }
  };

  return (
    <div className="column container">
      <div>
        <p className="heading-text mb-1">Create a post</p>
        <Form onFinish={handleSubmit}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input
              placeholder="Enter the title"
              style={{
                width: "100%",
                height: "2.25rem",
              }}
            />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input
              placeholder="Description"
              style={{
                width: "100%",
                height: "2.25rem",
              }}
            />
          </Form.Item>
          <Form.Item name="freeSpots" rules={[{ required: true }]}>
            <Input
              placeholder="Number of free spots"
              style={{
                width: "100%",
                height: "2.25rem",
              }}
            />
          </Form.Item>
          <Form.Item name="address" rules={[{ required: true }]}>
            <Input
              placeholder="Address"
              style={{
                width: "100%",
                height: "2.25rem",
              }}
            />
          </Form.Item>
          <Form.Item name="property" rules={[{ required: true }]}>
            <Select
              defaultValue={"property"}
              options={[
                { value: "Studio", label: "Studio" },
                { value: "lucy", label: "Lucy" },
                { value: "OneBedroom", label: "One Bedroom" },
                { value: "TwoBedroom", label: "Two Bedroom" },
                { value: "ThreeBedroom", label: "Three Bedroom" },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Create Post</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
