import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Select, Checkbox } from "antd";
import { useState } from "react";
import { CreatePostModel, CreatePropertyModel } from "../../../../api/models";
import agent from "../../../../api/agent";
import { decodeToken, getToken } from "../../../../utils/globals";

export default function CreatePost() {
  const navigate = useNavigate();
  const token = getToken();
  const [propertyFormVisible, setPropertyFormVisible] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (model: CreatePostModel) => agent.Posts.create(model),
  });

  const createProperty = useMutation({
    mutationKey: ["createProperty"],
    mutationFn: (model: CreatePropertyModel) => agent.Properties.create(model),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProperties"] });
    },
  });

  const getProperties = useQuery({
    queryKey: ["getProperties"],
    queryFn: () => {
      if (token) {
        return agent.Properties.listByUserId(token.nameid);
      }
    },
  });

  const options = [
    ...(getProperties.data?.map((p) => ({
      label: `${p.address}`,
      value: p.id,
    })) || []),
    { label: "Add a new property", value: "Add a new property" },
  ];

  const handleCreatePost = async (values: any) => {
    const user = decodeToken(localStorage.getItem("token"));
    if (!user) return;

    try {
      const model: CreatePostModel = {
        title: values.title,
        description: values.description,
        freeSpots: parseInt(values.freeSpots, 10),
        status: true,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
        userId: user.nameid,
        propertyId: propertyId || null,
      };

      await createPost.mutateAsync(model);
      navigate("/posts");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleCreateProperty = async (values: any) => {
    const user = decodeToken(localStorage.getItem("token"));
    if (!user) return;

    try {
      const propertyModel: CreatePropertyModel = {
        address: values.address,
        apartmentType: values.apartmentType,
        numberOfRooms: values.numberOfRooms,
        furnished: values.furnished || false,
        rent: values.rent,
        additionalNotes: values.additionalNotes || "",
        userId: user.nameid,
        postId: propertyId ? propertyId : null,
      };

      await createProperty.mutateAsync(propertyModel);
      setPropertyFormVisible(false);
    } catch (error) {
      console.error("Failed to create property:", error);
    }
  };

  return (
    <div className="column container">
      <div>
        <p className="heading-text mb-1">Create a Post</p>
        <Form onFinish={handleCreatePost}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input
              placeholder="Enter the title"
              style={{ width: "100%", height: "2.25rem" }}
            />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input
              placeholder="Description"
              style={{ width: "100%", height: "2.25rem" }}
            />
          </Form.Item>
          <Form.Item name="freeSpots" rules={[{ required: true }]}>
            <Input
              placeholder="Number of free spots"
              style={{ width: "100%", height: "2.25rem" }}
            />
          </Form.Item>

          <Form.Item name="property" rules={[{ required: true }]}>
            <Select
              placeholder="Select property"
              options={options}
              onChange={(value) => {
                setPropertyFormVisible(value === "Add a new property");
                setPropertyId(value !== "Add a new property" ? value : "");
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Post
            </Button>
          </Form.Item>
        </Form>
      </div>

      {propertyFormVisible && (
        <div style={{ marginTop: "2rem" }}>
          <p className="heading-text mb-1">Create a Property</p>
          <Form onFinish={handleCreateProperty}>
            <Form.Item name="address" rules={[{ required: true }]}>
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item name="apartmentType" rules={[{ required: true }]}>
              <Select
                defaultValue="Studio"
                options={[
                  { value: "Studio", label: "Studio" },
                  { value: "OneBedroom", label: "One Bedroom" },
                  { value: "TwoBedroom", label: "Two Bedroom" },
                  { value: "ThreeBedroom", label: "Three Bedroom" },
                ]}
              />
            </Form.Item>
            <Form.Item name="numberOfRooms" rules={[{ required: true }]}>
              <Input placeholder="Number of Rooms" />
            </Form.Item>
            <Form.Item name="furnished" valuePropName="checked">
              <Checkbox>Furnished?</Checkbox>
            </Form.Item>
            <Form.Item name="rent" rules={[{ required: true }]}>
              <Input placeholder="Rent" />
            </Form.Item>
            <Form.Item name="additionalNotes">
              <Input placeholder="Additional Notes" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Property
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}
