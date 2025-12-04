import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const restaurantsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            name: z.string().min(1, "Restaurant name is required"),
        }))
        .mutation(async ({ ctx, input }) => {
            // Generate base slug from restaurant name
            const baseSlug = input.name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "");

            // Find a unique slug by checking existing slugs
            let slug = baseSlug;
            let counter = 1;

            while (true) {
                const existing = await prisma.restaurant.findUnique({
                    where: { slug },
                });

                if (!existing) {
                    break;
                }

                slug = `${baseSlug}-${counter}`;
                counter++;
            }

            return prisma.restaurant.create({
                data: {
                    name: input.name,
                    slug,
                    userId: ctx.auth.user.id,
                },
            });
        }),
    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return prisma.restaurant.delete({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id,
                },
            });
        }),
    updateName: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1)
        }))
        .mutation(({ ctx, input }) => {
            return prisma.restaurant.update({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                },
                data: { name: input.name },
            });
        }),
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            return prisma.restaurant.findUniqueOrThrow({
                where: {
                    id: input.id,
                    userId: ctx.auth.user.id
                },
                include: { areas: true, tables: true, }
            });
        }),
    getMany: protectedProcedure
        .query(({ ctx }) => {
            return prisma.restaurant.findMany({
                where: { userId: ctx.auth.user.id },
            });
        }),
});