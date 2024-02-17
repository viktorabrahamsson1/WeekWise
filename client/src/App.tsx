import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import ChangeUserInfo from "./routes/ChangeUserInfo";
import Users from "./routes/admin routes/Users";
import Dashboard from "./routes/admin routes/Dashboard";
import Calender from "./routes/Calender";
import Send from "./routes/Send";
import Retrived from "./routes/Retrived";
import VerifyEmail from "./pages/VerifyEmail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calender"
            element={
              <ProtectedRoute>
                <Calender />
              </ProtectedRoute>
            }
          />

          <Route
            path="/send"
            element={
              <ProtectedRoute>
                <Send />
              </ProtectedRoute>
            }
          />
          <Route
            path="/retrived"
            element={
              <ProtectedRoute>
                <Retrived />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <ChangeUserInfo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/register/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={12}
        containerStyle={{
          top: 30,
        }}
      />
    </BrowserRouter>
  );
}
