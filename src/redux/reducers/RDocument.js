import * as actionType from "../action/ActionTypes";

const initialState = {
  document: [],
  error: false,
  editdocument: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DOCUMENT_SET_DATA:
      return {
        ...state,
        document: action.document,
        isLoading: false,
        error: false,
      };

    case actionType.DOCUMENT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.DOCUMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_DOCUMENT_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.DOCUMENT_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editdocument: action.editdocument,
      };
    case actionType.DOCUMENT_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editdocument: [],
      };
    case actionType.UPDATE_DOCUMENT_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
