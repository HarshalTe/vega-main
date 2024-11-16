import * as ActionTypes from "../action/ActionTypes";

const initialState = {
  forgot: [],
  isLoading: false,
  error: "", 
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FORGOT_PASSWORD_SET_DATA:
      return {
        ...state,
        forgot: action.forgot,
        isLoading: false,
        error: false,
      };
    case ActionTypes.FORGOT_PASSWORD_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case ActionTypes.FORGOT_PASSWORD_LOADING:
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