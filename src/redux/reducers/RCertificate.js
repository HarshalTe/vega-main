import * as actionType from "../action/ActionTypes";

const initialState = {
  certificate: [],
  error: false,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CERTIFICATE_SET_DATA:
      return {
        ...state,
        certificate: action.certificate,
        isLoading: false,
        error: false,
      };

    case actionType.CERTIFICATE_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.CERTIFICATE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_CERTIFICATE_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.EDIT_CERTIFICATE_ROW_START:
      return {
        isLoading: false,
        ...state,
      };

    case actionType.UPDATE_CERTIFICATE_DATA_START:
      return {
        isLoading: false,
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
