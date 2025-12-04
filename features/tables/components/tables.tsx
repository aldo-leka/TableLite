"use client";

import { EntityContainer, EntityHeader, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateTable, useSuspenseTables } from "../hooks/use-tables";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { PackageOpenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TablesContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <EntityContainer
            header={<TablesHeader />}
        >
            {children}
        </EntityContainer>
    );
};

export const TablesLoading = () => {
    return <LoadingView message="Loading tables..." />;
};

export const TablesError = () => {
    return <ErrorView message="Error loading tables" />;
};

export const Tables = () => {
    const tables = useSuspenseTables();

    if (tables.data.length === 0) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <div className="max-w-sm mx-auto">
                    <TablesEmpty />
                </div>
            </div>
        );
    }

    return (
        <p>
            {JSON.stringify(tables.data, null, 2)}
        </p>
    );
};

export const TablesHeader = () => {
    return (
        <EntityHeader
            title="Tables"
            description="Add and manage your tables"
        />
    );
};

export const TablesEmpty = () => {
    const createTable = useCreateTable();

    return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <PackageOpenIcon />
                </EmptyMedia>
            </EmptyHeader>
            <EmptyTitle>
                No tables
            </EmptyTitle>
            <EmptyDescription>
                You haven't added any tables yet. Get started by adding your first table
            </EmptyDescription>
            <EmptyContent>
                <Button onClick={() => {
                    // createTable.mutate({ restaurantId: "", name: "1" })
                }}>
                    +
                </Button>
            </EmptyContent>
        </Empty>
    );
};