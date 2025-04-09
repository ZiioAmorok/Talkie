import { ThemeProvider } from "./contexts/ThemeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Layout from "./layouts/Layout";
import Auth from "./pages/Auth";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'chat', element: <Chat /> },
      { path: 'profile', element: <Profile /> },
    ],
  }
 
]);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
