import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("robot", "routes/robot.tsx"),
  route("xstate", "routes/xstate.tsx"),
] satisfies RouteConfig;
