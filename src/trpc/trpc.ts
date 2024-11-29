/**
 * tRPC Server Setup
 *
 * This file initializes and configures the tRPC server, including:
 * - Context creation
 * - Router and procedure definitions
 * - Middleware for additional functionality
 *
 * Use this file as a reference for creating API endpoints or extending server capabilities.
 */

import { GetCompanyByUsernameController } from "@/server/company/controller/get-company-by-username.controller";
import { db } from "@/server/db/prisma";
import { CompanyRepository } from "@/server/company/company.repository";
import { auth } from "@/server/services/authentication.service";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z, ZodError } from "zod";

/**
 * Creates the tRPC context, providing access to:
 * - Prisma database instance
 * - User session details
 * - Request headers
 *
 * @param {Object} opts - Options containing request headers
 * @returns {Promise<Object>} The context object
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    db,
    session: {
      ...session,
    },
    ...opts,
  };
};

/**
 * Initializes the tRPC API, including:
 * - Context integration
 * - Custom transformer (superjson)
 * - Error formatting for Zod validation errors
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Creates a server-side caller for invoking tRPC procedures directly.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Defines a new tRPC router for grouping API endpoints.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for adding artificial latency and logging execution times in development.
 *
 * @param {Object} params - Procedure call details
 * @returns {Promise<Object>} The result of the procedure execution
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

/**
 * Public procedure: Accessible without authentication.
 *
 * Automatically uses timing middleware for debugging in development.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Protected procedure: Accessible only to authenticated users.
 *
 * Ensures `ctx.session.user` is non-null.
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Owner procedure: Accessible only to users with the "OWNER" role.
 */
export const ownerProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session?.user.role !== "OWNER") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Company procedure: Verifies that the user belongs to a company.
 */
export const companyProcedure = protectedProcedure.use(
  async function isMemberOfCompany(opts) {
    if (!opts.ctx.session.user.companyId) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    const companyRepo = new CompanyRepository(opts.ctx.db);
    const getCompanyController = new GetCompanyByUsernameController(
      companyRepo,
    );

    const findCompany = await getCompanyController.execute(
      opts.ctx.session.user.companyId,
    );

    return opts.next({
      ctx: {
        ...opts.ctx,
        session: {
          ...opts.ctx.session,
          user: {
            ...opts.ctx.session.user,
            companyId: findCompany.id,
          },
        },
      },
    });
  },
);

/**
 * Admin Company procedure: Accessible only to non-USER roles within a company.
 */
export const adminCompanyProcedure = companyProcedure.use(({ ctx, next }) => {
  if (ctx.session?.user?.role === "USER") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Owner Company procedure: Accessible only to users with the "ADMIN" role in a company.
 */
export const ownerCompanyProcedure = adminCompanyProcedure.use(
  ({ ctx, next }) => {
    if (ctx.session?.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  },
);
