"use client";

import type { Restaurant } from "@/lib/generated/prisma/client";
import { createContext, useContext } from "react";

const RestaurantContext = createContext<Restaurant | null>(null);

export const RestaurantProvider = ({
    restaurant,
    children,
}: {
    restaurant: Restaurant;
    children: React.ReactNode;
}) => {
    return (
        <RestaurantContext.Provider value={restaurant}>
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurant = () => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error("useRestaurant must be used within RestaurantProvider");
    }
    return context;
};
