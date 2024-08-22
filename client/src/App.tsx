import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import { Landing } from "./pages/landing";
import { Login } from "./pages/auth/login";
import { AuthProvider } from "./contexts/AuthContext";
import { Register } from "./pages/auth/register";
import { Create } from "./pages/create/create";
import { Events } from "./pages/event/events";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="max-w-7xl mx-auto px-8">
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/create-event" element={<Create />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
