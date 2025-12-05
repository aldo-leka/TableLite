import { CreateLayout } from "@/features/restaurants/components/create-layout";

const Layout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <CreateLayout>
            {children}
        </CreateLayout>
    );
};

export default Layout;
