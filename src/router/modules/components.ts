import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "components",
  component: Layout,
  redirect: "/components/form",
  meta: {
    icon: "homeFilled",
    title: $t("menus.hshome"),
    rank: 0
  },
  children: [
    {
      path: "/components/form",
      name: "form",
      component: () => import("@/views/components/form.vue"),
      meta: {
        title: "form 表单"
      }
    }
  ]
} as RouteConfigsTable;
