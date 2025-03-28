// import { type PurchasePayload } from "@/model/purchase.model";
// import { createCaller } from "@/trpc/root";
// import { headers } from "next/headers";
// import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// // Import the test database instead of the main database
// import { testDb } from "./setup";
// import { mockOwner } from "./setup";

// // Mock dependencies and setup test environment
// const mockCompanyId = "test-company-id";
// const mockSupplierId = "test-supplier-id";
// const mockProductId = "test-product-id";

// describe("Purchase Module Tests", () => {
//   let caller: ReturnType<typeof createCaller>;

//   // Setup a fresh caller before each test
//   beforeEach(async () => {
//     // Mock headers for the test environment
//     const header = await headers();

//     // Create a caller with test session data
//     caller = createCaller({
//       db: testDb,
//       session: {
//         user: {
//           companyId: mockCompanyId,
//           role: "OWNER",
//           username: mockOwner.username,
//           id: "test-user-id",
//         },
//       },
//       headers: header,
//     });

//     // Reset mocks between tests
//     vi.clearAllMocks();
//   });

//   // Clean up after tests
//   afterEach(async () => {
//     // Clean up any test data as needed
//     try {
//       await testDb.purchase.deleteMany({
//         where: {
//           companyId: mockCompanyId,
//         },
//       });
//     } catch (error) {
//       console.error("Error cleaning up test data:", error);
//     }
//   });

//   // Test creating a purchase
//   describe("createPurchase", () => {
//     it("should create a new purchase successfully", async () => {
//       // Arrange
//       const purchasePayload: PurchasePayload = {
//         purchaseDate: new Date(),
//         supplierId: mockSupplierId,
//         companyId: mockCompanyId,
//         detail: [
//           {
//             productId: mockProductId,
//             ppn: 10,
//             quantity: 10,
//             price: 100000,
//             discount: 0,
//           },
//         ],
//       };

//       // Act
//       const result = await caller.purchase.create(purchasePayload);

//       // Assert
//       expect(result).toBeDefined();
//       expect(result.id).toBeDefined();
//       expect(result.supplierId).toBe(mockSupplierId);
//       expect(result.status).toBe("DIPROSES");
//       expect(result.paymentStatus).toBe("UNPAID");
//     });

//     it("should apply discounts correctly", async () => {
//       // Arrange
//       const purchasePayload: PurchasePayload = {
//         purchaseDate: new Date(),
//         supplierId: mockSupplierId,
//         companyId: mockCompanyId,
//         discount: 10, // 10% discount
//         detail: [
//           {
//             productId: mockProductId,
//             quantity: 10,
//             price: 100000,
//             discount: 5, // 5% item discount
//           },
//         ],
//       };

//       // Act
//       const result = await caller.purchase.create(purchasePayload);

//       // Assert
//       expect(result).toBeDefined();
//       // The net total calculation would be tested here, but it depends on the implementation
//     });

//     it("should handle PPN correctly", async () => {
//       // Arrange
//       const purchasePayload: PurchasePayload = {
//         purchaseDate: new Date(),
//         supplierId: mockSupplierId,
//         companyId: mockCompanyId,
//         ppn: 100000, // Fixed PPN amount
//         detail: [
//           {
//             productId: mockProductId,
//             quantity: 10,
//             price: 100000,
//             ppn: 10, // 10% per item PPN
//           },
//         ],
//       };

//       // Act
//       const result = await caller.purchase.create(purchasePayload);

//       // Assert
//       expect(result).toBeDefined();
//       // The net total calculation would be tested here, but it depends on the implementation
//     });

//     it("should reject duplicate reference numbers", async () => {
//       // Arrange
//       const ref = "PO-TEST-123";
//       const purchasePayload: PurchasePayload = {
//         purchaseDate: new Date(),
//         supplierId: mockSupplierId,
//         companyId: mockCompanyId,
//         ref,
//         detail: [
//           {
//             productId: mockProductId,
//             quantity: 5,
//             price: 50000,
//           },
//         ],
//       };

//       // Create first purchase with the reference
//       await caller.purchase.create(purchasePayload);

//       // Act & Assert
//       // Attempt to create another purchase with the same reference
//       await expect(caller.purchase.create(purchasePayload)).rejects.toThrow();
//     });
//   });

//   // Test retrieving purchases
//   describe("getAllPurchases", () => {
//     it("should retrieve purchases with pagination", async () => {
//       // Arrange - Create some test purchases
//       const purchasePayload: PurchasePayload = {
//         purchaseDate: new Date(),
//         supplierId: mockSupplierId,
//         companyId: mockCompanyId,
//         detail: [
//           {
//             productId: mockProductId,
//             quantity: 5,
//             price: 50000,
//           },
//         ],
//       };

//       await caller.purchase.create(purchasePayload);
//       await caller.purchase.create(purchasePayload);

//       // Act
//       const result = await caller.purchase.getAll({
//         companyId: mockCompanyId,
//         limit: 10,
//         page: 1,
//       });

//       // Assert
//       expect(result.data).toBeDefined();
//       expect(result.data.length).toBeGreaterThanOrEqual(2);
//       expect(result.meta.pageCount).toBeGreaterThanOrEqual(1);
//     });

//     it("should filter purchases by search term", async () => {
//       // Arrange - Create a purchase with a specific reference
//       const ref = "SEARCHABLE-REF";
//       const purchasePayload: PurchasePayload = {
//         purchaseDate: new Date(),
//         supplierId: mockSupplierId,
//         companyId: mockCompanyId,
//         ref,
//         detail: [
//           {
//             productId: mockProductId,
//             quantity: 5,
//             price: 50000,
//           },
//         ],
//       };

//       await caller.purchase.create(purchasePayload);

//       // Act
//       const result = await caller.purchase.getAll({
//         companyId: mockCompanyId,
//         limit: 10,
//         page: 1,
//         search: "SEARCHABLE",
//       });

//       // Assert
//       expect(result.data).toBeDefined();
//       expect(result.data.length).toBeGreaterThanOrEqual(1);
//       expect(result.data[0].ref).toBe(ref);
//     });
//   });

//   // Test updating purchase status
//   describe("updatePurchaseStatus", () => {
//     it("should update purchase status successfully", async () => {
//       // Arrange - Create a purchase
//       const purchasePayload: PurchasePayload = {
//         purchaseDate: new Date(),
//         supplierId: mockSupplierId,
//         companyId: mockCompanyId,
//         detail: [
//           {
//             productId: mockProductId,
//             quantity: 5,
//             price: 50000,
//           },
//         ],
//       };

//       const purchase = await caller.purchase.create(purchasePayload);

//       // Act
//       const result = await caller.purchase.updateStatus({
//         id: purchase.id,
//         status: "SELESAI",
//         paymentStatus: "PAID",
//       });

//       // Assert
//       expect(result).toBeDefined();
//       expect(result.status).toBe("SELESAI");
//       expect(result.paymentStatus).toBe("PAID");
//     });
//   });
// });
