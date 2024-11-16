import * as actionType from "./ActionTypes";
// contineous operation
const ON_TOGGLE12 = (checked)=>{
    console.log("object12",checked)
    return{
        // type:"ON_TOGGLE2"
        type: actionType.ON_TOGGLE12,
        checked: checked,
    }
}
export default ON_TOGGLE12