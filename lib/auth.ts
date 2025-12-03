import { checkout, polar, webhooks } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { polarClient } from "./polar";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: process.env.POLAR_PRODUCT_ID as string,
                            slug: "TableLite-Pro"
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true,
                }),
                webhooks({
                    secret: process.env.POLAR_WEBHOOK_SECRET as string,
                    onOrderPaid: async (payload) => {
                        const order = payload.data;
                        const userId = order.customer?.externalId;
                        const productId = order.productId;

                        if (!userId) {
                            console.error("No external_id in order payload customer:", order.customer);
                            return;
                        }

                        try {
                            await prisma.user.update({
                                where: { id: userId },
                                data: {
                                    paid: true,
                                },
                            });
                        } catch (error) {
                            console.error(`Failed to set paid to user ${userId}:`, error);
                        }
                    }
                }),
            ],
        })
    ]
});