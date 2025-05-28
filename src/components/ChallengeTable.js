import ChallengeRow from '../components/ChallengeRow';
import { useState, useEffect } from 'react';
import useGetHandler from '../useGetHandler';
import { Form, Container, Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';
import Error from '../components/Error';

function ChallengeTable({url = 'challenges', showUser = true, showTitle = true, showDifficulty = true, showSolved = true, showSearch = true}) { 
    const { data: challenges, loading, error } = useGetHandler(url, { method: 'GET' });
    const [filteredChallenges, setFilteredChallenges] = useState(null);
    const [title, setTitle] = useState(null);
    const [username, setUsername] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [solved, setSolved] = useState(null);
    const colSize = showSearch ? 1 : 2;
    const titleColSize = showSearch ? 1 : 6;

    useEffect(() => {
        if (!challenges) return;

        const filtered = challenges.filter((challenge) => {
            const matchesTitle = !title || challenge.title?.toLowerCase().includes(title.toLowerCase());
            const matchesUser = !username || challenge.username?.toLowerCase().includes(username.toLowerCase());
            const matchesDifficulty = !difficulty || challenge.difficulty === difficulty;
            const matchesSolved = !solved ||
            (solved === 'solved' && challenge.solved === true) ||
            (solved === 'unsolved' && challenge.solved === false);

            return matchesTitle && matchesUser && matchesDifficulty && matchesSolved;
        });

        setFilteredChallenges(filtered);
    }, [title, username, difficulty, solved, challenges]);

    if (challenges == null || challenges.length == 0) {
        return (
            <Container className="p-0">
                {loading && <Loading />}
                {error && <Error message={error} />}
                {!loading && !error && <p>No challenges found.</p>}
            </Container>
        );
    } else {
        return (
        <Container className="p-0">
            <Form inline className="mb-3">
                <Row className="py-2 border-bottom rounded fw-bold">
                {showUser && 
                <><Col xs={colSize} md={colSize}>User</Col>
                {showSearch &&
                <Col xs={1} md={1}>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Col>}</>
                }
                {showTitle &&
                <><Col xs={titleColSize} md={titleColSize}>Title</Col>
                {showSearch &&
                <Col xs={5} md={5}>
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>}</>
                }
                {showDifficulty && 
                <><Col xs={colSize} md={colSize}>Difficulty </Col>
                {showSearch &&
                <Col xs={colSize} md={colSize}>
                <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="">All</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </Form.Select>
                </Col>}</>
                }
                {showSolved && 
                <><Col xs={colSize} md={colSize}>Solved</Col>
                {showSearch &&
                <Col xs={colSize} md={colSize}>
                <Form.Select value={solved} onChange={(e) => setSolved(e.target.value)}>
                    <option value="">All</option>
                    <option value="solved">Solved</option>
                    <option value="unsolved">Unsolved</option>
                </Form.Select>
                </Col>}</>
                }
            </Row>
        </Form>
            {filteredChallenges?.map(({ _id, title, difficulty, username, solved, showSearch}) => (
            <ChallengeRow
                key={_id}
                id={_id}
                title={showTitle ? title : undefined}
                difficulty={showDifficulty ? difficulty : undefined}
                username={showUser ? username : undefined}
                solved={showSolved ? solved : undefined}
                showSearch={showSearch ? showSearch : undefined}
            />
            ))}
        </Container>
        )
    }
}
export default ChallengeTable;