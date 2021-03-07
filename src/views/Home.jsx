import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from '../providers/AuthContext'

export const Home = () => {
    const
        [name, setName] = useState(null),
        { user } = useContext(Auth)

    useEffect(() => {
        user ?
            user.displayName
                ? setName(user.displayName)
                : setName(user.email)
            : setName(null)
    }, [user])

    return (
        <div className="home">
            <div className="container">
                <div className="welcome-bg">
                    <img src="https://i.pinimg.com/originals/cb/ae/a1/cbaea15b7acd68e50a3cb84ab429f89e.png" alt="bg-profesor" />
                </div>
                <h1>Welcome
                {user ?
                        <span> Back, {name}</span>
                        :
                        <span> Trainer</span>
                    }
                </h1>
                <>
                    {user ?
                        <div className="go-pokedex">
                            <Link to='/pokedex'>Go to Pokedex</Link>
                        </div>
                        :
                        <div className="go-login">
                            <Link to='/login'>Go to Login</Link>
                        </div>
                    }
                </>
            </div>
        </div>
    )
}