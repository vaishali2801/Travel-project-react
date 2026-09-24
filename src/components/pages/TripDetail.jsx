
import trips from "../../Data/trips";
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Stack, Badge, ListGroup, Accordion } from 'react-bootstrap';

const TripDetail = () => {

    const { id } = useParams();

    const trip = trips.find((t) => t.id === Number(id));
    const navigate = useNavigate();
    return (
        <>
            <Container className="p-3">
                <Row>
                    <Col>
                        <img
                            src={trip.image}
                            className="rounded-5 mt-4"
                            alt={trip.name}
                            style={{ height: "450px", width: "100%", objectFit: "cover" }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={8}>
                        <h2 className="mt-3 fw-bold">{trip.name}</h2>
                        <h6 className="text-secondary fw-normal">{trip.destination}</h6>
                        <Stack direction="horizontal" gap={2} className="mt-3">
                            <Badge bg="primary">{trip.duration}</Badge>
                            <Badge bg="secondary">{trip.rating}</Badge>
                            <Badge bg="info">{trip.difficulty}</Badge>
                            <Badge bg="success">{trip.price}</Badge>
                        </Stack>
                        <Card className="mt-3 p-1">
                            <Card.Body>
                                <Card.Text>
                                    <h5>Overview</h5>
                                    {trip.overview}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Row>
                            <Col className="mt-3">
                                <Card className="shadow p-3">
                                    <h5>Trip Highlights</h5>
                                    <ListGroup variant="flush" className="mt-2">

                                        {trip.highlights.map((t) => {
                                            return (
                                                <>
                                                    <ListGroup.Item>✅ {t}</ListGroup.Item>
                                                </>
                                            )
                                        })}
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-3">
                                <Card className="p-3">
                                    <Card.Title>Day-wise Itinerary </Card.Title>
                                    <Accordion flush>
                                        {trip.itinerary.map((day, index) => (
                                            <Accordion.Item eventKey={String(index)} key={index}>
                                                <Accordion.Header>
                                                    Day - {day.day} · {day.title}
                                                </Accordion.Header>
                                                <Accordion.Body>{day.description}</Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="mt-3">
                                <Card className="shadow p-3">
                                    <h5>Inclusions</h5>
                                    <ListGroup variant="flush" className="mt-2">
                                        {trip.inclusions.map((t) => {
                                            return (
                                                <>
                                                    <ListGroup.Item>✔️ {t}</ListGroup.Item>
                                                </>
                                            )
                                        })}
                                    </ListGroup>
                                </Card>
                            </Col>
                            <Col lg={6} className="mt-3">
                                <Card className="shadow p-3">
                                    <h5>Inclusions</h5>
                                    <ListGroup variant="flush" className="mt-2">
                                        {trip.exclusions.map((t) => {
                                            return (
                                                <>
                                                    <ListGroup.Item>✔️ {t}</ListGroup.Item>
                                                </>
                                            )
                                        })}
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                        <Card className="mt-3 p-1">
                            <Card.Body>
                                <Card.Text>
                                    <h5>Best Time to Visit</h5>
                                    {trip.bestTimeToVisit}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Button variant="outline-dark" className="mt-3" onClick={()=>navigate(-1)}>← Back to Trips</Button>
                    </Col>
                    <Col lg={4} className="mt-3">
                        <Card className="shadow-sm sticky-top" style={{ top: "90px" }}>
                            <Card.Body>
                                <h4 className="fw-bold mb-3">₹ {trip.price}</h4>
                                <p className="text-muted mb-3">
                                    {trip.duration} • {trip.difficulty}
                                </p>
                                <Button variant="primary" className="w-100 mb-2"> Book Now </Button>
                                <Button variant="outline-secondary" className="w-100">Enquire </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TripDetail
