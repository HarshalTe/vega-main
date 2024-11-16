import * as actionType from "../action/ActionTypes";

const initialState = {
  ac: [],
  error: false,
  editcase: [],
  isLoading: false,
  companyAddress: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AC_SET_DATA:
      return {
        ...state,
        ac: action.ac,
        isLoading: false,
        error: false,
      };

    case actionType.AC_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.CASES_LOADING:
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
