import { Tables, TablesContainer, TablesError, TablesLoading } from "@/features/tables/components/tables";
import { prefetchTables } from "@/features/tables/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { HydrateClient } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const auth = await requireAuth();
    const { slug } = await params;
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
            userId: auth.user.id,
        },
    });

    if (!restaurant) {
        notFound();
    }

    prefetchTables({ restaurantId: restaurant.id });

    return (
        <TablesContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<TablesError />}>
                    <Suspense fallback={<TablesLoading />}>
                        <Tables />
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </TablesContainer>
    );
};

export default Page;