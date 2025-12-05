import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const areasRouter = createTRPCRouter({
    getMany: protectedProcedure
        .input(z.object({ restaurantId: z.string() }))
        .query(({ ctx, input }) => {
            return prisma.area.findMany({
                where: {
                    restaurantId: input.restaurantId,
                    restaurant: {
                        userId: ctx.auth.user.id,
                    },
                },
            });
        }),
});
