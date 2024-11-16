import * as actionType from "../action/ActionTypes";

const initialState = {
  customer: [],
  error: false,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CUSTOMER_SET_DATA:
      return {
        ...state,
        customer: action.customer,
        isLoading: false,
        error: false,
      };

    case actionType.CUSTOMER_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.CUSTOMER_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_CUSTOMER_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.EDIT_CUSTOMER_ROW_START:
      return {
        isLoading: false,
        ...state,
      };

    case actionType.UPDATE_CUSTOMER_DATA_START:
      return {
        isLoading: false,
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
