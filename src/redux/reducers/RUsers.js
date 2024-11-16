import * as actionType from "../action/ActionTypes";

const initialState = {
  users: [],
  error: false,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USERS_SET_DATA:
      return {
        ...state,
        users: action.users,
        isLoading: false,
        error: false,
      };

    case actionType.USERS_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_USERS_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.EDIT_USERS_ROW_START:
      return {
        isLoading: false,
        ...state,
      };

    case actionType.UPDATE_USERS_DATA_START:
      return {
        isLoading: false,
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
