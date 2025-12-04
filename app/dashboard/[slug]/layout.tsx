import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RestaurantProvider } from "@/features/restaurants/store/context";
import { requireAuth } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

const Layout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) => {
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

    return (
        <RestaurantProvider restaurant={restaurant}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="bg-accent/20">
                    <AppHeader />
                    <main className="flex-1">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </RestaurantProvider>
    );
};

export default Layout;