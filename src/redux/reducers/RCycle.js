import * as actionType from "../action/ActionTypes";

const initialState = {
  cycle: [],
  error: false,
  editcycle: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CYCLE_SET_DATA:
      return {
        ...state,
        cycle: action.cycle,
        isLoading: false,
        error: false,
      };

    case actionType.CYCLE_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.CYCLE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actionType.POST_CYCLE_DATA_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.CYCLE_EDIT_SET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        editcycle: action.editcycle,
      };
    case actionType.CYCLE_EDIT_FAIL_DATA:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        editcycle: [],
      };
    case actionType.UPDATE_CYCLE_DATA_START:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
