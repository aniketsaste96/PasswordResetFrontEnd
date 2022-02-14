import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './RegisterScreen.css'

const RegisterScreen = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()


    const registerHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-type": "application/json"
            }
        }

        //if passowrd and confirm password does not match
        if (password !== confirmPassword) {
            //make the fields empty
            setPassword("")
            setConfirmPassword("")
            setTimeout(() => {
                setError("")

            }, 5000)
            return setError("Password do not match!!!")
        }

        try {
            const { data } = await axios.post(
                "/api/auth/register",
                {
                    username,
                    email,
                    password,
                },
                config
            );

            //we will recive  token after we send data

            localStorage.setItem("authToken", data.token);

            history.push('/login')
        } catch (error) {

            setError(error.response.data.error)
            setTimeout(() => {
                setError("")
            }, 5000);

        }
    }


    return (
        <div className="register-screen" >
            <form className="register-screen__form" onSubmit={registerHandler}>
                <h3 className="register-screen__title">Register </h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">User Name:</label>
                    <br />
                    <input type="text" required id="name" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>


                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input type="email" required id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>


                <div className="form-group">
                    <label htmlFor="passowrd">Password:</label>
                    <br />
                    <input type="passowrd" required id="passowrd" placeholder="Enter passowrd" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>



                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <br />
                    <input type="password" required id="confirmpassword" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary"> Register</button>
                <span className="register-screen__subtext">Alreay have an account? <Link to="/login">Login</Link> </span>
            </form>
        </div>
    )
}

export default RegisterScreen