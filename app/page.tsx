import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-background">
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">There's a better way</h1>
                <h2 className="text-3xl font-semibold mb-8 text-muted-foreground">
                    Stop Overpaying for Table Reservation Software
                </h2>
                <p className="text-xl max-w-3xl mx-auto mb-12 text-muted-foreground">
                    Restaurant owners pay €100-€200 monthly for booking software with outdated features,
                    confusing interfaces, and auto-renewal contracts. There's a better way.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/signup"
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="/login"
                        className="px-8 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition"
                    >
                        Sign In
                    </Link>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center">The Problem</h3>
                    <ul className="space-y-4 text-lg">
                        <li>💸 Monthly fees totaling €1,200-€2,400 annually</li>
                        <li>📜 Hidden contract terms and difficult cancellation policies</li>
                        <li>🔴 System failures: double bookings, lost reservations, failed confirmations</li>
                        <li>😵 Complicated dashboards that staff avoids using</li>
                        <li>🐌 Slow customer support responses</li>
                    </ul>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16 bg-accent/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-6">The Solution</h3>
                    <p className="text-xl mb-4">
                        Own your booking system with no subscriptions, contracts, or hidden fees.
                    </p>
                    <p className="text-2xl font-semibold">
                        Pay once, it's yours forever.
                    </p>
                    <p className="text-lg mt-6 text-muted-foreground">
                        Built for local restaurants—pizzerias, bakeries, cafes, neighborhood bistros,
                        and family-run establishments. Not enterprise chains.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <h3 className="text-3xl font-bold mb-12 text-center">Features</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: "The Booking Form",
                            description: "Real-time availability, mobile-friendly, under 60 seconds to complete"
                        },
                        {
                            title: "Reservation Dashboard",
                            description: "Searchable bookings, table management, accessible everywhere"
                        },
                        {
                            title: "Custom Branding",
                            description: "Remove all company logos, add your own colors and branding"
                        },
                        {
                            title: "Confirmation Emails",
                            description: "Automatic deployment, customizable messaging"
                        },
                        {
                            title: "Guest Self-Service",
                            description: "Customers can cancel/modify without calling"
                        },
                        {
                            title: "Automatic Reminders",
                            description: "Pre-visit text/email reminders to reduce no-shows"
                        },
                        {
                            title: "Specials Highlighting",
                            description: "Feature premium experiences with photos"
                        },
                        {
                            title: "Deposits Module",
                            description: "Collect upfront payments for high-risk bookings"
                        },
                        {
                            title: "Gift Cards",
                            description: "Built-in gift card sales functionality"
                        }
                    ].map((feature) => (
                        <div key={feature.title} className="p-6 border border-border rounded-lg">
                            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4 py-20 text-center">
                <h3 className="text-3xl font-bold mb-6">Ready to get started?</h3>
                <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
                    Join as one of the first restaurants using TableLite with complete feature access
                    and dedicated onboarding support.
                </p>
                <Link
                    href="/signup"
                    className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition"
                >
                    Get Started Now
                </Link>
            </section>
        </div>
    );
};

export default Page;
