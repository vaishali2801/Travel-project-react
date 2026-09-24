import React from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import trips from '../../Data/trips.js';
import { useNavigate } from 'react-router-dom';

const Trips = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container className='mt-2'>
                <Row className='g-3 m-2'>
                    {
                        trips.map((t) => {
                            return (
                                <Col lg={4} md={6} sm={12} key={t.id}>
                                    <Card>
                                        <Card.Img variant="top" src={t.image} style={{height:"220px"}} />
                                        <Card.Body className='d-flex justify-content-center align-items-center flex-column'>
                                            <Card.Title> {t.name}</Card.Title>
                                            <Card.Text className='text-center'>
                                                {t.overview}
                                            </Card.Text>
                                            <Button variant="outline-success" className='w-100' onClick={()=>navigate(`/trips/${t.id}`)}>View More</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}

export default Trips
