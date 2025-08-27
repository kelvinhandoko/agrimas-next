import { purchaseReturnPayloadSchema } from "@/model/purchase-return.model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { db } from "@/server/db";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { getDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";
import { createGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/create-general-ledger.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { createJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";
import { ProductRepository } from "@/server/product/product.repository";
import { getDetailProductUseCase } from "@/server/product/use-cases/get-detail-product.use-case";
import { createPurchaseReturnOrchestrator } from "@/server/purchaseReturn/orchestrator/create-purchase-return.orchestrator";
import { PurchaseReturnRepository } from "@/server/purchaseReturn/purchase-return.repository";
import { createPurchaseReturnUseCase } from "@/server/purchaseReturn/use-cases/create-purchase-return.use-case";
import { createPurchaseReturnDetailOrchestrator } from "@/server/purchaseReturnDetail/orchestrator/create-purchase-return-detail.orchestrator";
import { PurchaseReturnDetailRepository } from "@/server/purchaseReturnDetail/purchase-return-detail.repository";
import { createPurchaseReturnDetailUseCase } from "@/server/purchaseReturnDetail/use-cases/create-purchase-return-detail.use-case";
import { handlePurchaseProductOrchestrator } from "@/server/purchasedProduct/orchestrator/handle-purchased-product.orchestrator";
import { PurchasedProductRepository } from "@/server/purchasedProduct/purchased-product.repository";
import { createPurchasedProductUseCase } from "@/server/purchasedProduct/useCases/create-purchase-product.use-case";
import { findPurchasedProductUseCase } from "@/server/purchasedProduct/useCases/find-purchase-product.use-case";
import { UpdatePurchasedProductUseCase } from "@/server/purchasedProduct/useCases/update-purchase-product.use-case";
import { TransactionService } from "@/server/services";
import {
  SupplierRepository,
  getDetailByIdSupplierUseCase,
} from "@/server/supplier";

export const createPurchaseReturnController = companyProcedure
  .input(purchaseReturnPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(db);
    return await transactionService.startTransaction(async (tx) => {
      // Initialize all repositories
      const purchaseReturnRepo = new PurchaseReturnRepository(tx);
      const purchaseReturnDetailRepo = new PurchaseReturnDetailRepository(tx);
      const supplierRepo = new SupplierRepository(tx);
      const productRepo = new ProductRepository(tx);
      const purchasedProductRepo = new PurchasedProductRepository(tx);
      const defaultAccountRepo = new DefaultAccountRepository(tx);
      const journalRepo = new JournalRepository(tx);
      const journalDetailRepo = new JournalDetailRepository(tx);
      const generalLedgerRepo = new GeneralLedgerRepository(tx);
      const accountRepo = new AccountRepository(tx);

      // Initialize main orchestrator use cases
      const createPurchaseReturn =
        createPurchaseReturnUseCase(purchaseReturnRepo);
      const findSupplier = getDetailByIdSupplierUseCase(supplierRepo);
      const getDefaultAccount = getDefaultAccountUseCase(defaultAccountRepo);
      const createJournal = createJournalOrchestrator({
        createJournalUseCase: createJournalUseCase(journalRepo),
        createJournalDetailUseCase: createJournalDetailUseCase({
          accountRepo,
          journalDetailRepo,
        }),
        createGeneralLedgerUseCase:
          createGeneralLedgerUseCase(generalLedgerRepo),
      });
      // Initialize detail orchestrator use cases
      const createPurchaseReturnDetail = createPurchaseReturnDetailUseCase(
        purchaseReturnDetailRepo,
      );
      const getProduct = getDetailProductUseCase(productRepo);

      const createPurchaseProduct =
        createPurchasedProductUseCase(purchasedProductRepo);
      const updatePurchaseProduct =
        UpdatePurchasedProductUseCase(purchasedProductRepo);
      const findPurchaseProduct =
        findPurchasedProductUseCase(purchasedProductRepo);

      const handlePurchaseProduct = handlePurchaseProductOrchestrator({
        createPurchaseProduct,
        findPurchaseProduct,
        updatePurchaseProduct,
      });

      const createPurchaseReturnDetailOrch =
        createPurchaseReturnDetailOrchestrator({
          createPurchaseReturnDetail,
          getProduct,
          handlePurchaseProduct,
        });

      // Create main orchestrator with all required use cases
      const orchestrator = createPurchaseReturnOrchestrator({
        createPurchaseReturn,
        findSupplier,
        createPurchaseReturnDetail: createPurchaseReturnDetailOrch,
        getDefaultAccount,
        createJournal,
      });

      // Execute orchestrator
      return await orchestrator({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });
