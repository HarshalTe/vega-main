import * as actionType from "../action/ActionTypes";

const initialState = {
  testType: [],
  error: false,
  editcase: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TEST_TYPE_SET_DATA:
      return {
        ...state,
        testType: action.testType,
        isLoading: false,
        error: false,
      };

    case actionType.TEST_TYPE_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.TEST_TYPE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_TEST_TYPE_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.TEST_TYPE_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editcase: action.editcase,
      };
    case actionType.TEST_TYPE_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editcase: [],
      };
    case actionType.UPDATE_TEST_TYPE_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
