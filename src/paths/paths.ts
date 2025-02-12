export const paths = {
  Root: "/",
  auth: {
    signIn: "/auth/signin",
    signInTes: "/api/auth/signin",
    forgotPassword: "/auth/forgot-password",
  },
  redirectTo: "/redirect-to",
  company: {
    chooseCompany: "/choose-company",
  },
  profile: {
    root: "/profile",
  },
  dataMaster: {
    root: "/data-master",
    product: {
      root: "/data-master/product",
      new: "/data-master/product/new",
      edit: (id: string) => `/data-master/product/${id}/edit`,
    },
    supplier: {
      root: "/data-master/supplier",
      new: "/data-master/supplier/new",
      edit: (id: string) => `/data-master/supplier/${id}/edit`,
    },
    customer: {
      root: "/data-master/customer",
      new: "/data-master/customer/new",
      edit: (id: string) => `/data-master/customer/${id}/edit`,
    },
    employee: {
      root: "/data-master/employee",
      newUser: "/data-master/employee/user/new",
      newSales: "/data-master/employee/sales/new",
      edit: (id: string) => `/data-master/employee/${id}/edit`,
    },
  },
  sale: {
    root: "/sale",
  },
  purchase: {
    root: "/purchase",
  },
  accountant: {
    root: "/accountant",
  },
  report: {
    root: "/report",
  },
  finance: {
    root: "/finance",
  },
};
