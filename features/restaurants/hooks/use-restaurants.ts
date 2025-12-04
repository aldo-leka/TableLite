import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const useSuspenseRestaurants = () => {
    const trpc = useTRPC();

    return useSuspenseQuery(trpc.restaurants.getMany.queryOptions());
};