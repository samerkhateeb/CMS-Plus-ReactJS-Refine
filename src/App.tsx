import "@pankod/refine-antd/dist/reset.css";

import {
  ErrorComponent,
  Layout,
  ReadyPage,
  notificationProvider,
} from "@pankod/refine-antd";

import { PostCreate } from "pags/posts/create";
import { PostEdit } from "pags/posts/edit";
import { PostList } from "pags/posts/list";
import { PostShow } from "pags/posts/show";
import React from "react";
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

const API_URL = "https://api.fake-rest.refine.dev";

function App() {
  return (
    <Refine
      dataProvider={dataProvider(API_URL)}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: PostList,
          show: PostShow,
          create: PostCreate,
          edit: PostEdit,
          canDelete: true,
        },
      ]}
    />
  );
}

export default App;
