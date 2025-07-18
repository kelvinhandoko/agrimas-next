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
import { env } from "@/env";
import { TRPCError, initTRPC } from "@trpc/server";
import { getStatusCodeFromKey } from "@trpc/server/unstable-core-do-not-import";
import superjson from "superjson";
import { type TRPCPanelMeta } from "trpc-ui";
import { ZodError } from "zod";

import { logger } from "@/lib/winston";

import { CompanyRepository } from "@/server/company/company.repository";
import { GetCompanyByIdUseCase } from "@/server/company/use-cases";
import { db } from "@/server/db/prisma";
import { auth } from "@/server/services/authentication.service";

/**
 * Creates the tRPC context, providing access to:
 * - Prisma database instance
 * - User session details
 * - Request headers
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
const t = initTRPC
  .context<typeof createTRPCContext>()
  .meta<TRPCPanelMeta>()
  .create({
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

const loggerMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;

  if (result.ok) {
    if (env.NODE_ENV !== "production") {
      logger.info(`✅ ${type.toUpperCase()} ${path} - ${durationMs}ms ]`);
    }
  } else {
    logger.error(`❌ ${type.toUpperCase()} ${path} - ${durationMs}ms`);
    logger.error(
      `Error [${getStatusCodeFromKey(result.error.code)}]: ${result.error.message}`,
    );
  }

  return result;
});

/**
 * Public procedure: Accessible without authentication.
 *
 * Automatically uses timing middleware for debugging in development.
 */
export const publicProcedure = t.procedure.use(loggerMiddleware);

/**
 * Protected procedure: Accessible only to authenticated users.
 *
 * Ensures `ctx.session.user` is non-null.
 */
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
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
    const getCompanyUseCase = new GetCompanyByIdUseCase(companyRepo);

    const findCompany = await getCompanyUseCase.execute(
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
    if (ctx.session?.user?.role !== "OWNER") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  },
);
