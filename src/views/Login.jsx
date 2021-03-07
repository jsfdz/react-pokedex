import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import { useForm } from 'react-hook-form'
import { Auth } from '../providers/AuthContext'
import { app, googleAuthProvider, facebookAuthProvider, githubAuthProvider } from '../services/FireBase'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebookF, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const Login = () => {
    const
        [error, setError] = useState(null),
        { user } = useContext(Auth),
        { handleSubmit, register, errors } = useForm()

    const
        onSubmit = async (data) => {
            const
                { email, password } = data

            await app.auth()
                .signInWithEmailAndPassword(email, password)
                .catch(error => {
                    setError(error.message)
                })
        },

        socialLogin = async provider => {
            await app.auth().signInWithPopup(provider)
        }

    return (
        <>{!user ?
            <div className="login-form">
                <div className="container">

                    <div className="header-login">
                        <span>
                            <Link to="/">
                                {/* <FontAwesomeIcon icon={faArrowLeft} /> */} back
                            </Link>
                        </span><h1> Login</h1>
                    </div>

                    <div className="test">
                        <p>email: test@test.com</p>
                        <p>password: 123456</p>
                    </div>

                    <p>Login with your email and password.</p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        <div className="login-item">
                            <input
                                type="email"
                                name="email"
                                placeholder="write yout email"
                                ref={register({
                                    required: "Enter your e-mail",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Enter a valid e-mail address",
                                    },
                                })}
                                noValidate
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </div>

                        <div className="login-item">
                            <input
                                type="password"
                                name="password"
                                placeholder="write your password"
                                ref={register({ required: "Enter your password" })}
                                noValidate
                            />

                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </div>


                        <button type="submit">Login</button>
                        {error &&
                            <p>{error}</p>
                        }

                        <p>Or you can log in with any of these social networks.</p>

                        <div className="social-login">
                            <button
                                className="login-form-button google"
                                onClick={() => socialLogin(googleAuthProvider)}
                            >
                                {/* <FontAwesomeIcon icon={faGoogle} />  */}
                                Google</button>
                            <button
                                className="login-form-button facebook"
                                onClick={() => socialLogin(facebookAuthProvider)}
                            >
                                {/* <FontAwesomeIcon icon={faFacebookF} />  */}
                                Facebook</button>
                            <button
                                className="login-form-button github"
                                onClick={() => socialLogin(githubAuthProvider)}
                            >
                                {/* <FontAwesomeIcon icon={faGithub} />  */}
                                GitHub</button>
                        </div>
                    </form>
                </div>

            </div>
            :
            <Redirect to="/pokedex" />
        }</>
    );
};
