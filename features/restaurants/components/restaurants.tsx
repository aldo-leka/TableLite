import { useSuspenseRestaurants } from "../hooks/use-restaurants";

export const RestaurantsList = () => {
    const restaurants = useSuspenseRestaurants();

    return (
        <p>
            {JSON.stringify(restaurants.data, null, 2)}
        </p>
    );
};