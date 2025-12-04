import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
    await requireAuth();

    return <p>Settings</p>
};

export default Page;