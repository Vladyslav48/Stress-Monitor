import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext.js"
import { Link, useHistory } from "react-router-dom"


export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  //Changes user's credentials 
  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/login")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
 <Container
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", width:"50vw" }}
    >
      <Card  style={{width:"70vw", minWidth: "50%"  }}>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-4">Password</Form.Label>
              <Form.Control
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label className="mt-4">Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
        <Link to="/home">Cancel</Link>
      </div>
        </Card.Body>
      </Card>

      </Container>
    </>
  )
}