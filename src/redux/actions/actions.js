import axios from "axios";

//action types created and exported
export const CREATE = "Add new item";
export const READ = "Fetch all items";
export const UPDATE = "Update item";
export const DELETE = "Delete item";

export const FETCH_ITEMS_BEGIN = "Begin fetching items";
export const FETCH_ITEMS_SUCCESS = "Items fetched successfully";
export const FETCH_ITEMS_FAILURE = "Failed to fetch items";

//dispatched when we fetch items from database
export const fetchItemsBegin = () => ({
  type: FETCH_ITEMS_BEGIN,
});

//dispatched when items are successfully fetched
export const fetchItemsSuccess = (items) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: { items },
});

//dispatched when items are fails to load
export const fetchItemsFailure = (errors) => ({
  type: FETCH_ITEMS_FAILURE,
  payload: { errors },
});

//dispatched when item needs to be created
export const createItem = (item) => ({
  type: CREATE,
  payload: { item },
});

//dispatched when all the items stored in redux store needs to be read
export const readItems = () => {
  return (dispatch) => {
    // function starts
    dispatch(fetchItemsBegin()); // fetching begins
    return axios
      .get("/api/menuItems") // req data from server
      .then(({ data }) => {
        // if data is found
        console.log("success", data);
        dispatch(fetchItemsSuccess(data)); // success
      })
      .catch((error) => dispatch(fetchItemsFailure(error))); //errors
  };
};

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
