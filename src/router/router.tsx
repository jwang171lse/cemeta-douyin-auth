import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import nprogress from "nprogress"; // progress bar
import "nprogress/nprogress.css";
import { settingRoutes } from "@/util/route";
// import { useLocalStorage } from "@/hooks/useStorage";
// import { LocalStorageKey } from "@/config/enum";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      noLogin: true,
    },
  },
  { path: "/test", name: "test", component: () => import("@/views/Test.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes: Array<RouteRecordRaw>(),
});

export function generateRoutes(init = false) {
  settingRoutes(router, routes, init);
}

generateRoutes(true);

nprogress.configure({ showSpinner: false });

// router.beforeEach(async (to, _from, next) => {
//   nprogress.start();
//   //不需要登录就可以查看的页面
//   if (to.meta.noLogin) {
//     next();
//   } else {
//     let userInfo = useLocalStorage(LocalStorageKey.USER_INFO);
//     if (!userInfo) {
//       next({
//         name: "login",
//       });
//     } else {
//       if (router.hasRoute(to.name as string)) {
//         next();
//       } else {
//         next(false);
//         setTimeout(() => {
//           router.replace(to);
//         }, 0);
//       }
//     }
//   }
// });

router.afterEach((_to, _from) => {
  nprogress.done();
});

export default router;
