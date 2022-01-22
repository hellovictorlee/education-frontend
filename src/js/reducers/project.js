import { TYPE } from "../actions";

const initialState = {
  token: "",
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default project;
