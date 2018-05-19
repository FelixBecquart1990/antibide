import Vue from "vue";
import Router from "vue-router";
import Signin from "@/pages/Signin";
import JoinTeam from "@/pages/JoinTeam";
import Home from "@/pages/Home";

import AuthGuard from "./auth-guard";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      //beforeEnter: AuthGuard
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    },
    {
      path: "/signin/:id",
      name: "JoinTeam",
      props: true,
      component: JoinTeam
    }
  ]
});
