import { useRestaurant } from "@/features/restaurants/store/context";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSuspenseTables = () => {
    const trpc = useTRPC();
    const restaurant = useRestaurant();

    return useSuspenseQuery(trpc.tables.getMany.queryOptions({ restaurantId: restaurant.id }));
};

export const useCreateTable = () => {
    const queryClient = useQueryClient();
    const trpc = useTRPC();
    const restaurant = useRestaurant();

    return useMutation(
        trpc.tables.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Table "${data.name}" created`);
                queryClient.invalidateQueries(
                    trpc.tables.getMany.queryOptions({ restaurantId: restaurant.id }),
                );
            },
            onError: (error) => {
                toast.error(`Failed to create table: ${error.message}`);
            },
        }),
    );
};
