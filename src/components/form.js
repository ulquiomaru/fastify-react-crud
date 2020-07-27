import React, { useState } from "react";

//Form component which is used as EDIT_ITEM_FORM as well as CREATE_ITEM_FORM
export default function Form(props) {
  const [name, setName] = useState(!props.name ? "" : props.name);
  const [price, setPrice] = useState(!props.price ? "" : props.price);

  //funtion that upadtes state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "price") setPrice(value);
  };

  //function that sends the final data when user presses Submit
  const handleSubmit = () => {
    const item = { name, price };
    if (props.name) props.updateItem(item);
    else props.addItem(item);
  };

  //calls parent function to close form
  const handleCancel = () => props.closeForm();

  return (
    <form className="menu-row">
      <div className="menu-item-name">
        <input
          value={name}
          onChange={handleChange}
          name="name"
          placeholder="Enter item name"
          type="text"
        />
      </div>
      <div className="menu-item-price">
        <input
          value={price}
          onChange={handleChange}
          name="price"
          placeholder="item price"
          type="text"
        />
      </div>
      <div className="operations">
        <span onClick={handleSubmit} className="btn done">
          <i className="fas fa-check" />
        </span>
        <span onClick={handleCancel} className="btn cancel">
          <i className="fas fa-times" />
        </span>
      </div>
    </form>
  );
}
