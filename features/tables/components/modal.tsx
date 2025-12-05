"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateTable, useUpdateTable, useDeleteTable, useSuspenseTables } from "../hooks/use-tables";
import { useSuspenseAreas } from "@/features/areas/hooks/use-areas";
import { useRestaurant } from "@/features/restaurants/store/context";
import { useEffect } from "react";

const tableSchema = z.object({
    name: z.string().min(1, "Table name is required"),
    maxGuests: z.number().int().min(1, "Must be at least 1").max(20, "Must be at most 20"),
    areaId: z.string().nullish(),
});

type TableFormValues = z.infer<typeof tableSchema>;

interface Table {
    id: string;
    name: string;
    maxGuests: number;
    areaId: string | null;
}

interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    table?: Table;
    defaultAreaId?: string | null;
}

export const Modal = ({
    open,
    onOpenChange,
    table,
    defaultAreaId,
}: ModalProps) => {
    const restaurant = useRestaurant();
    const areas = useSuspenseAreas();
    const tables = useSuspenseTables();
    const createTable = useCreateTable();
    const updateTable = useUpdateTable();
    const deleteTable = useDeleteTable();

    const isEditMode = !!table;

    const getNextTableNumber = () => {
        const tableNumbers = tables.data
            .map(t => parseInt(t.name))
            .filter(n => !isNaN(n));

        if (tableNumbers.length === 0) return "1";

        const maxNumber = Math.max(...tableNumbers);
        return String(maxNumber + 1);
    };

    const form = useForm<TableFormValues>({
        resolver: zodResolver(tableSchema),
        defaultValues: {
            name: table?.name || "",
            maxGuests: table?.maxGuests || 4,
            areaId: table?.areaId || defaultAreaId || null,
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                name: table?.name || getNextTableNumber(),
                maxGuests: table?.maxGuests || 4,
                areaId: table?.areaId || defaultAreaId || null,
            });
        }
    }, [open, table, defaultAreaId, form]);

    const onSubmit = async (values: TableFormValues) => {
        if (isEditMode) {
            await updateTable.mutateAsync({
                id: table.id,
                name: values.name,
                maxGuests: values.maxGuests,
                areaId: values.areaId,
            });
        } else {
            await createTable.mutateAsync({
                restaurantId: restaurant.id,
                name: values.name,
                maxGuests: values.maxGuests,
                areaId: values.areaId,
            });
        }
        onOpenChange(false);
    };

    const handleDelete = async () => {
        if (isEditMode) {
            await deleteTable.mutateAsync({ id: table.id });
            onOpenChange(false);
        }
    };

    const isPending = form.formState.isSubmitting;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Table" : "Create Table"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Table ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="1"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maxGuests"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Guests</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={20}
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="areaId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Area</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(value === "unassigned" ? null : value)}
                                            value={field.value || "unassigned"}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an area" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="unassigned">Unassigned</SelectItem>
                                                {areas.data.map((area) => (
                                                    <SelectItem key={area.id} value={area.id}>
                                                        {area.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <div className="flex justify-between w-full">
                                {isEditMode && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={handleDelete}
                                        disabled={isPending}
                                    >
                                        Delete
                                    </Button>
                                )}
                                <div className="flex gap-2 ml-auto">
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={isPending}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                    >
                                        {isEditMode ? "Save" : "Create"}
                                    </Button>
                                </div>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};