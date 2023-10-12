import { ROUTE_PATH } from "src/constants/routes.const";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATH.ACCUEIL,
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: ROUTE_PATH.BINARY,
        component: () => import("pages/BinaryChainPage.vue"),
      },
      {
        path: ROUTE_PATH.TRAVEL,
        component: () => import("pages/TravelingPage.vue"),
      },
      {
        path: ROUTE_PATH.MOVEMENT,
        component: () => import("pages/MovementPage.vue"),
      },
      {
        path: ROUTE_PATH.FOXES_VS_RABITS,
        component: () => import("pages/FoxesRabbitsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
