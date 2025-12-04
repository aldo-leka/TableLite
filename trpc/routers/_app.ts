import { paymentsRouter } from '@/features/payments/server/routers';
import { createTRPCRouter } from '../init';
import { restaurantsRouter } from '@/features/restaurants/server/routers';
import { tablesRouter } from '@/features/tables/server/routers';

export const appRouter = createTRPCRouter({
    payments: paymentsRouter,
    restaurants: restaurantsRouter,
    tables: tablesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;