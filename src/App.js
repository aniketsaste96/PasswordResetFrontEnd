import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Routing
import PrivateRoute from './components/routing/PrivateRoute'

//SCreens
import PrivateScreen from './components/screen/PrivateScreen'
import LoginScreen from './components/screen/LoginScreen'
import RegisterScreen from './components/screen/RegisterScreen'
import ForgotPasswordScreen from './components/screen/ForgotPasswordScreen'
import ResetPasswordScreen from './components/screen/ResetPasswordScreen'


const App = () => {
    return (
        <div className="App">
            <Switch>

                <PrivateRoute exact path="/" component={PrivateScreen} />

                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/register" component={RegisterScreen} />
                <Route
                    exact
                    path="/forgotpassword"
                    component={ForgotPasswordScreen}
                />
                <Route
                    exact
                    path="/passwordreset/:resetToken"
                    component={ResetPasswordScreen}
                />
            </Switch>





        </div >
    )
}

export default App