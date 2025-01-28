import { useMutation } from "@tanstack/react-query";
import agent from "../../../api/agent";
import { RegisterModel } from "../../../api/models";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { AxiosError } from "axios";
import routes from "../../../utils/PageRoutes";

export default function SignUp() {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (model: RegisterModel) => {
      return agent.Accounts.register(model);
    },
    onError: (error: AxiosError) => {
      message.error(error.response?.data as string);
    },
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        window.location.href = "http://localhost:3000/posts";
      }
    },
  });

  const handleSubmit = (values: RegisterModel) => {
    console.log(values);
    registerMutation.mutate(values);
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "70%",
            }}
          >
            <h1
              className="heading-text"
              style={{ fontSize: "2rem", marginBottom: "1rem" }}
            >
              Sign Up
            </h1>
            <Form onFinish={handleSubmit}>
              <Form.Item
                name="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  placeholder="Enter your email"
                  style={{
                    width: "100%",
                    height: "2.25rem",
                  }}
                ></Input>
              </Form.Item>
              <Form.Item name="Username" rules={[{ required: true }]}>
                <Input
                  placeholder="Enter your username"
                  style={{
                    width: "100%",
                    height: "2.25rem",
                  }}
                ></Input>
              </Form.Item>
              <Form.Item
                name="Password"
                rules={[{ required: true }]}
                style={{ marginBottom: "0.75rem" }}
              >
                <Input.Password
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    height: "2.25rem",
                  }}
                ></Input.Password>
              </Form.Item>
              <div
                className="mb-1"
                style={{ cursor: "pointer", color: "var(--secondary-color)" }}
                onClick={() => navigate(routes.authenticate.signIn)}
              >
                Already Registered? Sign In
              </div>
              <Form.Item>
                <Button htmlType="submit" style={{ width: "100%" }}>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
