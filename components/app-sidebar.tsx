"use client";

import {
    CalendarClockIcon,
    ChevronDownIcon,
    Settings2Icon,
    StarIcon,
    UtensilsCrossedIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useHasPurchased } from "@/features/payments/hooks/use-payment";
import { useRestaurant } from "@/features/restaurants/store/context";
import { useSuspenseRestaurants } from "@/features/restaurants/hooks/use-restaurants";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const getMenuItems = (slug: string) => [
    {
        title: "Main",
        items: [
            {
                title: "Reservations",
                icon: CalendarClockIcon,
                url: `/dashboard/${slug}/reservations`
            },
            {
                title: "Tables",
                icon: UtensilsCrossedIcon,
                url: `/dashboard/${slug}/tables`
            },
            {
                title: "Settings",
                icon: Settings2Icon,
                url: `/dashboard/${slug}/settings`,
            },
        ]
    }
];

export const AppSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { paid, isLoading } = useHasPurchased();
    const restaurant = useRestaurant();
    const { data: restaurants } = useSuspenseRestaurants();
    const menuItems = getMenuItems(restaurant.slug);

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        className="gap-x-4 h-10 px-4"
                    >
                        <Link
                            href="/"
                            prefetch
                        >
                            <Image
                                src="/logos/logo.svg"
                                alt="TableLite"
                                width={30}
                                height={30}
                            />
                            <span className="font-semibold text-sm">
                                TableLite
                            </span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={
                                                item.url === "/"
                                                    ? pathname === "/"
                                                    : pathname.startsWith(item.url)
                                            }
                                            asChild
                                            className="gap-x-4 h-10 px-4"
                                        >
                                            <Link
                                                href={item.url}
                                                prefetch
                                            >
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {!paid && !isLoading && (
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Upgrade to Pro"
                                className="gap-x-4 h-10 px-4"
                                onClick={() => authClient.checkout({ slug: "TableLite-Pro" })}
                            >
                                <StarIcon className="h-4 w-4" />
                                <span>Upgrade to Pro</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg grayscale">
                                        <AvatarFallback className="rounded-lg">{restaurant.name.slice(0, 1).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{restaurant.name}</span>
                                        <span className="truncate text-xs">
                                            Email goes here
                                        </span>
                                    </div>
                                    <ChevronDownIcon className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuGroup>
                                    {restaurants.map((rest) => (
                                        <DropdownMenuItem
                                            key={rest.id}
                                            asChild
                                        >
                                            <Link
                                                prefetch
                                                href={`/dashboard/${rest.slug}/reservations`}
                                                className="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                                            >
                                                <Avatar className="size-8 rounded-lg">
                                                    <AvatarFallback className="rounded-lg">
                                                        {rest.name.slice(0, 1).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="grid flex-1 text-left text-sm leading-tight">
                                                    <span className="truncate font-medium">{rest.name}</span>
                                                    <span className="truncate text-xs">
                                                        Email goes here
                                                    </span>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            prefetch
                                            href="/dashboard/create?existing_restaurant=true"
                                        >
                                            New Restaurant
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Account Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => authClient.signOut({
                                        fetchOptions: {
                                            onSuccess: () => {
                                                router.push("/");
                                            },
                                        }
                                    })}
                                >
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}