import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert,Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext.js"
import { Link, useHistory } from "react-router-dom"


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

 //Login the user if credentials are correct
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/home")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }


  return (
    <>
    <Container
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", width:"50vw" }}
    >
      <Card  style={{width:"70vw", minWidth: "50%"  }}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password ">
              <Form.Label className="mt-4">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 ">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
                <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
        </Card.Body>
      </Card>
      </Container>
    </>
  )
}