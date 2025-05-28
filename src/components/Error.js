import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

function Error({ message }) {
  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <Alert variant="danger">
            <h4>Error</h4>
            <p>{message}</p>
          </Alert>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Error;