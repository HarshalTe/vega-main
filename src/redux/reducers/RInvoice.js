import * as actionType from "../action/ActionTypes";

const initialState = {
  invoice: [],
  error: false,
  editinvoice: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.INVOICE_SET_DATA:
      return {
        ...state,
        invoice: action.invoice,
        isLoading: false,
        error: false,
      };

    case actionType.INVOICE_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.INVOICE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_INVOICE_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.INVOICE_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editinvoice: action.editinvoice,
      };
    case actionType.INVOICE_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editinvoice: [],
      };
    case actionType.UPDATE_INVOICE_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
