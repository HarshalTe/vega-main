import * as actionType from "../action/ActionTypes";

const initialState = {
  cases: [],
  error: false,
  editcase: [],
  isLoading: false,
  companyAddress: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CASES_SET_DATA:
      return {
        ...state,
        cases: action.cases,
        isLoading: false,
        error: false,
      };
    case actionType.CASES_EDIT_COMPANY_ADDRESS:
      const address = state.cases?.filter((c) => c.id == action.id)[0]?.address;
      console.log("address", address);
      return {
        ...state,
        companyAddress: `${address?.location ?? ""} ${address?.area ?? ""} ${
          address?.city ?? ""
        }`,
      };

    case actionType.CASES_FAIL_DATA:
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

    case actionType.POST_CASES_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.CASES_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editcase: action.editcase,
      };
    case actionType.CASES_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editcase: [],
      };
    case actionType.UPDATE_CASES_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
