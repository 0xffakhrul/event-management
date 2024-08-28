import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, logout, isLoading } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState();

  if (isLoading) {
    return <header>Loading...</header>;
  }
  return (
    <header className="flex items-center justify-between h-20 font-semibold">
      <nav className="logo text-3xl font-bold">Eve</nav>
      <div className="flex items-center gap-6">
        {!isLoggedIn ? (
          <>
            <nav>
              <Link to="/login">Log in</Link>
            </nav>
            <button className="px-5 py-2 rounded-full bg-violet-600 text-white">
              <Link to="/register">Register</Link>
            </button>
          </>
        ) : (
          <>
            <nav>
              <Link to="/create-event">Create Event</Link>
            </nav>
            <nav>
              <Link to="/profile">Profile</Link>
            </nav>
            <button
              onClick={logout}
              className="px-5 py-2 rounded-full bg-violet-600 text-white"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
