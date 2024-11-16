import * as actionType from "./ActionTypes";
// contineous operation
const ON_EXCEL_FIELDS = (checked)=>{
    // console.log("object12",checked)
    return{
        // type:"ON_TOGGLE2"
        type: actionType.ON_EXCEL_FIELDS,
        checked: checked,
    }
}
export default ON_EXCEL_FIELDS