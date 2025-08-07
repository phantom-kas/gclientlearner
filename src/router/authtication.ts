export default [
  {
    path: "/authentication",
    name: "authentication",
    component: () => import("../views/authentication/index.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        alias: ["signin"],
        component: () => import("../views/authentication/login.vue"),
      },
      {
        path: "/signup",
        name: "signup",
        alias: ["register"],
        component: () => import("../views/authentication/signup.vue"),
      },
      {
        path: "/forgot-password",
        name: "forgot-password",
        // alias: ["register"],
        component: () => import("../views/authentication/forgotPassword.vue"),
      },
      {
        path: "/reset-password",
        name: "reset-password",
        // alias: ["register"],
        component: () => import("../views/authentication/resetPassword.vue"),
      },
      {
        path: "/otp",
        name: "otp",
        alias: ["otp"],
        component: () => import("../views/authentication/otp.vue"),
      }
    ],
  },
];
