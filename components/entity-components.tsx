import { AlertTriangleIcon, Loader2Icon } from "lucide-react";

type EntityHeaderProps = {
    title: string;
    description?: string;
};

export const EntityHeader = ({
    title,
    description,
}: EntityHeaderProps) => {
    return (
        <div className="flex flex-row items-center justify-between gap-x-4">
            <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
                {description && (
                    <p className="text-xs md:text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

type EntityContainerProps = {
    children: React.ReactNode;
    header?: React.ReactNode;
    search?: React.ReactNode;
};

export const EntityContainer = ({
    children,
    header,
    search,
}: EntityContainerProps) => {
    return (
        <div className="p-4 md:px-10 md:py-6 h-full">
            <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-8 h-full">
                {header}
                <div className="flex flex-col gap-y-4 h-full">
                    {search}
                    {children}
                </div>
            </div>
        </div>
    );
};

interface StateViewProps {
    message?: string;
};

export const LoadingView = ({
    message,
}: StateViewProps) => {
    return (
        <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
            <Loader2Icon className="size-6 animate-spin text-primary" />
            {!!message && (
                <p className="text-sm text-muted-foreground">
                    {message}
                </p>
            )}
        </div>
    );
};

export const ErrorView = ({
    message,
}: StateViewProps) => {
    return (
        <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
            <AlertTriangleIcon className="size-6 text-primary" />
            {!!message && (
                <p className="text-sm text-muted-foreground">
                    {message}
                </p>
            )}
        </div>
    );
};