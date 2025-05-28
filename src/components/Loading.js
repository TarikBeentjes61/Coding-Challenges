import { Container, Row, Col, Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading, please wait...</p>
        </Col>
      </Row>
    </Container>
  );
}
export default Loading;