import * as actionType from "../action/ActionTypes";

const initialState = {
  file: [],
  error: false,
  editfile: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FILE_SET_DATA:
      return {
        ...state,
        file: action.file,
        isLoading: false,
        error: false,
      };

    case actionType.FILE_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.FILE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_FILE_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.FILE_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editfile: action.editfile,
      };
    case actionType.FILE_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editfile: [],
      };
    case actionType.UPDATE_FILE_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
