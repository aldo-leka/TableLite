"use client";

import { createContext, useContext } from "react";

type Restaurant = {
    id: string;
    slug: string;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

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
