import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { Link } from 'react-router-dom'
import './LoginScreen.css'

import { injectStyle } from "react-toastify/dist/inject-style";
import { toast } from "react-toastify";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
    injectStyle();
}

const LoginScreen = () => {
    function notify() {
        toast.success("Hey 👋,Log In Sucessfull!");
    }

    //three states are going to change we need three useStates
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // const [error, setError] = useState("")
    const history = useHistory()

    //prevent user to go into login and register after login

    useEffect(() => {
        //check if local storage has authToken in it if exist redirect
        if (localStorage.getItem("authToken")) {
            history.push("/")
        }
    }, [history])




    const loginHandler = async (e) => {
        //avoid defaukt behaviour of form
        e.preventDefault();

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }



        try {
            const { data } = await axios.post('https://passwordresetbackend.herokuapp.com/api/auth/login', { email, password }, config);

            //we will recive  token after we send data

            localStorage.setItem("authToken", data.token);

            history.push('/')

        } catch (error) {

            setError(error.response.data.error)
            setTimeout(() => {
                setError("")
            }, 5000);

        }

    }


    return (
        <div className="login-screen" >
            <form className="login-screen__form" onSubmit={loginHandler}>
                <h3 className="login-screen__title">Login </h3>
                <h5>Email:aniketsaste96@gmail.com</h5>
                <h5>Password:123456</h5>
                <i>  <span style={{ 'color': "red" }}>***</span>  send grid account temporarily suspended(for email service) please watch demo below repository </i>
                <a href="https://github.com/aniketsaste96/PasswordResetFrontEnd" target="_blank">Click Here</a>
                {error && <span className="error-message" style={{ color: "red" }}>{error}</span>}
                {() => !error ? notify : error}



                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                        tabIndex={1} />
                </div>


                <div className="form-group">
                    <label htmlFor="passowrd">Password:

                    </label>
                    <br />
                    <input type="passowrd" required id="passowrd" placeholder="Enter passowrd" value={password} onChange={(e) => setPassword(e.target.value)}
                        tabIndex={2}
                    />
                    <br />
                    <Link to="forgotpassword" className="login-screen__fortpassword"
                        tabIndex={4}

                    >Forgot Password?</Link>
                </div>



                <button type="submit" className="btn btn-primary btn-group"
                    tabIndex={3} id="animate.css"
                > Login </button>
                <span className="login-screen__subtext">don't have an account? <Link to="/register">Register</Link> </span>
            </form>

        </div>
    )
}

export default LoginScreen;