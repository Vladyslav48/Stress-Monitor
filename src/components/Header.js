import React, { useState } from "react"
import { Navbar, Nav} from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext.js"


export default function Header() {
    const [setError] = useState("")
    const {logout } = useAuth()
    const history = useHistory()
  
    async function handleLogout() {
      try {
        await logout()
        history.push("/login")
      } catch {
        setError("Failed to log out")
      }
    }

    return (
      <div>
      <div className="row">
          <div className="col-md-12">
                  <Navbar className="navbar navbar-dark bg-primary"  expand="lg" sticky="top">
                      <Navbar.Brand href="#home">Stress Monitor</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="ml-auto">
                          <Nav.Link href="/update-profile">Update Profile</Nav.Link>
                          <Nav.Link href="#link" onClick={handleLogout}>Log out</Nav.Link>
                          </Nav>
                      </Navbar.Collapse>
                  </Navbar>
                  <br />
          </div>
      </div>
  </div>
    )
  }