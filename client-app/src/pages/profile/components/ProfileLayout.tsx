import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}
export default function ProfileLayout(props: PageLayoutProps) {
  return (
    <div className="container column">
      <div className="profile-layout-content">{props.children}</div>
    </div>
  );
}
