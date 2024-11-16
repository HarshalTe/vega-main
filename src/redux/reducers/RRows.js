import * as actionType from "../action/ActionTypes";

const initialState = {
  rows: [],
  isLoading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ROWS_SET_DATA:
      return {
        ...state,
        rows: action.rows,
        isLoading: false,
        error: false,
      };

    case actionType.ROWS_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.ROWS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_ROWS_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.EDIT_ROWS_ROW_START:
      return {
        ...state,
      };

    case actionType.UPDATE_ROWS_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
