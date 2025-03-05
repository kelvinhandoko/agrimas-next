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
    changePassword: "/profile/change-password",
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
      editUser: (id: string) => `/data-master/employee/user/${id}/edit`,
      newSales: "/data-master/employee/sales/new",
      editSales: (id: string) => `/data-master/employee/sales/${id}/edit`,
    },
  },
  sale: {
    root: "/sale",
    saleOrder: {
      root: "/sale/sale-order",
      new: "/sale/sale-order/new",
      detail: (id: string) => `/sale/sale-order/${id}/detail`,
    },
    saleShipping: {
      root: "/sale/sale-shipping",
      new: "/sale/sale-shipping/new",
      detail: (id: string) => `/sale/sale-shipping/${id}/detail`,
    },
    saleReturn: {
      root: "/sale/sale-return",
      detail: (id: string) => `/sale/sale-return/${id}/detail`,
    },
    saleFaktur: {
      root: "/sale/sale-faktur",
      detail: (id: string) => `/sale/sale-faktur/${id}/detail`,
    },
    salePayment: {
      root: "/sale/sale-payment",
      detail: (id: string) => `/sale/sale-payment/${id}/detail`,
    },
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
