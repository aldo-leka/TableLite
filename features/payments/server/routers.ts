import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const paymentsRouter = createTRPCRouter({
    getStatus: protectedProcedure
        .query(async ({ ctx }) => {
            const user = await prisma.user.findUniqueOrThrow({
                where: { id: ctx.auth.user.id },
                select: { paid: true },
            });

            return {
                paid: user.paid,
            };
        }),
});