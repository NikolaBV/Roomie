import { Button, Form, Input } from "antd";
import { LoginModel } from "../../api/models";
import { useMutation } from "@tanstack/react-query";
import agent from "../../api/agent";

export default function SignIn() {
  const loginMutation = useMutation({
    mutationKey: ["login"],
  });
  //TODO Finish login
  const handleSubmit = (values: LoginModel) => {
    console.log(values);
  };
  return (
    <>
      <div className="container" style={{ height: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
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
              Sign in
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
              <Form.Item name="Password" rules={[{ required: true }]}>
                <Input.Password
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    height: "2.25rem",
                  }}
                ></Input.Password>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Sign In</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
