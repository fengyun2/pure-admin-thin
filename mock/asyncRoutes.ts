// 模拟后端动态生成路由
import { MockMethod } from "vite-plugin-mock";
import { system, permission, frame, components } from "@/router/enums";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const systemRouter = {
  path: "/system",
  meta: {
    icon: "setting",
    title: "menus.hssysManagement",
    rank: system
  },
  children: [
    {
      path: "/system/user/index",
      name: "User",
      meta: {
        icon: "flUser",
        title: "menus.hsUser",
        roles: ["admin"]
      }
    },
    {
      path: "/system/role/index",
      name: "Role",
      meta: {
        icon: "role",
        title: "menus.hsRole",
        roles: ["admin"]
      }
    },
    {
      path: "/system/dept/index",
      name: "Dept",
      meta: {
        icon: "dept",
        title: "menus.hsDept",
        roles: ["admin"]
      }
    }
  ]
};

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "menus.permission",
    icon: "lollipop",
    rank: permission
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "menus.permissionPage",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "menus.permissionButton",
        roles: ["admin", "common"],
        auths: ["btn_add", "btn_edit", "btn_delete"]
      }
    }
  ]
};

const frameRouter = {
  path: "/iframe",
  meta: {
    icon: "monitor",
    title: "menus.hsExternalPage",
    rank: frame
  },
  children: [
    {
      path: "/iframe/vue",
      name: "vue",
      meta: {
        title: "menus.vue" // vue
      },
      children: [
        {
          path: "/iframe/vue/guide",
          name: "vue-guide",
          meta: {
            title: "menus.vue-guide" // vue文档
          },
          children: [
            {
              path: "/iframe/vue/guide/introduction",
              name: "vue-guide-introduction",
              meta: {
                title: "menus.vue-guide-introduction", // vue简介
                frameSrc: "https://cn.vuejs.org/guide/introduction.html"
              }
            },
            {
              path: "/iframe/vue/guide/quick-start",
              name: "vue-guide-quick-start",
              meta: {
                title: "menus.vue-guide-quick-start", // vue快速上手
                frameSrc: "https://cn.vuejs.org/guide/quick-start.html"
              }
            },
            {
              path: "/iframe/vue/guide/essentials/application",
              name: "vue-guide-essentials-application",
              meta: {
                title: "menus.vue-guide-essentials-application", // vue创建一个应用
                frameSrc:
                  "https://cn.vuejs.org/guide/essentials/application.html"
              }
            },
            {
              path: "/iframe/vue/guide/essentials/template-syntax",
              name: "vue-guide-essentials-template-syntax",
              meta: {
                title: "menus.vue-guide-essentials-template-syntax", // Vue模板语法
                frameSrc:
                  "https://cn.vuejs.org/guide/essentials/template-syntax.html"
              }
            }
          ]
        },
        {
          path: "/iframe/vue/ecosystem",
          name: "vue-ecosystem",
          meta: {
            title: "menus.vue-ecosystem" // vue生态系统
          },
          children: [
            {
              path: "/iframe/vue/vue-router",
              name: "vue-router",
              meta: {
                title: "menus.vue-router",
                frameSrc: "https://router.vuejs.org"
              }
            },
            {
              path: "/iframe/vue/pinia",
              name: "pinia",
              meta: {
                title: "menus.pinia",
                frameSrc: "https://pinia.vuejs.org"
              }
            },
            {
              path: "/iframe/vue/vite",
              name: "vite",
              meta: {
                title: "menus.vite",
                frameSrc: "https://vitejs.dev"
              }
            }
          ]
        }
      ]
    },
    {
      path: "/iframe/postmessage",
      name: "postmessage",
      meta: {
        title: "menus.postmessage",
        frameSrc: "http://localhost:5173"
      }
    }
    // {
    //   path: "/iframe/pure",
    //   name: "FramePure",
    //   meta: {
    //     title: "menus.hsPureDocument",
    //     frameSrc: "https://yiming_chang.gitee.io/pure-admin-doc",
    //     roles: ["admin", "common"]
    //   }
    // },
    // {
    //   path: "/external",
    //   name: "https://yiming_chang.gitee.io/pure-admin-doc",
    //   meta: {
    //     title: "menus.externalLink",
    //     roles: ["admin", "common"]
    //   }
    // },
    // {
    //   path: "/iframe/ep",
    //   name: "FrameEp",
    //   meta: {
    //     title: "menus.hsEpDocument",
    //     frameSrc: "https://element-plus.org/zh-CN/",
    //     roles: ["admin", "common"]
    //   }
    // },
    // {
    //   path: "/iframe/vue3",
    //   name: "FrameVue",
    //   meta: {
    //     title: "menus.hsVueDocument",
    //     frameSrc: "https://cn.vuejs.org/",
    //     roles: ["admin", "common"]
    //   }
    // },
    // {
    //   path: "/iframe/vite",
    //   name: "FrameVite",
    //   meta: {
    //     title: "menus.hsViteDocument",
    //     frameSrc: "https://cn.vitejs.dev/",
    //     roles: ["admin", "common"]
    //   }
    // },
    // {
    //   path: "/iframe/pinia",
    //   name: "FramePinia",
    //   meta: {
    //     title: "menus.hsPiniaDocument",
    //     frameSrc: "https://pinia.vuejs.org/zh/index.html",
    //     roles: ["admin", "common"]
    //   }
    // },
    // {
    //   path: "/iframe/vue-router",
    //   name: "FrameRouter",
    //   meta: {
    //     title: "menus.hsRouterDocument",
    //     frameSrc: "https://router.vuejs.org/zh/",
    //     roles: ["admin", "common"]
    //   }
    // },
    // {
    //   path: "/iframe/tailwindcss",
    //   name: "FrameTailwindcss",
    //   meta: {
    //     title: "menus.hsTailwindcssDocument",
    //     frameSrc: "https://tailwindcss.com/docs/installation",
    //     roles: ["admin", "common"]
    //   }
    // }
  ]
};

const componentsRouter = {
  path: "/components",
  meta: {
    icon: "setting",
    title: "组件demo",
    rank: components
  },
  children: [
    {
      path: "/components/form",
      name: "form",
      meta: {
        icon: "flUser",
        title: "form",
        roles: ["admin"]
      }
    }
  ]
};

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [systemRouter, permissionRouter, frameRouter, componentsRouter]
      };
    }
  }
] as MockMethod[];
