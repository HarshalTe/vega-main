import * as actionType from "./ActionTypes";
// contineous operation
const ON_TOGGLE1 = (checked)=>{
    // console.log("object12",checked)
    return{
        // type:"ON_TOGGLE2"
        type: actionType.ON_TOGGLE1,
        checked: checked,
    }
}
export default ON_TOGGLE1