import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/es/storage";
import { Login } from "./reducers/login";
import logger from "redux-logger";

import RCustomer from "./reducers/RCustomer";
import RCycle from "./reducers/RCycle";
import RLead from "./reducers/RLead";
import RRows from "./reducers/RRows";
import RCols from "./reducers/RCols";
import RCases from "./reducers/RCases";
import RUsers from "./reducers/RUsers";
import AcCases from "./reducers/AcCases";

import RTestType from "./reducers/RTestType";
import RTests from "./reducers/RTests";
import RInvoice from "./reducers/RInvoice";
import RQuotation from "./reducers/RQuotation";
import RSensor from "./reducers/RSensor";
import RCompany from "./reducers/RCompany";
import RRawData from "./reducers/RRawData";
import RCertificate from "./reducers/RCertificate";
import Door_report from "./reducers/Door_report";
import Door_report2 from "./reducers/Door_report2";
import Door_report3 from "./reducers/Door_report3";
import ContineousOperation from "./reducers/ContineousOperation"
import ContineousOperation2 from "./reducers/ContineousOperation2"
import ContineousOperation3 from "./reducers/ContineousOperation3"
import AC from "./reducers/AC"
import PowerFailuer from "./reducers/PowerFailuer"
import PowerFailuer2 from "./reducers/PowerFailuer2"
import PowerFailuer3 from "./reducers/PowerFailuer3"
import StartupStatic from "./reducers/StartupStatic"
import StartupStatic2 from "./reducers/StartupStatic2"
import StartupStatic3 from "./reducers/StartupStatic3"
import Remark from "./reducers/Remark"
import Risk from "./reducers/Risk"
import Sheet from "./reducers/Sheet"
import RexeclFields from "./reducers/RexeclFields"
import document from "./reducers/RDocument"
import page from "./reducers/RPage"
import Forgot from "./reducers/RForgot";
import Update from "./reducers/RUpdate";
import RParameter from "./reducers/RParameter"
import Clabration from "./reducers/RClabration"



const config = {
  key: "Temperature",
  storage,
  debug: true,
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const configureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      login: Login,
      customer: RCustomer,
      cols: RCols,
      rows: RRows,
      lead: RLead,
      cases: RCases,
      users: RUsers,
      cycle: RCycle,
      certificate: RCertificate,
      tests: RTests,
      testType: RTestType,
      invoice: RInvoice,
      quotation: RQuotation,
      sensor: RSensor,
      company: RCompany,
      rawData: RRawData,
      checked:Door_report,
      checked12:Door_report2,
      checked13:Door_report3,
      checked2:ContineousOperation,
      checked22:ContineousOperation2,
      checked23:ContineousOperation3,
      checkedAc:AC,
      checked3:PowerFailuer,
      checked32:PowerFailuer2,
      checked33:PowerFailuer3,
      checked4:StartupStatic,
      checked42:StartupStatic2,
      checked43:StartupStatic3,
      checked5:Remark,
      checked6:Risk,
      ac:AcCases,
      sheet:Sheet,
      excelFields:RexeclFields,
      document:document,
      page:page,
      forgot: Forgot,
      update: Update,
      parameter: RParameter,
      calibration: Clabration,

    }),
    composeEnhancer(applyMiddleware(thunk, logger))
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
