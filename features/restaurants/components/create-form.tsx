"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const createSchema = z.object({
    name: z.string().min(1, "Restaurant name is required"),
});

type CreateRestaurantFormValues = z.infer<typeof createSchema>;

export function CreateForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const trpc = useTRPC();

    const existingRestaurant = searchParams.get("existing_restaurant") === "true";

    const form = useForm<CreateRestaurantFormValues>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: "",
        },
    });

    const createRestaurant = useMutation(
        trpc.restaurants.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Restaurant "${data.name}" created`);
                router.push(`/dashboard/${data.slug}/reservations`);
            },
            onError: (error) => {
                toast.error(`Failed to create restaurant: ${error.message}`);
            },
        })
    );

    const onSubmit = async (values: CreateRestaurantFormValues) => {
        createRestaurant.mutate(values);
    };

    const isPending = form.formState.isSubmitting || createRestaurant.isPending;

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        Create Your Restaurant
                    </CardTitle>
                    <CardDescription>
                        You&apos;ll be up and running in no time
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Restaurant Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="e.g. Mario's Pizzeria"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isPending}
                                >
                                    Create
                                </Button>
                                {existingRestaurant && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        disabled={isPending}
                                        onClick={() => router.back()}
                                    >
                                        Back to Dashboard
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
