import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/landing";
import { Login } from "./pages/auth/login";
import { AuthProvider } from "./contexts/AuthContext";
import { Register } from "./pages/auth/register";
import { Create } from "./pages/create/create";
import { Events } from "./pages/event/events";
import { Toaster } from "react-hot-toast";
import { Event } from "./pages/event/event";
import { Profile } from "./pages/profile";
import PrivateRoute from "./components/PrivateRoute";
import { Update } from "./pages/event/update";
import Layout from "./layout/layout";
import { Order } from "./pages/order";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <div className="max-w-7xl mx-auto px-8">
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/events" element={<Events />} />
              <Route
                path="/create-event"
                element={
                  <PrivateRoute>
                    <Create />
                  </PrivateRoute>
                }
              />
              <Route path="/event/:id" element={<Event />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/event/:id/edit"
                element={
                  <PrivateRoute>
                    <Update />
                  </PrivateRoute>
                }
              />
              <Route
                path="/event/:id/orders"
                element={
                  <PrivateRoute>
                    <Order />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Layout>
        </div>
      </AuthProvider>
      <Toaster />
    </Router>
  );
}

export default App;
