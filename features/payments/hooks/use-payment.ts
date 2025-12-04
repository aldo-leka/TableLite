import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const usePayment = () => {
    const trpc = useTRPC();
    return useQuery(trpc.payments.getStatus.queryOptions());
};

export const useHasPurchased = () => {
    const { data, isLoading, ...rest } = usePayment();

    return {
        paid: data?.paid ?? false,
        isLoading,
        ...rest,
    };
};