import { HeadBar } from "@/components/HeadBar.jsx";
import { Outlet } from "react-router-dom";
import { Flex } from "antd";

export const Layout = () => {
  return (
    <Flex vertical style={{ height: "100vh", minHeight: 0 }}>
      <HeadBar />
      <Outlet />
    </Flex>
  );
};
