import { type UserPayload } from "@/model";
import { hashPassword } from "@/utils/passwordHandler";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { exec } from "child_process";
import { pagination } from "prisma-extension-pagination";
import { createSoftDeleteExtension } from "prisma-extension-soft-delete";
import { promisify } from "util";
import { afterAll, beforeAll, vi } from "vitest";

const execAsync = promisify(exec);

// Mock next/headers
vi.mock("next/headers", () => {
  return {
    headers: vi.fn(() => ({})),
  };
});

// Create test database client
const createTestPrismaClient = () =>
  new PrismaClient({
    datasources: {
      db: {
        url: "mysql://test_user:test_password@localhost:3307/test_db",
      },
    },
    log: ["error"],
    errorFormat: "pretty",
  })
    .$extends(
      pagination({
        pages: {
          limit: 10,
          includePageCount: true,
        },
        cursor: {
          limit: 10,
        },
      }),
    )
    .$extends(
      createSoftDeleteExtension({
        models: Object.fromEntries(
          Object.keys(Prisma.ModelName).map((model) => [model, true]),
        ),
        defaultConfig: {
          allowCompoundUniqueIndexWhere: true,
          field: "deleted",
          createValue: (deleted) => {
            if (deleted) return new Date();
            return null;
          },
        },
      }),
    );

// Create and export test database client
export const testDb = createTestPrismaClient();

// Mock the db import to use our test database
vi.mock("@/server/db", () => ({
  db: testDb,
}));

// Global setup and teardown
beforeAll(async () => {
  // Start Docker container with test database
  console.log("Starting test database container...");
  try {
    await execAsync("docker-compose up -d");

    // Wait for the database to be ready (simple delay)
    console.log("Waiting for database to be ready...");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Run migrations
    console.log("Running migrations...");
    await execAsync(
      'DATABASE_URL="mysql://test_user:test_password@localhost:3307/test_db" npx prisma migrate deploy',
    );
  } catch (error) {
    console.error("Setup failed:", error);
  }

  // Connect to test database
  await testDb.$connect();

  // Create test users and company
  console.log("Creating test users and company...");
  try {
    // Create owner user
    const ownerUser = await testDb.user.create({
      data: {
        username: mockOwner.username,
        password: mockOwner.password,
        role: mockOwner.role,
      },
    });

    // Create a test company
    const company = await testDb.company.create({
      data: {
        name: "Test Company",
        address: "Test Address",
      },
    });

    // Associate owner with company
    await testDb.user_Company.create({
      data: {
        userId: ownerUser.id,
        companyId: company.id,
      },
    });

    // Create other test users and associate with company
    const regularUser = await testDb.user.create({
      data: {
        username: mockUser.username,
        password: mockUser.password,
        role: mockUser.role,
      },
    });

    await testDb.user_Company.create({
      data: {
        userId: regularUser.id,
        companyId: company.id,
      },
    });

    const adminUser = await testDb.user.create({
      data: {
        username: mockAdmin.username,
        password: mockAdmin.password,
        role: mockAdmin.role,
      },
    });

    await testDb.user_Company.create({
      data: {
        userId: adminUser.id,
        companyId: company.id,
      },
    });

    console.log("Test users and company created successfully");
  } catch (error) {
    console.error("Failed to create test data:", error);
  }

  console.log("Test database connected and ready");
});

afterAll(async () => {
  // Disconnect from test database
  await testDb.$disconnect();

  // Destroy the Docker container
  console.log("Shutting down and removing test database container...");
  try {
    await execAsync("docker-compose down -v");
    console.log("Test database container removed");
  } catch (error) {
    console.error("Failed to remove container:", error);
  }
});

// Create test user accounts
const password = await hashPassword("password");

export const mockUser: UserPayload = {
  password,
  role: "USER",
  username: "user",
};

export const mockAdmin: UserPayload = {
  password,
  role: "USER",
  username: "admin",
};

export const mockOwner: UserPayload = {
  password,
  role: "OWNER",
  username: "owner",
};
