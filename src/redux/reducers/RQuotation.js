import * as actionType from "../action/ActionTypes";

const initialState = {
  quotation: [],
  error: false,
  editquotation: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.QUOTATION_SET_DATA:
      return {
        ...state,
        quotation: action.quotation,
        isLoading: false,
        error: false,
      };

    case actionType.QUOTATION_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.QUOTATION_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_QUOTATION_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.QUOTATION_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editquotation: action.editquotation,
      };
    case actionType.QUOTATION_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editquotation: [],
      };
    case actionType.UPDATE_QUOTATION_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
