import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const tablesRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            restaurantId: z.string(),
            name: z.string().min(1).max(20),
            minGuests: z.number().int().min(1).max(20),
            maxGuests: z.number().int().min(1).max(20),
            areaId: z.string().nullish(),
        }).refine((data) => data.minGuests <= data.maxGuests, {
            message: "Min guests cannot be greater than max guests",
            path: ["minGuests"],
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
                    minGuests: input.minGuests,
                    maxGuests: input.maxGuests,
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
    update: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1),
            minGuests: z.number().int().min(1).max(20),
            maxGuests: z.number().int().min(1).max(20),
            areaId: z.string().nullish(),
        }).refine((data) => data.minGuests <= data.maxGuests, {
            message: "Min guests cannot be greater than max guests",
            path: ["minGuests"],
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
                data: {
                    name: input.name,
                    minGuests: input.minGuests,
                    maxGuests: input.maxGuests,
                    areaId: input.areaId,
                },
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
        .query(({ ctx, input }) => {
            return prisma.table.findMany({
                where: {
                    restaurantId: input.restaurantId,
                    restaurant: {
                        userId: ctx.auth.user.id,
                    },
                },
                include: {
                    area: true,
                },
            });
        }),
});