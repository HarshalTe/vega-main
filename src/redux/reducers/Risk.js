// const initialState = false
// const ON_TOGGLE6 = (state = initialState, action)=>{
//     switch (action.type){
//         case "ON_TOGGLE6" : return state = (state==false?true:false)
//         default: return state
//     }
// }

// export default ON_TOGGLE6

import * as actionType from "../action/ActionTypes";

// const initialState =checked

const reducer = (state=true , action) => {
  switch (action.type) {
    case actionType.ON_TOGGLE6: return state=(action.checked)

    default: return state;
  }
};

export default reducer;