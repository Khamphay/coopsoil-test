export default [
  {
    name: "Main",
    path: "/",
    component: import("../pages/mainpage.vue"),
    redirect: "/dashboard",
    children: [
      {
        name: "dashboard",
        path: "/dashboard",
        components: import("./../pages/layout/dashboard.vue")
      }
    ]
  }
];
