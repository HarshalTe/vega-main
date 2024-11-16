import * as ActionTypes from "../action/ActionTypes";

const initialState = {
  update: [],
  isLoading: false,
  error: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PASSWORD_SET_DATA:
      return {
        ...state,
        update: action.update,
        isLoading: false,
        error: false,
      };
    case ActionTypes.UPDATE_PASSWORD_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case ActionTypes.UPDATE_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    default:
      return state;
  }
};
export default reducer;

