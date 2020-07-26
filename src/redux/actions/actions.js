//action types created and exported
export const CREATE = "Add new item";
export const READ = "Fetch all items";
export const UPDATE = "Update item";
export const DELETE = "Delete item";

//dispatched when item needs to be created
export const createItem = (item) => ({
  type: CREATE,
  payload: { item },
});

//dispatched when all the items stored in redux store needs to be read
export const readItems = () => ({
  type: READ,
});

//dispatched when certain item needs to be updated
export const updateItem = (item) => ({
  type: UPDATE,
  payload: { item },
});

//dispatched when certain item needs to be removed from redux store
export const deleteItem = (id) => ({
  type: DELETE,
  payload: { id },
});
