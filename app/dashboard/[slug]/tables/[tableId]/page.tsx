import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        tableId: string;
    }>
};

const Page = async ({ params }: PageProps) => {
    await requireAuth();
    const { tableId } = await params;
    return <p>Table id: {tableId}</p>
};

export default Page;