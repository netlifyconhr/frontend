import { RouterProvider } from "react-router-dom";
import routes from "./router/app-routes";

export default function App() {
  return <RouterProvider router={routes} />;
}
