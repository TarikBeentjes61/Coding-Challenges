import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

import usePostHandler from '../usePostHandler';

function CreateChallengeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [solution, setSolution] = useState('');
  const [message, setMessage] = useState('');

  const { post }  = usePostHandler('challenges');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post({ title, description, difficulty, solution });
      setMessage('Challenge created successfully');
    } catch (err) {
      setMessage(err.message);
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center my-4">Create Challenge</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group controlId="formDifficulty" className="mt-3">
              <Form.Label>Difficulty</Form.Label>
              <Form.Select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formSolution" className="mt-3">
              <Form.Label>Solution</Form.Label>
              <Form.Control 
                type="text"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="Enter solution"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Submit
            </Button>
          </Form>

          {message && (
            <Alert variant="info" className="mt-3 text-center">
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CreateChallengeForm;