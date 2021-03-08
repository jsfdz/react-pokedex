import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../providers/AuthContext";
import {
  app,
  googleAuthProvider,
  facebookAuthProvider,
  githubAuthProvider,
} from "../services/FireBase";

export const Login = () => {
  const { user } = useContext(Auth),
    { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
      const { email, password } = data;

      await app.auth().signInWithEmailAndPassword(email, password);
    },
    socialLogin = async (provider) => {
      await app.auth().signInWithPopup(provider);
    };

  return (
    <>
      {!user ? (
        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="btn-log">
              <div>
                <Link to="/">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>
              <h4>Login</h4>
            </div>
            <div className="test">
              <p>Account demo</p>
              <p>email: test@test.com</p>
              <p>password: 123456</p>
            </div>
            <div className="labels">
              <label htmlFor="email">Write yout email</label>
            </div>

            <div className="login-item">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@example.com"
                ref={register({
                  required: "Enter your e-mail",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a valid e-mail address",
                  },
                })}
                noValidate
              />
              <div className="error-container"></div>
              {errors.email && (
                <p className="error-login">{errors.email.message}*</p>
              )}
            </div>
            <div className="labels">
              <label htmlFor="password">Write yout password</label>
            </div>
            <div className="login-item">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                ref={register({ required: "Enter your password" })}
                noValidate
              />
              {errors.password && (
                <p className="error-login">{errors.password.message}*</p>
              )}
            </div>
            <div className="btn-submit-social">
              <div>
                <button type="submit">Login</button>
              </div>

              <div className="social-login">
                <p>Or you can start with</p>
                <i
                  className="fab fa-google"
                  onClick={() => socialLogin(googleAuthProvider)}
                ></i>
                <i
                  className="fab fa-facebook"
                  onClick={() => socialLogin(facebookAuthProvider)}
                ></i>
                <i
                  className="fab fa-github"
                  onClick={() => socialLogin(githubAuthProvider)}
                ></i>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Redirect to="/pokedex" />
      )}
    </>
  );
};
