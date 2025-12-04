"use client";

import { EntityContainer, EntityHeader, ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseTables } from "../hooks/use-tables";

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
    return <ErrorView message="Error loading tables..." />;
};

export const Tables = () => {
    const tables = useSuspenseTables();

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
            description="Create and manage your tables"
        />
    );
};