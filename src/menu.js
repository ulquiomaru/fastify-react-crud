import React, { useState, useEffect } from "react";
import MenuItem from "./components/menuItem";
import Form from "./components/form";
import "./menu.css";
import { connect } from "react-redux";
import {
  createItem,
  deleteItem,
  updateItem,
  readItems,
} from "./redux/actions/actions";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//main component that wraps major part of application
function Menu(props) {
  const [openAddForm, setOpenAddForm] = useState(false);

  useEffect(() => {
    props.readItems();
  }, []);

  //function to trigger form rendering
  const handleAddClick = () => setOpenAddForm(true);

  //function to handle item addition
  const handleAddItem = ({ name, price }) => {
    if (name == "") name = "untitled";
    if (price == "") price = 999;

    const newItem = {
      id: uuidv4(),
      name,
      price,
    };

    axios
      .post("/api/menuItems", { ...newItem })
      .then(({ data: { name } }) => {
        console.log(`Item - ${name} added successfully`);
      })
      .catch((e) => console.log("Addition failed , Error ", e));

    props.createItem(newItem);
    handleCancel();
  };

  //function to handle item deletion
  const handleDeleteItem = (id) => {
    axios
      .delete(`/api/menuItems/${id}`)
      .then(({ data: { name } }) => {
        console.log(`Item - ${name} deleted successfully`);
      })
      .catch((e) => console.log("Deletion failed, Error ", e));

    props.deleteItem(id);
  };

  //function to handle item updates
  const handleUpdateItem = (item) => {
    axios
      .put(`/api/menuItems/${item.id}`, { item })
      .then(({ data: { name } }) => {
        console.log(`Item - ${name} updated successfully`);
      })
      .catch((e) => console.log("Updation failed, Error ", e));

    props.updateItem(item);
  };

  //function to unmount form component or in short close it
  const handleCancel = () => setOpenAddForm(false);

  return (
    <>
      {/* Heading */}
      <h1>
        <i className="fas fa-list-alt"></i> e-Menu
      </h1>

      {/* Menu component starts */}
      <div className="menu">
        <div className="heading menu-row">
          <div className="menu-item-name">Name</div>
          <div className="menu-item-price">Price</div>
          <div className="operations"> Operations</div>
        </div>

        {props.loading ? (
          <div className="menu-row">
            <div className="msg">Loading Items...</div>
          </div>
        ) : props.errors ? (
          <div className="menu-row">
            <div className="err msg">Error in loading Items</div>
          </div>
        ) : (
          <>
            {props.menuItems.length > 0 ? (
              props.menuItems.map((item, i) => {
                return (
                  <MenuItem
                    key={item.name + "-" + item.price + "-" + item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    handleDelete={handleDeleteItem}
                    handleUpdate={handleUpdateItem}
                    closeForm={handleCancel}
                  />
                );
              })
            ) : (
              <div className="menu-row">
                <div className="msg">List is empty.</div>
              </div>
            )}
          </>
        )}
      </div>
      {/* Menu component ends */}

      {!openAddForm ? (
        <span onClick={handleAddClick} className="add btn">
          <i className="fas fa-plus"></i>
        </span>
      ) : (
        <div className="menu">
          <Form addItem={handleAddItem} closeForm={handleCancel} />
        </div>
      )}
    </>
  );
}

//subscribing to redux store updates
const mapStateToProps = ({ menuItems, loading, errors }) => ({
  menuItems,
  loading,
  errors,
});

//connecting our main component to redux store
export default connect(mapStateToProps, {
  createItem,
  deleteItem,
  updateItem,
  readItems,
})(Menu);
