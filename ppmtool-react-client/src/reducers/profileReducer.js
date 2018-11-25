import { GET_USER } from "../actions/types";

const initialState = {
  profileUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        profileUser: action.payload
      };
    default:
      return state;
  }
}
