import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
    await requireAuth();
    
    return <p>Reservations</p>
};

export default Page;