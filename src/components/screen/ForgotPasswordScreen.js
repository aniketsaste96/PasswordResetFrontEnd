import { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import "./ForgotPasswordScreen.css";

const ForgotPasswordScreen = () => {
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "/api/auth/forgotpassword",
                { email },
                config
            );

            setSuccess(data.data);
            console.log(data.data);

        } catch (error) {
            setError(error);
            setEmail("");
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    return (
        <div className="forgotpassword-screen">
            <form
                onSubmit={forgotPasswordHandler}
                className="forgotpassword-screen__form"
            >
                <h3 className="forgotpassword-screen__title">Forgot Password</h3>
                {error && <span className="error-message">{error}</span>}
                {success && <span className="success-message">{success}</span>}
                <div className="form-group">
                    <i className="forgotpassword-screen__subtext">
                        Please enter the email address you register your account with. Email will Be sent to Your email address.
                    </i>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Send Email
                </button>
            </form>
        </div>
    )
}

export default ForgotPasswordScreen;