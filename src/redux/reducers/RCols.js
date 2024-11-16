import * as actionType from "../../redux/action/ActionTypes";

const initialState = {
  cols: [],
  error: false,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.COLS_SET_DATA:
      return {
        ...state,
        cols: action.cols,
        isLoading: false,
        error: false,
      };

    case actionType.COLS_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.COLS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_COLS_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.EDIT_COLS_ROW_START:
      return {
        isLoading: false,
        ...state,
      };

    case actionType.UPDATE_COLS_DATA_START:
      return {
        isLoading: false,
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
