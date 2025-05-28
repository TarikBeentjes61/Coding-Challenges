import usePostHandler from "../usePostHandler";
import useGetHandler from "../useGetHandler";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';

function SolveChallengeForm({challengeId}) {
    const { post } = usePostHandler('challenges/solve');
    const { data: challenge, loading, error } = useGetHandler(`challenges/${challengeId}`, { method: 'GET' });
    const [solution, setSolution] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await post({ challengeId, solution });
            setMessage('Challenge solved successfully');
        } catch (err) {
            setMessage(err.message);
    }
  };
  if (challenge) {
    return (
      <Container className="py-4">
        <Row className='justify-content-center'>
          <Col md={8} lg={6}>
            <Row>
              <h2>{challenge.title}</h2>
            </Row>
            <Container className="p-3 border">
            <Row style={{ marginBottom: '1em', borderBottom: '2px dashed' }}>
              <p>{challenge.description}</p>
            </Row>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formSolution" className="mb-3">
                  <Form.Label className="fw-semibold">Your Solution</Form.Label>
                  <Form.Control 
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Enter your solution here"
                    className="py-2"
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 fw-semibold"
                >
                  Submit
                </Button>
              </Form>
              {message && (
                <Alert variant="info" className="mt-4 text-center">
                  {message}
                </Alert>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SolveChallengeForm;
