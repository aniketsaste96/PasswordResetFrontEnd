import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
    injectStyle();
}


const PrivateScreen = () => {
    function notify() {
        toast.success("Hey 😎,Log In Sucessfull!!!");
    }
    const history = useHistory()
    const [error, setError] = useState("")
    const [privateData, setPrivateData] = useState("")
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push("/login")
        }
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const { data } = await axios.get('/api/private', config)
                setPrivateData(data.data)
                console.log(data.data);
                notify();
            } catch (error) {
                localStorage.removeItem("")
                setError("You are Not authorized,Please Log In!!!")

            }
        }


        //call inside useEffect
        fetchPrivateData()
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("authToken")
        history.push('/login')

    }


    return (
        error ? <span className="error-message">{error}</span> :
            <>
                <div style={{ background: "green", color: "white" }}>{privateData}</div>
                <button onClick={logoutHandler} className="btn btn-danger">Log Out</button>
                <ToastContainer toastStyle={{ backgroundColor: "green", color: "white" }} />
            </>

    )
}

export default PrivateScreen