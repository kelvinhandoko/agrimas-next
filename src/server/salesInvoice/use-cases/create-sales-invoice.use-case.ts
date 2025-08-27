import { type SalesInvoicePayload } from "@/model/sales-invoice.model";
import { TRPCError } from "@trpc/server";

import { type CustomerRepository } from "@/server/customer";
import { type SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";
import { type SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";

export const createSalesInvoiceUseCase =
  (repos: {
    salesPersonRepo: SalesPersonRepository;
    salesInvoiceRepo: SalesInvoiceRepository;
    customerRepo: CustomerRepository;
  }) =>
  async (payload: SalesInvoicePayload) => {
    const { salesPersonRepo, salesInvoiceRepo, customerRepo } = repos;
    const { customerId, salesPersonId, ...rest } = payload;
    const [findCustomer, findSales] = await Promise.all([
      customerRepo.getDetailById(customerId),
      salesPersonRepo.findDetail({
        identifier: salesPersonId,
        by: "id",
        companyId: rest.companyId,
      }),
    ]);

    if (!findCustomer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "customer tidak ditemukan",
      });
    }

    if (!findSales) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "sales tidak ditemukan",
      });
    }

    return await salesInvoiceRepo.create({
      ...rest,
      salesPersonId: findSales.id,
      customerId: findCustomer.id,
    });
  };

export type ICreateSalesInvoiceUseCase = ReturnType<
  typeof createSalesInvoiceUseCase
>;
