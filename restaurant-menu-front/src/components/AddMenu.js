import axios from "axios";
import React, { useState } from "react";
import { baseURL, headers } from "./../services/menu.service";

// menu fields
export const AddMenu = () => {
    const initialMenuState = {
        id: null,
        name: "",
        description: "",
        price: 0,
    };
    // retain as default the current menu
    const [menu, setMenu] = useState(initialMenuState);
    const [submitted, setSubmitted] = useState(false);
    // to change menu content
    const handleMenuChange = (e) => {
        const { name, value } = e.target;
        setMenu({ ...menu, [name]: value });
    };
    // boolean to display message when menu is successfully added
    const submitMenu = () => {
        let data = {
            name: menu.name,
            description: menu.description,
            price: menu.price,
        };
        axios
            .post(`${baseURL}/menu/`, data, {
                headers: {
                    headers,
                },
            })
            .then((response) => {
                setMenu({
                id: response.data.id,
                name: response.data.name,
                description: response.data.description,
                price: response.data.price,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    // allow user to add a new menu again once success message has been shown
    const newMenu = () => {
        setMenu(initialMenuState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        Menu Added!
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <button className="btn btn-success" onClick={newMenu}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                        required
                        value={menu.name}
                        onChange={handleMenuChange}
                        name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={menu.description}
                            onChange={handleMenuChange}
                            name="description"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            required
                            value={menu.price}
                            onChange={handleMenuChange}
                            name="price"
                        />
                    </div>
                    <button onClick={submitMenu} className="btn btn-success">
                        Submit
                    </button>
                    </div>
            )}
        </div>
      );
    };