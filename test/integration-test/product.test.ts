import { type ProductPayload } from "@/model/product.model";
import { createCaller } from "@/trpc/root";
import { headers } from "next/headers";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Import the test database instead of the main database
import { testDb } from "../setup";
import { mockOwner } from "../setup";

// Mock dependencies and setup test environment
const mockCompanyId = "test-company-id";
const mockSupplierId = "test-supplier-id";

describe("Product Module Tests", () => {
  let caller: ReturnType<typeof createCaller>;

  // Setup a fresh caller before each test
  beforeEach(async () => {
    // Mock headers for the test environment
    const header = await headers();

    // Create a caller with test session data
    caller = createCaller({
      db: testDb,
      session: {
        user: {
          companyId: mockCompanyId,
          role: "OWNER",
          username: mockOwner.username,
          id: "test-user-id",
        },
      },
      headers: header,
    });

    // Reset mocks between tests
    vi.clearAllMocks();
  });

  // Clean up after tests
  afterEach(async () => {
    // Clean up any test data as needed
    try {
      await testDb.product.deleteMany({
        where: {
          companyId: mockCompanyId,
        },
      });
    } catch (error) {
      console.error("Error cleaning up test data:", error);
    }
  });

  // Test creating a product
  describe("createProduct", () => {
    it("should create a new product successfully", async () => {
      // Arrange
      const productPayload: ProductPayload = {
        name: "Test Product",
        supplierId: mockSupplierId,
        companyId: mockCompanyId,
        sellingPrice: 150000,
      };

      // Act
      const result = await caller.product.create(productPayload);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe("Test Product");
      expect(result.supplierId).toBe(mockSupplierId);
    });

    it("should create a product with initial stock and price", async () => {
      // Arrange
      const productPayload: ProductPayload = {
        name: "Test Product with Stock",
        supplierId: mockSupplierId,
        companyId: mockCompanyId,
        quantity: 100,
        price: 50000,
        sellingPrice: 75000,
      };

      // Act
      const result = await caller.product.create(productPayload);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe("Test Product with Stock");

      // Get the product to verify the initial stock was created
      const products = await caller.product.getAll({
        limit: 10,
        page: 1,
      });

      const createdProduct = products[0].find((p) => p.id === result.id);
      expect(createdProduct).toBeDefined();
      expect(createdProduct?.currentQuantity).toBe(100);
    });

    it("should reject a product with invalid data", async () => {
      // Arrange
      const invalidProductPayload = {
        name: "", // Empty name is invalid
        supplierId: mockSupplierId,
        companyId: mockCompanyId,
        sellingPrice: -100, // Negative price is invalid
      };

      // Act & Assert
      await expect(
        caller.product.create(invalidProductPayload),
      ).rejects.toThrow();
    });
  });

  // Test retrieving products
  describe("getAllProducts", () => {
    it("should retrieve products with pagination", async () => {
      // Arrange - Create some test products
      const productPayload1: ProductPayload = {
        name: "Test Product 1",
        supplierId: mockSupplierId,
        companyId: mockCompanyId,
        sellingPrice: 100000,
      };

      const productPayload2: ProductPayload = {
        name: "Test Product 2",
        supplierId: mockSupplierId,
        companyId: mockCompanyId,
        sellingPrice: 200000,
      };

      await caller.product.create(productPayload1);
      await caller.product.create(productPayload2);

      // Act
      const result = await caller.product.getAll({
        limit: 10,
        page: 1,
      });

      // Assert
      expect(result[0]).toBeDefined();
      expect(result[0].length).toBeGreaterThanOrEqual(2);
      expect(result[1].pageCount).toBeGreaterThanOrEqual(1);
    });

    it("should filter products by search term", async () => {
      // Arrange - Create products with specific names
      const productPayload1: ProductPayload = {
        name: "UNIQUE Product",
        supplierId: mockSupplierId,
        companyId: mockCompanyId,
        sellingPrice: 100000,
      };

      const productPayload2: ProductPayload = {
        name: "Regular Product",
        supplierId: mockSupplierId,
        companyId: mockCompanyId,
        sellingPrice: 200000,
      };

      await caller.product.create(productPayload1);
      await caller.product.create(productPayload2);

      // Act
      const result = await caller.product.getAll({
        limit: 10,
        page: 1,
        search: "UNIQUE",
      });

      // Assert
      expect(result[0]).toBeDefined();
      expect(result[0].length).toBeGreaterThanOrEqual(1);
      expect(result[0][0]?.name).toBe("UNIQUE Product");
    });

    it("should filter products by supplier ID", async () => {
      // Arrange - Create a product with a specific supplier
      const specificSupplierId = "specific-supplier-id";
      const productPayload: ProductPayload = {
        name: "Supplier-specific Product",
        supplierId: specificSupplierId,
        companyId: mockCompanyId,
        sellingPrice: 100000,
      };

      await caller.product.create(productPayload);

      // Act
      const result = await caller.product.getAll({
        limit: 10,
        page: 1,
        supplierId: specificSupplierId,
      });

      // Assert
      expect(result[0]).toBeDefined();
      expect(result[0].length).toBeGreaterThanOrEqual(1);
      expect(result[0][0]?.supplierId).toBe(specificSupplierId);
    });
  });
});
