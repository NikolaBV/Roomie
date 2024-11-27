import { Content } from "antd/es/layout/layout";
import { Layout } from "antd";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout(props: PageLayoutProps) {
  return (
    <>
      <Layout>
        <Navbar></Navbar>
        <Layout>
          <Content>{props.children}</Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    </>
  );
}
