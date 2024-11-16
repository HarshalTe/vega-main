import * as actionType from "../action/ActionTypes";

const initialState = {
  calibration: [],
  error: false,
  editcalibration: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CALIBRATION_SET_DATA:
      return {
        ...state,
        calibration: action.calibration,
        isLoading: false,
        error: false,
      };

    case actionType.CALIBRATION_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.CALIBRATION_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_CALIBRATION_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.CALIBRATION_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editcalibration: action.editcalibration,
      };
    case actionType.CALIBRATION_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editcalibration: [],
      };
    case actionType.UPDATE_CALIBRATION_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
