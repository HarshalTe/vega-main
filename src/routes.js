import React from "react";
import Loadable from "react-loadable";
import Loader from "./components/loader/Loader";
import BarGraph from "./components/main Components/Graph/BarGraph";
import DoughnutGraph from "./components/main Components/Graph/DoughnutGraph";
import DynamicChart from "./components/main Components/Graph/DynamicGraph";
import Graph from "./components/main Components/Graph/Graph";
import PieGraph from "./components/main Components/Graph/PieGraph";
import PolarAreaGraph from "./components/main Components/Graph/PolarAreaGraph";
import RadarGraph from "./components/main Components/Graph/RadarGraph";

import Fulllayout from "./layouts/fulllayout.jsx";
function Loading() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loader />
        </div>
      </div>
    </div>
  );
}
const Dashboard = Loadable({
  loader: () => import("./views/starter/starter.jsx"),
  loading: Loading,
});

const MasterTab = Loadable({
  loader: () => import("./components/main Components/MasterTab/MasterTab"),
  loading: Loading,
});

const Customer = Loadable({
  loader: () =>
    import("./components/main Components/noneedfiles/Customer/Customer"),
  loading: Loading,
});

const TabCases = Loadable({
  loader: () => import("./components/main Components/CaseMaster/TabCases"),
  loading: Loading,
});

const BillMaster = Loadable({
  loader: () => import("./components/main Components/BillMaster/BillMaster"),
  loading: Loading,
});

const Client = Loadable({
  loader: () => import("./components/main Components/Client/Client"),
  loading: Loading,
});

const User = Loadable({
  loader: () => import("./components/main Components/User/Users"),
  loading: Loading,
});

const UserCerificate = Loadable({
  loader: () =>
    import("./components/main Components/UserCertificate/UserCerficate"),
  loading: Loading,
});
const Quotation = Loadable({
  loader: () => import("./components/main Components/Quotation/Quotation"),
  loading: Loading,
});
const Document = Loadable({
  loader: () => import("./components/main Components/Document/Document"),
  loading: Loading,
});
const Calibration = Loadable({
  loader: () => import("./components/main Components/Calibration/Calibration"),
  loading: Loading,
});
const CDocument = Loadable({
  loader: () => import("./components/main Components/Document/DocumentCustomer"),
  loading: Loading,
});

const Detail = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/ColdRoom/ColdRoom"),
  loading: Loading,
});
const DeepFreezerRoom = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/ColdRoom/ColdRoom"),
  loading: Loading,
});
const Warehouse = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/ColdRoom/ColdRoom"),
  loading: Loading,
});
const WalkInColdRoom = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/ColdRoom/ColdRoom"),
  loading: Loading,
});
const WalkInDeepFreezer = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/ColdRoom/ColdRoom"),
  loading: Loading,
});
const AmbientRoom = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/ColdRoom/ColdRoom"),
  loading: Loading,
});
const HumidityRoom = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/HumidityRoom/HumidityRoom"),
  loading: Loading,
});

const VisiCooler = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/VisiCooler/VisiCooler"),
  loading: Loading,
});
const DataLogger = Loadable({
  loader: () =>
    import("./components/main Components/Calibration/ColdRoom/DataLogger"),
  loading: Loading,
});
const PressureGauge = Loadable({
  loader: () =>
    import("./components/main Components/Calibration/ColdRoom/PressureGauge"),
  loading: Loading,
});
const Refrigerator = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/VisiCooler/VisiCooler"),
  loading: Loading,
});
const ThermalBox = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/VisiCooler/VisiCooler"),
  loading: Loading,
});
const Oven = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/VisiCooler/VisiCooler"),
  loading: Loading,
});
const Furnace = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/VisiCooler/VisiCooler"),
  loading: Loading,
});
const ETO = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/VisiCooler/VisiCooler"),
  loading: Loading,
});
const Autoclave = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/VisiCooler/VisiCooler"),
  loading: Loading,
});
const StabilityChamber = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/VisiCooler/VisiCooler"),
  loading: Loading,
});
const DeepFreezer = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/VisiCooler/VisiCooler"),
  loading: Loading,
});
const ColdRoom = Loadable({
  loader: () =>
    import("./components/main Components/CaseMaster/ColdRoom/ColdRoom"),
  loading: Loading,
});

const Invoice = Loadable({
  loader: () => import("./components/main Components/Invoice/Invoice"),
  loading: Loading,
});

const Sensor = Loadable({
  loader: () => import("./components/main Components/Sensor/Sensor"),
  loading: Loading,
});

const Company = Loadable({
  loader: () => import("./components/main Components/Company/Company"),
  loading: Loading,
});
const ReeferVehicle = Loadable({
  loader: () =>
    import(
      "./components/main Components/CaseMaster/ReeferVehicle/ReeferVehicle"
    ),
  loading: Loading,
});

