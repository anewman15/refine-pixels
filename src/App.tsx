import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  AuthPage,
  notificationProvider,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";

import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import routerProvider from "@pankod/refine-react-router-v6";
import { supabaseClient } from "utility";
import "styles/antd.less";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
  PixelsHeader,
} from "components/layout";
import authProvider from "./authProvider";
import { CanvasCreate, CanvasList, CanvasShow } from "pages";

function App() {
  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      liveProvider={liveProvider(supabaseClient)}
      authProvider={authProvider}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: '/login',
            element: <AuthPage
              type="login"
              providers={[
                {
                  name: "google",
                  label: "Sign in with Google",
                },
              ]}
              formProps={{
                initialValues: {
                  email: "info@refine.dev",
                  password: "refine-supabase",
                },
              }}
            />
          },
          {
            path: "/register",
            element: <AuthPage type="register" />,
          },
          {
            path: "/forgot-password",
            element: <AuthPage type="forgotPassword" />,
          },
          {
            path: "/update-password",
            element: <AuthPage type="updatePassword" />,
          },
        ],
      }}
      resources={[
        {
          name: "canvases",
          options: {
            label: "Featured",
          },
          list: CanvasList,
          show: CanvasShow,
        },
      ]}
      LoginPage={() => (
        <AuthPage
          type="login"
          providers={[
            {
              name: "google",
              label: "Sign in with Google",
            },
          ]}
          formProps={{
            initialValues: {
              email: "info@refine.dev",
              password: "refine-supabase",
            },
          }}
        />
      )}
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      Title={Title}
      Header={PixelsHeader}
      // Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
    />
  );
}

export default App;
