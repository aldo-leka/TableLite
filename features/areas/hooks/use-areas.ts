import { useRestaurant } from "@/features/restaurants/store/context";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useSuspenseAreas = () => {
    const trpc = useTRPC();
    const restaurant = useRestaurant();

    return useSuspenseQuery(trpc.areas.getMany.queryOptions({ restaurantId: restaurant.id }));
};
