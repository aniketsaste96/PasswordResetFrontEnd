import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordScreen.css";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
    injectStyle();
}


const ResetPasswordScreen = ({ match }) => {

    //toastify notification animation
    function notify() {
        toast.success("Password reset Sucessfull 👍,Log In Now!");
    }

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try {
            const { data } = await axios.put(
                `https://passwordresetbackend.herokuapp.com/api/auth/passwordreset/${match.params.resetToken}`,
                {
                    password,
                },
                config

            );
            console.log(match);

            setSuccess(data.data);
            notify()
        } catch (error) {
            console.log(error);
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="resetpassword-screen">
            <form
                onSubmit={resetPasswordHandler}
                className="resetpassword-screen__form"
            >
                <h3 className="resetpassword-screen__title">Forgot Password</h3>
                {error && <span className="error-message" style={{ color: "red" }}>{error} </span>}
                {success && (
                    <span className="success-message" >
                        {success} <Link to="/login">Login</Link>

                    </span>
                )

                }
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        required
                        id="password"
                        placeholder="Enter new password"
                        autoComplete="true"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm New Password:</label>
                    <input
                        type="password"
                        required
                        id="confirmpassword"
                        placeholder="Confirm new password"
                        autoComplete="true"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Reset Password
                </button>

            </form>
            <ToastContainer style={{ background: "darkgreen" }} />
        </div>
    );
};

export default ResetPasswordScreen;