import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "@/router.jsx";
import { ConfigProvider, Flex } from "antd";
import { Provider } from "react-redux";
import { store } from "@/store.js";
import { HeadBar } from "@/components/HeadBar.jsx";
import { GlobalStyles } from "@/components/style/GlobalStyles.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalStyles />
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#272727",
          colorTextBase: "white",
          colorBorder: "#b7b7b7",

        },
        components: {
          Input: {
            activeBorderColor: "#c7c7c7",
            hoverBorderColor: "#fff",
            borderColor: "#fff",
          },
          Button: {
            defaultColor: "#fff",
            defaultBorderColor: "#fff",
            defaultFontWeight: 700,
            defaultBg: "transparent",
            defaultHoverBg: "#a3a3a3",
            defaultHoverColor: "unset",
            defaultBorderWidth: 2,
          },
          TextArea: {
            defaultColor: "#fff",
            defaultBorderColor: "#fff",
            defaultFontWeight: 700,
            defaultBg: "transparent",
            defaultHoverBg: "#a3a3a3",
            defaultHoverColor: "unset",
            defaultBorderWidth: 2,
          },
          Typography: {
            colorBgBase: "#272727",
          },
          Table: {
            rowHoverBg: "#575757",
          },
        },
      }}
    >
      <RouterProvider router={router}>
        {/*<Flex vertical style={{ height: "100vh", minHeight: 0 }}>*/}
        {/*  <HeadBar />*/}
        {/*  <Outlet />*/}
        {/*</Flex>*/}
      </RouterProvider>
    </ConfigProvider>
  </Provider>,
);
