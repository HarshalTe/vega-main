var ThemeRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-desktop",
  },

  {
    path: "/master",
    name: "Master Tab",
    icon: "fas fa-address-card",
  },
  {
    path: "/cases",
    name: "Reports",
    icon: "fas fa-users",
  },
  {
    path: "/company",
    name: "Company",
    icon: "fas fa-building",
  },
  {
    path: "/customer",
    name: "Customer Master",
    icon: "fas fa-fire",
  },
  {
    path: "/user",
    name: "Employee Master",
    icon: "fas fa-address-book",
  },
  {
    path: "/certificate",
    name: "User certificate master",
    icon: "fas fa-address-card",
  },
  {
    path: "/bill",
    name: "Bill Master",
    icon: "fas fa-book",
  },
  {
    path: "/quotation",
    name: "Quotation",
    icon: "fas fa-archive",
  },
  {
    path: "/document",
    name: "Document",
    icon: "fas fa-archive",
  },
  {
    path: "/calibration",
    name: "Calibration",
    icon: "fas fa-arrows-alt",
  },
  {
    path: "/invoice",
    name: "Invoice",
    icon: "fas fa-file-alt",
  },
  {
    path: "/sensor",
    name: "Sensor",
    icon: "fas fa-arrows-alt",
  },
  // {
  //   path: "/graph",
  //   name: "Graph Page",
  //   icon: "fas fa-user",
  // },
  // {
  //   path: "/dynamic",
  //   name: "Line Graph",
  //   icon: "fas fa-fire",
  // },

  // {
  //   path: "/bar",
  //   name: "Bar Graph",
  //   icon: "fas fa-archive",
  // },
  // {
  //   path: "/radar",
  //   name: "Radar Graph",
  //   icon: "fas fa-rupee-sign",
  // },

  // {
  //   path: "/doughnut",
  //   name: "Doughnut Graph",
  //   icon: "fas fa-book",
  // },
  // {
  //   path: "/pie",
  //   name: "Pie Chart",
  //   icon: "fas fa-user",
  // },
  // {
  //   path: "/polar",
  //   name: "Polar chart",
  //   icon: "fas fa-sliders-h",
  // },

  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true },
];
export default ThemeRoutes;
