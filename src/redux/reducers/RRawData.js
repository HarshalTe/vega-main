import * as actionType from "../../redux/action/ActionTypes";

const initialState = {
  rawData: [],
  error: false,
  isLoading: false,
  isDeleteAllLoading: false,
  isUpdateAllLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.RAW_DATA_SET_DATA:
      return {
        ...state,
        rawData: action.rawData,
        isLoading: false,
        error: false,
      };

    case actionType.RAW_DATA_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        rawData: [],
      };
    case actionType.RAW_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
        rawData: [],
      };

    case actionType.RAW_DATA_UPDATE_ALL_LOADING:
      return {
        ...state,
        isUpdateAllLoading: true,
        error: false,
        rawData: [],
      };

    case actionType.RAW_DATA_DELETE_ALL_LOADING:
      return {
        ...state,
        isDeleteAllLoading: true,
        error: false,
        rawData: [],
      };

    case actionType.POST_RAW_DATA_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.RAW_DATA_UPDATE_ALL_FAIL:
      return {
        ...state,
        isUpdateAllLoading: false,
        isLoading: false,
        error: action.error,
      };

    case actionType.RAW_DATA_DELETE_ALL_FAIL:
      return {
        ...state,
        isDeleteAllLoading: false,
        error: action.error,
      };

    case actionType.UPDATE_RAW_DATA_DATA_START:
      return {
        ...state,
      };

    case actionType.RAW_DATA_UPDATE_ALL_START:
      return {
        ...state,
      };

    case actionType.RAW_DATA_DELETE_ALL_START:
      return {
        ...state,
      };

    case actionType.RAW_DATA_UPDATE_ALL_SUCCESS:
      return {
        ...state,
      };

    case actionType.RAW_DATA_DELETE_ALL_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
