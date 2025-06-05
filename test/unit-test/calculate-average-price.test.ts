import { beforeEach, describe, expect, it } from "vitest";

import { ProductRepository } from "@/server/product/product.repository";

import { testDb } from "../setup";

describe("ProductRepository - _calculateAveragePrice", () => {
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepository(testDb);
  });

  it("should throw an error if stock quantities are negative", () => {
    // Arrange
    const payload = {
      prevQuantity: -10,
      currentQuantity: 20,
      prevAveragePrice: 1000,
      currentPrice: 1200,
      prevPrice: 1000,
    };

    // Act & Assert
    expect(() => productRepository._calculateAveragePrice(payload)).toThrow(
      "Stock quantities cannot be negative.",
    );
  });

  it("should return current price when previous quantity is zero (first purchase)", () => {
    // Arrange
    const payload = {
      prevQuantity: 0,
      currentQuantity: 10,
      prevAveragePrice: 0,
      currentPrice: 1000,
      prevPrice: 0,
    };

    // Act
    const result = productRepository._calculateAveragePrice(payload);

    // Assert
    expect(result).toBe(1000);
  });

  it("should calculate weighted average when adding more items", () => {
    // Arrange
    const payload = {
      prevQuantity: 5,
      currentQuantity: 15,
      prevAveragePrice: 1000,
      currentPrice: 1200,
      prevPrice: 1000,
    };

    // Act
    const result = productRepository._calculateAveragePrice(payload);

    // Assert
    // (5 * 1000 + 10 * 1200) / 15 = 5000 + 12000 / 15 = 17000 / 15 = 1133.33...
    expect(result).toBeCloseTo(1133.33, 2);
  });

  it("should handle case when stock is reduced (purchase update)", () => {
    // Arrange
    const payload = {
      prevQuantity: 20,
      currentQuantity: 15,
      prevAveragePrice: 1000,
      currentPrice: 1200,
      prevPrice: 900,
    };

    // Act
    const result = productRepository._calculateAveragePrice(payload);

    // Assert
    // Removed 5 items at prevPrice of 900
    // Removed value = 5 * 900 = 4500
    // Remaining value = 20 * 1000 - 4500 = 20000 - 4500 = 15500
    // New average = 15500 / 15 = 1033.33...
    expect(result).toBeCloseTo(1033.33, 2);
  });

  it("should return prevAveragePrice when current quantity becomes zero", () => {
    // Arrange
    const payload = {
      prevQuantity: 10,
      currentQuantity: 0,
      prevAveragePrice: 1000,
      currentPrice: 1200,
      prevPrice: 1000,
    };

    // Act
    const result = productRepository._calculateAveragePrice(payload);

    // Assert
    // Division by zero would be NaN, but the function returns prevAveragePrice in this case
    expect(result).toBe(1000);
  });

  it("should handle scenario with equal prevQuantity and currentQuantity", () => {
    // Arrange
    const payload = {
      prevQuantity: 10,
      currentQuantity: 10,
      prevAveragePrice: 1000,
      currentPrice: 1200,
      prevPrice: 1000,
    };

    // Act
    const result = productRepository._calculateAveragePrice(payload);

    // Assert
    // Added quantity is 0, so prevAveragePrice should be returned
    expect(result).toBe(1000);
  });

  it("should handle large numbers correctly", () => {
    // Arrange
    const payload = {
      prevQuantity: 1000,
      currentQuantity: 2000,
      prevAveragePrice: 50000,
      currentPrice: 55000,
      prevPrice: 50000,
    };

    // Act
    const result = productRepository._calculateAveragePrice(payload);

    // Assert
    // (1000 * 50000 + 1000 * 55000) / 2000 = 52500
    expect(result).toBe(52500);
  });
});
