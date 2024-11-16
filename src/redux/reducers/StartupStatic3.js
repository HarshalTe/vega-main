// const initialState = false
// const ON_TOGGLE4 = (state = initialState, action)=>{
//     switch (action.type){
//         case "ON_TOGGLE4" : return state = (state==false?true:false)
//         default: return state
//     }
// }

// export default ON_TOGGLE4

import * as actionType from "../action/ActionTypes";

// const initialState =checked

const reducer = (state=false , action) => {
  switch (action.type) {
    case actionType.ON_TOGGLE43: return state=(action.checked)

    default: return state;
  }
};

export default reducer;

