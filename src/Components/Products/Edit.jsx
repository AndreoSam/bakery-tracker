import React, { useEffect, useState } from "react";
import { base_product, product } from "../../Api/Api_url";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const Edit = () => {

    let base_api = base_product + product;

    let [state, setState] = useState({
        cake_name: "",
        price: "",
        sub_title: "",
        year: "",
        genre: "",
    });

    let [img, setImg] = useState();

    let navigate = useNavigate();

    let { id } = useParams();
    // console.log("Edit id: ", id);

    //get data from axios
    let fetch_items = () => {
        axios
            .get(`${base_api}/${id}`)
            .then((res) => {
                console.log("Axios Resolved: ", res.data);
                setState(res.data);
            })
            .catch((err) => {
                console.log("Axios Error: ", err);
            });
    };

    useEffect(() => {
        fetch_items();
    }, [setState, base_api, id])

    //handle image
    const handleImage = (file) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setImg(fileReader.result);
        });
        fileReader.readAsDataURL(file);
    };

    //handle submit
    const submitHandler = (event) => {
        event.preventDefault();
        console.log("Edited data: ", state);

        let prod = {
            cake_name: state.cake_name,
            sub_title: state.sub_title,
            price: state.price,
            image: img,
        }

        axios
            .put(`${base_api}/${id}`, prod)
            .then((res) => {
                console.log("Updated Response: ", res.data);
                alert("Data Updated Sucessfully...!");
                navigate("/");
            })
            .catch((err) => {
                console.log("Update Error: ", err);
                alert("Error while updating!");
            });
    };

    //delete item
    const deleteItem = ((prod) => {
        console.log("Item to be deleted: ", prod);
        axios.delete(`${base_api}/${id}`)
            .then((res) => {
                console.log("Axios delete: ", res);
                // fetch_items();
                alert("Item Deleted!")
                navigate("/");

            })
            .catch((err) => {
                console.log("Axios Error: ", err);
            });
    })

    return (
        <Container onSubmit={submitHandler}>
            <form>
                <Card
                    style={{
                        maxWidth: "30rem",
                        margin: "auto",
                        border: "2px solid black",
                        padding: "1rem",
                    }}
                >
                    <Card.Img
                        variant="top"
                        src={state.image}
                    />
                    <Card.Body style={{ margin: "10px" }}>
                        <Card.Title>
                            <label className="bold_larger" style={{ width: "100%" }}>
                                Enter the cake name:
                                <input
                                    type="text"
                                    style={{ width: "50%" }}
                                    value={state.cake_name}
                                    name="cake_name"
                                    onChange={(event) =>
                                        setState((prev) => ({
                                            ...prev,
                                            cake_name: event.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </Card.Title>
                        <Card.Text>
                            <label className="bold_larger" style={{ width: "100%" }}>
                                Enter Subtitle:
                                <input
                                    type="text"
                                    style={{ width: "70%" }}
                                    value={state.sub_title}
                                    name="sub_title"
                                    onChange={(event) =>
                                        setState((prev) => ({
                                            ...prev,
                                            sub_title: event.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </Card.Text>
                        <Card.Text>
                            <label className="bold_larger" style={{ width: "100%" }}>
                                Enter Price:
                                <input
                                    type="number"
                                    style={{ width: "20%" }}
                                    value={state.price}
                                    name="price"
                                    onChange={(event) =>
                                        setState((prev) => ({
                                            ...prev,
                                            price: event.target.value,
                                        }))
                                    }
                                />
                            </label>
                        </Card.Text>
                        <input
                            type="file"
                            name="image"
                            // value={state.image}
                            alt=""
                            style={{ width: "55%" }}
                            onChange={(event) => handleImage(event.target.files[0])}
                        />
                        <hr />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                                className="delete"
                                onClick={() => {
                                    deleteItem(state.id)
                                }}
                            >
                                Delete
                            </Button>
                            <Button type="submit">
                                Submit
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </form>
        </Container>
    );
};

export default Edit;
