import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "components",
  component: Layout,
  redirect: "/components/form/index",
  meta: {
    icon: "homeFilled",
    title: $t("menus.hshome"),
    rank: 0
  },
  children: [
    {
      path: "/components/form/index",
      name: "form",
      component: () => import("@/views/components/form/index.vue"),
      meta: {
        title: "form 表单"
      }
    }
  ]
} as RouteConfigsTable;
