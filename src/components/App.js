
import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import 'bootstrap/dist/css/bootstrap.min.css';
import Application from "../application/Application"


function App() {
  return (
    <div>
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/home" component={Application} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/" component={Signup} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App