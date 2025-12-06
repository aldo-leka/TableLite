"use client";

import {
    EntityContainer,
    EntityHeader,
    ErrorView,
    LoadingView,
} from "@/components/entity-components";
import { useSuspenseTables } from "../hooks/use-tables";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { PackageOpenIcon, Users } from "lucide-react";
import { useState } from "react";
import { Modal } from "./modal";
import type { Table } from "@/lib/generated/prisma/client";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from "@/components/ui/tooltip";

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

const TableCard = ({ table, onClick }: { table: Table; onClick: () => void }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={onClick}
                    className="bg-muted rounded-lg aspect-square w-full max-w-24 flex flex-col items-center justify-center relative hover:bg-muted/80 transition-colors p-4"
                >
                    <span className="text-lg font-semibold truncate w-full text-center px-1">
                        {table.name}
                    </span>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs">
                        <Users className="size-4" />
                        <span>{table.minGuests}-{table.maxGuests}</span>
                    </div>
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{table.name}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export const Tables = () => {
    const tables = useSuspenseTables();
    const [selectedTable, setSelectedTable] = useState<Table | undefined>();
    const [openModal, setOpenModal] = useState(false);
    const [defaultAreaId, setDefaultAreaId] = useState<string | null>(null);

    if (tables.data.length === 0) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <div className="max-w-sm mx-auto">
                    <TablesEmpty />
                </div>
            </div>
        );
    }

    const groupedTables = tables.data.reduce((acc, table) => {
        const areaKey = table.areaId || "unassigned";
        if (!acc[areaKey]) {
            acc[areaKey] = {
                areaName: table.area?.name || "Unassigned",
                tables: [],
            };
        }
        acc[areaKey].tables.push(table);
        return acc;
    }, {} as Record<string, { areaName: string; tables: any[] }>);

    const handleTableClick = (table: any) => {
        setSelectedTable(table);
        setDefaultAreaId(null);
        setOpenModal(true);
    };

    const handleAddTable = (areaId: string | null) => {
        setSelectedTable(undefined);
        setDefaultAreaId(areaId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTable(undefined);
        setDefaultAreaId(null);
    };

    return (
        <>
            <Modal
                open={openModal}
                onOpenChange={handleCloseModal}
                table={selectedTable}
                defaultAreaId={defaultAreaId}
            />
            <div>
                {Object.entries(groupedTables).map(([areaKey, { areaName, tables }]) => (
                    <div key={areaKey} className="border border-dashed rounded-lg p-6 pt-8 relative">
                        <span className="absolute -top-3 left-4 bg-accent/20 px-2 text-base font-semibold">
                            {areaName}
                        </span>
                        <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
                            {tables.map((table) => (
                                <TableCard
                                    key={table.id}
                                    table={table}
                                    onClick={() => handleTableClick(table)}
                                />
                            ))}
                            <button
                                onClick={() => handleAddTable(areaKey === "unassigned" ? null : areaKey)}
                                className="border-2 border-dashed rounded-lg aspect-square w-full max-w-24 max-h-24 flex items-center justify-center hover:bg-accent transition-colors"
                            >
                                <span className="text-4xl font-light">+</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
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
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Modal open={openModal} onOpenChange={setOpenModal} />
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
                    <button
                        className="p-6 border-2 border-dashed rounded-lg aspect-square max-w-24 max-h-24 flex items-center justify-center hover:bg-accent transition-colors"
                        onClick={() => setOpenModal(true)}
                    >
                        <span className="text-4xl font-light">+</span>
                    </button>
                </EmptyContent>
            </Empty>
        </>
    );
};