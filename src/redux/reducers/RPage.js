import * as actionType from "../action/ActionTypes";

const initialState = {
  page: [],
  error: false,
  editcase: [],
  isLoading: false,
  companyAddress: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PAGE_DETAILS_SET_DATA:
      return {
        ...state,
        page: action.pageDetails,
        isLoading: false,
        error: false,
      };

    case actionType.PAGE_DETAILS_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.PAGE_DETAILS_LOADING:
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