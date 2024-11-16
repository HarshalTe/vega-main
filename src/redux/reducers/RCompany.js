import * as actionType from "../action/ActionTypes";

const initialState = {
  company: [],
  error: false,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.COMPANY_SET_DATA:
      return {
        ...state,
        company: action.company,
        isLoading: false,
        error: false,
      };

    case actionType.COMPANY_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.COMPANY_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_COMPANY_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.EDIT_COMPANY_ROW_START:
      return {
        isLoading: false,
        ...state,
      };

    case actionType.UPDATE_COMPANY_DATA_START:
      return {
        isLoading: false,
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
