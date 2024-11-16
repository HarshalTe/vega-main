import * as actionType from "../action/ActionTypes";

const initialState = {
  tests: [],
  error: false,
  parameterData: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TESTS_SET_DATA:
      return {
        ...state,
        tests: action.tests,
        isLoading: false,
        error: false,
      };

    case actionType.TESTS_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        tests: [],
      };
    case actionType.TESTS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
        tests: [],
        parameterData: [],
      };

    case actionType.POST_TESTS_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.TESTS_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        parameterData: action.parameterData,
      };
    case actionType.TESTS_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        parameterData: [],
      };
    case actionType.UPDATE_TESTS_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
