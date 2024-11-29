import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "@/router.jsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "@/store.js";
import { HeadBar } from "@/components/HeadBar.jsx";
import { GlobalStyles } from "@/components/style/GlobalStyles.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#272727",
          colorTextBase: "white",
        },
        components: {
          Button: {
            defaultColor: "#fff",
            defaultBorderColor: "#fff",
            defaultFontWeight: 700,
            defaultBg: "transparent",
            defaultHoverBg: "#a3a3a3",
            defaultHoverColor: "unset",
            defaultBorderWidth: 2,
          },
          Table: {},
        },
      }}
    >
      <GlobalStyles />
      <HeadBar />
      <RouterProvider router={router} />

      {/*<Outlet />*/}
    </ConfigProvider>
  </Provider>,
);