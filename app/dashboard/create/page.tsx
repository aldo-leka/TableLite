import { CreateForm } from "@/features/restaurants/components/create-form";
import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
    await requireAuth();

    return <CreateForm />;
};

export default Page;
