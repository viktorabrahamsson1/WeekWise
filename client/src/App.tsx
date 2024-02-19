import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./routes/HomePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import ChangeUserInfo from "./routes/ChangeUserInfo";
import Users, { loader as usersLoader } from "./routes/admin routes/Users";
import Dashboard from "./routes/admin routes/Dashboard";
import Calender from "./routes/Calender";
import Send from "./routes/Send";
import Retrived from "./routes/Retrived";
import VerifyEmail from "./pages/VerifyEmail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calender",
        element: (
          <ProtectedRoute>
            <Calender />
          </ProtectedRoute>
        ),
      },
      {
        path: "/send",
        element: (
          <ProtectedRoute>
            <Send />
          </ProtectedRoute>
        ),
      },
      {
        path: "/retrived",
        element: (
          <ProtectedRoute>
            <Retrived />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute>
            <ChangeUserInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
        loader: usersLoader,
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register/:token",
    element: <VerifyEmail />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={12}
        containerStyle={{
          top: 30,
        }}
      />
    </>
  );
}

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout />}>
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <HomePage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/calender"
//             element={
//               <ProtectedRoute>
//                 <Calender />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/send"
//             element={
//               <ProtectedRoute>
//                 <Send />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/retrived"
//             element={
//               <ProtectedRoute>
//                 <Retrived />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/user"
//             element={
//               <ProtectedRoute>
//                 <ChangeUserInfo />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/users"
//             element={
//               <AdminRoute>
//                 <Users />
//               </AdminRoute>
//             }
//           />
//           <Route
//             path="/dashboard"
//             element={
//               <AdminRoute>
//                 <Dashboard />
//               </AdminRoute>
//             }
//           />
//         </Route>
//         <Route path="/register" element={<Register />} />
//         <Route path="/register/:token" element={<VerifyEmail />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//       <Toaster
//         position="top-center"
//         reverseOrder={true}
//         gutter={12}
//         containerStyle={{
//           top: 30,
//         }}
//       />
//     </BrowserRouter>
//   );
// }
