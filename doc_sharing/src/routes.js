import LoginPage from './Login';
import TextEditor from "./TextEditor";

var routes = [
//   {
//     path: "/",
//     name: "Login",
//     icon: "nc-icon nc-bank",
//     component: LoginPage,
//     layout: "/admin",
//   },
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: "nc-icon nc-chat-33",
//     component: Dashboard,
//     layout: "/admin",
//   },
  {
    path: "texteditor",
    name: "TextEditor",
    icon: "nc-icon nc-button-play",
    component: TextEditor,
    layout: "/admin",
  },
];
export default routes;
