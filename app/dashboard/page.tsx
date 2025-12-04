import { requireAuth } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const Page = async () => {
    const auth = await requireAuth();

    const restaurants = await prisma.restaurant.findMany({
        where: { userId: auth.user.id },
        orderBy: { createdAt: "asc" },
    });

    // If user has no restaurants, redirect to create page
    if (restaurants.length === 0) {
        redirect("/dashboard/create");
    }

    // Redirect to the first restaurant
    redirect(`/dashboard/${restaurants[0].slug}/reservations`);
};

export default Page;
