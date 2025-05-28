import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChallengeRow = ({ id, title, difficulty, username, solved, showSearch }) => {
  const colSize = showSearch ? 1 : 2;
  return (
    <Row className="py-2 border-bottom">
      {username && (
        <Col className="border-right" xs={colSize} md={colSize}>
          <Link
            to={`/profile/${username}`}
            className="text-decoration-none text-warning fw-semibold"
          >
            {username}
          </Link>
        </Col>
      )}

      {title && (
        <Col xs={6} md={6} className="mb-2 mb-md-0">
          <Link
            to={`/challenges/${id}`}
            className="text-decoration-none text-info fw-semibold d-block"
            style={{
              wordWrap: 'break-word',
              whiteSpace: 'normal',
            }}
          >
            {title}
          </Link>
        </Col>
      )}

      {difficulty && (
        <Col xs={colSize} md={colSize}>
          <span className="badge bg-secondary">{difficulty}</span>
        </Col>
      )}

      {typeof solved === 'boolean' && (
        <Col xs={colSize} md={colSize}>
          <span className={`badge ${solved ? 'bg-success' : 'bg-danger'}`}>
            {solved ? 'Solved' : 'Unsolved'}
          </span>
        </Col>
      )}
    </Row>
  );
};
export default ChallengeRow;