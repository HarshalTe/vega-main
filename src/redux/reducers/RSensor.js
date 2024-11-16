import * as actionType from "../action/ActionTypes";

const initialState = {
  sensor: [],
  error: false,
  editsensor: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SENSOR_SET_DATA:
      return {
        ...state,
        sensor: action.sensor,
        isLoading: false,
        error: false,
      };

    case actionType.SENSOR_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.SENSOR_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_SENSOR_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.SENSOR_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editsensor: action.editsensor,
      };
    case actionType.SENSOR_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editsensor: [],
      };
    case actionType.UPDATE_SENSOR_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
