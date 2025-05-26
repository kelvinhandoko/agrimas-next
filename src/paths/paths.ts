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
      edit: (id: string) => `/sale/sale-order/${id}/edit`,
    },
    saleShipping: {
      root: "/sale/sale-shipping",
      new: "/sale/sale-shipping/new",
      detail: (id: string) => `/sale/sale-shipping/${id}/detail`,
      edit: (id: string) => `/sale/sale-shipping/${id}/edit`,
    },
    saleReturn: {
      root: "/sale/sale-return",
      detail: (id: string) => `/sale/sale-return/${id}/detail`,
    },
    saleFaktur: {
      root: "/sale/sale-faktur",
      detail: (id: string) => `/sale/sale-faktur/${id}/detail`,
      payment: "/sale/sale-payment",
    },
    // salePayment: {
    //   root: "/sale/sale-payment",
    //   detail: (id: string) => `/sale/sale-payment/${id}/detail`,
    // },
  },
  purchase: {
    root: "/purchase",
    purchaseOrder: {
      root: "/purchase/purchase-order",
      new: "/purchase/purchase-order/new",
      detail: (id: string) => `/purchase/purchase-order/${id}/detail`,
      edit: (id: string) => `/purchase/purchase-order/${id}/edit`,
    },
    purchaseReceived: {
      root: "/purchase/purchase-received",
      new: "/purchase/purchase-received/new",
      detail: (id: string) => `/purchase/purchase-received/${id}/detail`,
      edit: (id: string) => `/purchase/purchase-received/${id}/edit`,
    },
    purchaseReturn: {
      root: "/purchase/purchase-return",
      new: "/purchase/purchase-return/new",
      detail: (id: string) => `/purchase/purchase-return/${id}/detail`,
      edit: (id: string) => `/purchase/purchase-return/${id}/edit`,
    },
    purchaseFaktur: {
      root: "/purchase/purchase-faktur",
      new: "/purchase/purchase-faktur/new",
      detail: (id: string) => `/purchase/purchase-faktur/${id}/detail`,
      edit: (id: string) => `/purchase/purchase-faktur/${id}/edit`,
    },
    // purchasePayment: {
    //   root: "/purchase/purchase-payment",
    //   new: "/purchase/purchase-payment/new",
    //   detail: (id: string) => `/purchase/purchase-payment/${id}/detail`,
    //   edit: (id: string) => `/purchase/purchase-payment/${id}/edit`,
    // },
    purchasePayable: {
      root: "/purchase/purchase-payable",
      new: "/purchase/purchase-payable/new",
      detail: (id: string) => `/purchase/purchase-payable/${id}/detail`,
      edit: (id: string) => `/purchase/purchase-payable/${id}/edit`,
    },
  },
  accountant: {
    root: "/accountant",
    chartOfAccount: "/accountant/chart-of-account",
    newAccount: "/accountant/chart-of-account/new",
    journal: "/accountant/journal",
    newJournal: "/accountant/journal/new",
    editJournal: (id: string) => `/accountant/journal/${id}/edit`,
    detailJournal: (id: string) => `/accountant/journal/${id}/detail`,
  },
  report: {
    root: "/report",
    stock: "/report/stock",
    receiveable: "/report/receiveable",
    payable: "/report/payable",
    sale: "/report/sale",
    purchase: "/report/purchase",
  },
  finance: {
    root: "/finance",
    paymentMethod: "/payment-method",
  },
};
