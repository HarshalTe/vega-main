import * as actionType from "./ActionTypes";
// contineous operation
const ON_TOGGLE13 = (checked)=>{
    console.log("object",checked)
    return{
        // type:"ON_TOGGLE2"
        type: actionType.ON_TOGGLE13,
        checked: checked,
    }
}
export default ON_TOGGLE13