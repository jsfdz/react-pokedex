import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../providers/AuthContext";

export const Home = () => {
  const [name, setName] = useState(null),
    { user } = useContext(Auth);

  useEffect(() => {
    user
      ? user.displayName
        ? setName(user.displayName)
        : setName(user.email)
      : setName(null);
  }, [user]);

  return (
    <div className="login-container">
      <div className="navigation">
        <p>
          Welcome
          {user ? <span> {name}</span> : <span> Trainer</span>}
        </p>
        {user ? (
          <div>
            <p>
              <Link to="/pokedex">Pokedex</Link>
            </p>
          </div>
        ) : (
          <div>
            <p>
              <Link to="/login">Login</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
