// src/layouts/PrivateLayout.jsx
import { Outlet } from "react-router-dom";
import { styled } from "../../styled-system/jsx";
import AppSidebar from "../components/layout/AppSidebar";

const Layout = styled("div", {
  base: {
    display: "flex",
    height: "100vh",    
    bg: "background",
    overflow: "hidden", 
  },
});

const Content = styled("main", {
  base: {
    flex: 1,
    overflowY: "auto",  
  },
});

export default function PrivateLayout() {
  return (
    <Layout>
      <AppSidebar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
