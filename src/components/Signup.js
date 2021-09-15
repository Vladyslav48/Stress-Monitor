import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert , Container, FormLabel} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext.js"
import { Link, useHistory } from "react-router-dom"


export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  // Signs up the user if credentials are correct
  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/login")
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <>
        <Container
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", width:"50vw" }}
    >
      <Card style={{width:"70vw", minWidth: "50%"  }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} id="SignUpForm">
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}  required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label  className="mt-4">Password</Form.Label>
              <Form.Control pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label  className="mt-4">Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <FormLabel className="text-center mt-4"><i>Note: password must contain at least one number and one uppercase and lowercase letter, and at least 8 characters</i></FormLabel>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
        </Card.Body>
      </Card>
      </Container>
    </>
  )
}