import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { base_product, product } from "../../Api/Api_url";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    let base_api = base_product + product;
    let navigate = useNavigate();

    let [img, setImg] = useState()
    let [state, setState] = useState({
        cake_name: "",
        sub_title: "",
        price: "",
        errors: {
            cake_name: "",
            sub_title: "",
            price: ""
        }
    })

    //change handler
    const changeHandler = ((event) => {
        let { name, value } = event.target;
        // console.log(name, value);
        let err = state.errors;
        setState({ ...state, [name]: value, errors: err })
    })

    //use effect



    //submitHandler
    const submitHandler = ((event) => {
        event.preventDefault()
        console.log("Submitted data: ", state);

        let prod = {
            cake_name: state.cake_name,
            sub_title: state.sub_title,
            price: state.price,
            image: img,
        }
        // axios.get(base_api)
        //     .then((res) => {
        //         console.log("Axios Get: ", res.data);
        //         if (res.data.cake_name === state.cake_name) {
        //             console.log("same name found");
        //             alert("")
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("Update Error: ", err);
        //     });


        axios.post(base_api, prod)
            .then((res) => {
                console.log("Axios Upload Response: ", res);
                setState(res);
                alert("Data Uploaded Sucessfully...!");
                navigate("/");
            })
            .catch((err) => {
                console.log("Update Error: ", err);
                alert("Error while updating!");
            });
    })



    //image handler
    const handleImage = ((file) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setImg(fileReader.result);
        })
        fileReader.readAsDataURL(file);
    })

    return (
        <Container onSubmit={submitHandler}
            style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                border: "2px solid black",
                height: "100vh"
            }}>
            <form style={{
                fontWeight: "bold", display: "flex", flexDirection: "column", gap: "1rem",
                // border: "2px solid black" 
            }}>
                <label style={{ display: "flex", justifyContent: "space-between" }}>Enter the name of the cake:
                    <input type="text" name="cake_name" onChange={changeHandler} required />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between" }}>Enter the Subtitle:
                    <input type="text" name="sub_title" onChange={changeHandler} required />
                </label>
                <label style={{ display: "flex", justifyContent: "space-between" }}>Enter the Price:
                    <input type="number" name="price" onChange={changeHandler} required />
                </label>
                <input type="file" name="image" alt="" required onChange={(event) => {
                    handleImage(event.target.files[0])
                }} />
                <Button type='submit'>Add</Button>
            </form>
        </Container>
    )
}

export default AddProduct