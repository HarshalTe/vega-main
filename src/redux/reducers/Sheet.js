import * as actionType from "../action/ActionTypes";

const initialState = {
  sheet: [],
  error: false,
  isLoading: false,
  sensor:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SHEET_DATA:
      return {
        ...state,
        sheet: action.sheet,
        isLoading: false,
        error: false,
      };
    case actionType.SENSORS_DATA:
      return {
        ...state,
        sensor: action.sensor,
        isLoading: false,
        error: false,
      };


    default:
      return state;
  }
};

export default reducer;