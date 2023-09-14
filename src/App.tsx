import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import { UserIdProvider } from "./contexts/useUserId";
import Game from "./pages/game";
import Start from "./pages/start";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/start" replace />} />
      <Route path="start" element={<Start />} />
      <Route path="game" element={<Game />} />

      <Route path="*" element={<Navigate to="/start" replace />} />
    </Route>,
  ),
);

function App() {
  return (
    <UserIdProvider>
      <RouterProvider router={router} />
    </UserIdProvider>
  );
}

export default App;
