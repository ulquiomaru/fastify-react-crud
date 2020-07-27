import { fetchItems, addItem, updateItem, deleteItem } from "./controller";

const routes = [
  {
    method: "GET",
    url: "/api/menuItems",
    handler: fetchItems,
  },
  {
    method: "POST",
    url: "/api/menuItems",
    handler: addItem,
  },
  {
    method: "PUT",
    url: "/api/menuItems/:id",
    handler: updateItem,
  },
  {
    method: "DELETE",
    url: "/api/menuItems/:id",
    handler: deleteItem,
  },
];

export default routes;
