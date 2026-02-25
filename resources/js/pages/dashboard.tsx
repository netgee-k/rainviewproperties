import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
    label,
    value,
    sub,
    icon,
    accent,
}: {
    label: string;
    value: string | number;
    sub?: string;
    icon: string;
    accent: string;
}) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div
                className="absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-10"
                style={{ background: accent }}
            />
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    {label}
                </span>
                <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-lg"
                    style={{ background: accent + '22', color: accent }}
                >
                    {icon}
                </span>
            </div>
            <p className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {value}
            </p>
            {sub && (
                <p className="mt-1 text-xs text-neutral-500">{sub}</p>
            )}
        </div>
    );
}

// ─── Activity Row ─────────────────────────────────────────────────────────────
function ActivityRow({
    title,
    category,
    time,
    status,
}: {
    title: string;
    category: string;
    time: string;
    status: 'active' | 'pending' | 'sold';
}) {
    const statusStyles = {
        active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        sold: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    };

    return (
        <div className="flex items-center gap-4 border-b border-neutral-100 py-3 last:border-0 dark:border-neutral-800">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-xl dark:bg-neutral-800">
                {category === 'House' ? '🏠' : category === 'Car' ? '🚗' : category === 'Plot' ? '🌍' : category === 'BnB' ? '🏨' : '🔑'}
            </div>
            <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {title}
                </p>
                <p className="text-xs text-neutral-400">{category} · {time}</p>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        </div>
    );
}

// ─── Quick Action ─────────────────────────────────────────────────────────────
function QuickAction({
    icon,
    label,
    href,
    color,
}: {
    icon: string;
    label: string;
    href: string;
    color: string;
}) {
    return (
        <a
            href={href}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
            <span
                className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform group-hover:scale-110"
                style={{ background: color + '22' }}
            >
                {icon}
            </span>
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                {label}
            </span>
        </a>
    );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
    const { auth } = usePage<{ auth: { user: { name: string; roles?: string[] } } }>().props;
    const user = auth?.user;
    const isSeller = user?.roles?.includes('Seller') || true; // default show seller view
    const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4 md:p-6">

                {/* ── Welcome Banner ── */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg dark:from-slate-800 dark:to-slate-900">
                    <div className="absolute right-0 top-0 h-full w-1/3 opacity-10"
                        style={{
                            background: 'radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 70%)',
                        }}
                    />
                    <p className="text-sm font-medium text-slate-400">{greeting} 👋</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight">
                        {user?.name ?? 'Welcome back'}
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Here's what's happening with your listings today.
                    </p>
                </div>

                {/* ── Stats Grid ── */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard label="Active Listings" value="12" sub="3 pending approval" icon="📋" accent="#3b82f6" />
                    <StatCard label="Total Views" value="1,284" sub="+18% this week" icon="👁️" accent="#10b981" />
                    <StatCard label="Enquiries" value="34" sub="7 new today" icon="💬" accent="#f59e0b" />
                    <StatCard label="Revenue" value="KES 0" sub="No sales yet" icon="💰" accent="#8b5cf6" />
                </div>

                {/* ── Main Content: Recent Listings + Quick Actions ── */}
                <div className="grid gap-6 md:grid-cols-3">

                    {/* Recent Listings */}
                    <div className="md:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-semibold text-neutral-800 dark:text-neutral-100">
                                Recent Listings
                            </h2>
                            <a
                                href="/listings"
                                className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                            >
                                View all →
                            </a>
                        </div>
                        <ActivityRow title="3-Bed House, Kilimani" category="House" time="2h ago" status="active" />
                        <ActivityRow title="Toyota Prado 2021" category="Car" time="1d ago" status="active" />
                        <ActivityRow title="1/4 Acre Plot, Ruiru" category="Plot" time="3d ago" status="pending" />
                        <ActivityRow title="Cozy BnB Suite, Westlands" category="BnB" time="5d ago" status="active" />
                        <ActivityRow title="Nissan Note 2019" category="Car" time="1w ago" status="sold" />

                        {isSeller && (
                            <a
                                href="/listings/create"
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                <span>+</span> Add New Listing
                            </a>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-4">
                        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            <h2 className="mb-4 font-semibold text-neutral-800 dark:text-neutral-100">
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                <QuickAction icon="🏠" label="Add House" href="/listings/create?category=house" color="#3b82f6" />
                                <QuickAction icon="🚗" label="Add Car" href="/listings/create?category=car" color="#10b981" />
                                <QuickAction icon="🌍" label="Add Plot" href="/listings/create?category=plot" color="#f59e0b" />
                                <QuickAction icon="🏨" label="Add BnB" href="/listings/create?category=bnb" color="#8b5cf6" />
                            </div>
                        </div>

                        {/* Profile Completion */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            <h2 className="mb-1 font-semibold text-neutral-800 dark:text-neutral-100">
                                Profile Strength
                            </h2>
                            <p className="mb-3 text-xs text-neutral-400">Complete your profile to get more enquiries</p>
                            <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all"
                                    style={{ width: '60%' }}
                                />
                            </div>
                            <p className="text-xs text-neutral-500">60% complete</p>
                            <a
                                href="/settings/profile"
                                className="mt-3 block w-full rounded-xl border border-neutral-200 py-2 text-center text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                            >
                                Complete Profile
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── Category Browse ── */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <h2 className="mb-4 font-semibold text-neutral-800 dark:text-neutral-100">
                        Browse Marketplace
                    </h2>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                        {[
                            { icon: '🏠', label: 'Houses', count: '248', color: '#3b82f6' },
                            { icon: '🚗', label: 'Cars for Sale', count: '192', color: '#10b981' },
                            { icon: '🌍', label: 'Plots & Land', count: '87', color: '#f59e0b' },
                            { icon: '🏨', label: 'BnB Rentals', count: '54', color: '#ec4899' },
                            { icon: '🔑', label: 'Car Hire', count: '31', color: '#8b5cf6' },
                        ].map((cat) => (
                            <a
                                key={cat.label}
                                href={`/listings?category=${cat.label.toLowerCase()}`}
                                className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-100 p-4 text-center transition hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:hover:border-neutral-700"
                            >
                                <span
                                    className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                                    style={{ background: cat.color + '15' }}
                                >
                                    {cat.icon}
                                </span>
                                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                    {cat.label}
                                </span>
                                <span className="text-xs text-neutral-400">{cat.count} listings</span>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
