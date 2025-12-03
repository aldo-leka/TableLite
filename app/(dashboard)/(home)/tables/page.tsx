import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
    await requireAuth();

    return <p>Tables</p>
};

export default Page;