import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const tablesRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            restaurantId: z.string(),
            name: z.string().min(1),
            areaId: z.string().optional(),
        }))
        .mutation(({ ctx, input }) => {
            // Makes sure restaurant belongs to user
            prisma.restaurant.findUniqueOrThrow({
                where: {
                    id: input.restaurantId,
                    userId: ctx.auth.user.id,
                }
            });

            return prisma.table.create({
                data: {
                    name: input.name,
                    restaurantId: input.restaurantId,
                    areaId: input.areaId,
                },
            });
        }),
    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            prisma.table.findUniqueOrThrow({
                where: {
                    id: input.id,
                    restaurant: {
                        userId: ctx.auth.user.id,
                    },
                },
            });

            return prisma.table.delete({
                where: {
                    id: input.id,
                },
            });
        }),
    updateName: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1)
        }))
        .mutation(({ ctx, input }) => {
            prisma.table.findUniqueOrThrow({
                where: {
                    id: input.id,
                    restaurant: {
                        userId: ctx.auth.user.id,
                    },
                },
            });

            return prisma.table.update({
                where: { id: input.id },
                data: { name: input.name },
            });
        }),
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            return prisma.table.findUniqueOrThrow({
                where: {
                    id: input.id,
                    restaurant: {
                        userId: ctx.auth.user.id,
                    },
                },
            });
        }),
    getMany: protectedProcedure
        .input(z.object({ restaurantId: z.string() }))
        .query(({ ctx }) => {
            return prisma.table.findMany({
                where: {
                    restaurant: {
                        userId: ctx.auth.user.id,
                    },
                },
            });
        }),
});