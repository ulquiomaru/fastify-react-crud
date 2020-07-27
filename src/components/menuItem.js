import React, { useState, useEffect } from "react";
import Form from "./form";

//component that renders individual menu item stored in redux store
export default function MenuItem(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);

  //setting necessary values on mounting of component
  useEffect(() => {
    const { name, price } = props;
    setName(name);
    setPrice(price);
  }, [props.name, props.price]);

  //function to trigger form view and close item view
  const handleEditClick = () => setOpenEditForm(true);

  //calls parent's function to updated item
  const handleUpdate = ({ name, price }) => {
    const updatedItem = {
      id: props.id,
      name,
      price,
    };
    props.handleUpdate(updatedItem);
    handleCancel();
  };

  //calls parent's function to delete item from store
  const handleDelete = () => props.handleDelete(props.id);

  //function to close form
  const handleCancel = () => setOpenEditForm(false);

  return (
    <>
      {!openEditForm ? (
        <div className="menu-row">
          <div className="menu-item-name">{name}</div>
          <div className="menu-item-price">{price}</div>
          <div className="operations">
            <span onClick={handleEditClick} className="btn edit">
              <i className="fas fa-pen"></i>
            </span>
            <span onClick={handleDelete} className="btn delete">
              <i className="fas fa-trash"></i>
            </span>
          </div>
        </div>
      ) : (
        <Form
          name={name}
          price={price}
          closeForm={handleCancel}
          updateItem={handleUpdate}
        />
      )}
    </>
  );
}
