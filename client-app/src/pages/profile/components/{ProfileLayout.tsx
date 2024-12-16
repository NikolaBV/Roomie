import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}
export default function ProfileLayout(props: PageLayoutProps) {
  return (
    <div className="container" style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "60%",
            padding: "2rem",
            height: "100vh",

            marginBottom: "2rem",
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