const routes = [
  { path: "/", exact: true, name: "Home", component: Fulllayout },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/master", exact: true, name: "Master", component: MasterTab },
  { path: "/customer", exact: true, name: "Customer", component: Client },
  { path: "/user", exact: true, name: "User", component: User },
  {
    path: "/certificate",
    exact: true,
    name: "User Certificate",
    component: UserCerificate,
  },
  { path: "/quotation", exact: true, name: "Quotation", component: Quotation },
  { path: "/document", exact: true, name: "Document", component: Document },
  { path: "/calibration", exact: true, name: "Calibration", component: Calibration },
  { path: "/Cdocument", exact: true, name: "Document", component: CDocument },
  { path: "/invoice", exact: true, name: "Invoice", component: Invoice },
  { path: "/company", exact: true, name: "Company", component: Company },

  {
    path: "/calibration/data-logger/:id",
    exact: true,
    name: "Calibration Data-Logger",
    component: DataLogger,
  },
  {
    path: "/calibration/pressure-gauge/:id",
    exact: true,
    name: "Calibration Pressure-Gauge",
    component: PressureGauge,
  },
  {
    path: "/cases/visi-cooler/:id",
    exact: true,
    name: "Cases Visi Cooler",
    component: VisiCooler,
  },
  {
    path: "/cases/deep-freezer/:id",
    exact: true,
    name: "Cases Deep Freezer",
    component: DeepFreezer,
  },
  {
    path: "/cases/refrigerator/:id",
    exact: true,
    name: "Cases Refrigerator",
    component: Refrigerator,
  },
  {
    path: "/cases/thermal-box/:id",
    exact: true,
    name: "Cases Thermal Box",
    component: ThermalBox,
  },
  {
    path: "/cases/oven/:id",
    exact: true,
    name: "Cases Oven",
    component: Oven,
  },
  {
    path: "/cases/furnace/:id",
    exact: true,
    name: "Cases Furnace",
    component: Furnace,
  },
  {
    path: "/cases/eto/:id",
    exact: true,
    name: "Cases ETO",
    component: ETO,
  },
  {
    path: "/cases/autoclave/:id",
    exact: true,
    name: "Cases Autoclave",
    component: Autoclave,
  },
  {
    path: "/cases/stability-chamber/:id",
    exact: true,
    name: "Cases Stability Chamber",
    component: StabilityChamber,
  },
  {
    path: "/cases/cold-room/:id",
    exact: true,
    name: "Cases Cold Room",
    component: ColdRoom,
  },
  {
    path: "/cases/refer-vehicle/:id",
    exact: true,
    name: "Cases Reefer Vehicle",
    component: ReeferVehicle,
  },

  {
    path: "/cases/cool-room/:id",
    exact: true,
    name: "Case Details",
    component: Detail,
  },
  {
    path: "/cases/deep-freezer-room/:id",
    exact: true,
    name: "Cases Deep Freezer Room",
    component: DeepFreezerRoom,
  },
  {
    path: "/cases/warehouse/:id",
    exact: true,
    name: "Cases Warehouse",
    component: Warehouse,
  },
  {
    path: "/cases/walk-in-cold-room/:id",
    exact: true,
    name: "Walk-In Cold Room",
    component: WalkInColdRoom,
  },
  {
    path: "/cases/walk-in-deep-freezer/:id",
    exact: true,
    name: "Walk-In Deep Freezer",
    component: WalkInDeepFreezer,
  },
  {
    path: "/cases/ambient-room/:id",
    exact: true,
    name: "Ambient Room",
    component: AmbientRoom,
  },
  {
    path: "/cases/humidity-cold-room/:id",
    exact: true,
    name: "Humidity Cold Room",
    component: HumidityRoom,
  },
  { path: "/cases", exact: true, name: "Cases", component: TabCases },

  { path: "/bill", exact: true, name: "Bill", component: BillMaster },
  { path: "/graph", exact: true, name: "Graph", component: Graph },
  { path: "/sensor", exact: true, name: "Sensor", component: Sensor },
  {
    path: "/dynamic",
    exact: true,
    name: "DynamicGraph",
    component: DynamicChart,
  },
  { path: "/bar", exact: true, name: "Bar", component: BarGraph },
  { path: "/pie", exact: true, name: "Pie", component: PieGraph },
  { path: "/polar", exact: true, name: "Polar", component: PolarAreaGraph },
  {
    path: "/doughnut",
    exact: true,
    name: "Doughnut",
    component: DoughnutGraph,
  },
  { path: "/radar", exact: true, name: "Radar", component: RadarGraph },
];

export default routes;
