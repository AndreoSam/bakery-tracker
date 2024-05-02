import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { base_product, product } from '../../Api/Api_url';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = () => {
    let base_api = base_product + product
    // console.log(base_api);
    let [search, setSearch] = useState("")
    let [state, setState] = useState([])


    useEffect(() => {
        axios.get(base_api)
            .then((res) => {
                console.log("Axios Receieved: ", res.data);
                setState(res.data);
            })
            .catch((err) => {
                console.log("Axios Error: ", err);
            });
    }, [base_api])

    //Search filter
    let filter = state.filter((prod) => {
        if (search === "") {
            return prod;
        } else if (prod.cake_name.toLowerCase().includes(search.toLowerCase())) {
            return prod;
        }
        else {
            return false;
        }
    })

    // console.log("Image data: ", img);

    return (
        <Container>
            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-around" }}>
                <label style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "5px", fontSize: "18px" }}>Search Items:
                    <input type='text' placeholder='Search...' onChange={(event) => {
                        setSearch(event.target.value)
                    }} />
                </label>
                <Link to={`addprod`}>
                    <Button variant="primary">Add Product</Button>
                </Link>
            </div>

            <hr />
            <Row xs={1} md={4} className="g-4">
                {filter.map((prod) => (
                    <Col style={{ display: "flex", alignContent: "center", alignItems: "center" }} key={prod.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={prod?.image} alt="" />
                            <Card.Body>
                                <Card.Title>{prod.cake_name}</Card.Title>
                                <Card.Text>
                                    {prod.sub_title}
                                </Card.Text>
                                <Card.Text
                                    style={{ display: "flex", justifyContent: "space-around" }}>
                                    Price: $
                                    {prod.price}
                                    <select name="select" id="">
                                        <option value="">1 Kg</option>
                                        <option value="">1.5 Kg</option>
                                        <option value="">2 Kg</option>
                                    </select>
                                </Card.Text>
                                <hr />
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <Link to={`edit/${prod.id}`}>
                                        <Button variant="primary">Edit</Button>
                                    </Link>
                                    <Button variant="primary">Add to cart</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container >
    )
}

export default Products