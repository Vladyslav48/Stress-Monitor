import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert,Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext.js"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  //Sends the link to update password
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
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
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
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