import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';

interface Listing {
    id: number;
    title: string;
    description: string;
    price: string;
    type: 'sale' | 'rent';
    location: string;
    is_active: boolean;
    is_featured: boolean;
    attributes: Record<string, string>;
    category: { id: number; name: string; slug: string };
    images: { id: number; path: string }[];
    user: { id: number; name: string; email: string };
    created_at: string;
}

const ATTR_ICONS: Record<string, string> = {
    bedrooms: 'bed', bathrooms: 'bathroom', size_sqft: 'square_foot',
    size_acres: 'landscape', make: 'directions_car', model: 'directions_car',
    year: 'calendar_today', mileage: 'speed', engine: 'engineering',
    rooms: 'meeting_room', amenities: 'star', title_deed: 'description',
    seats: 'event_seat', price_per_day: 'payments',
};

export default function ShowListing({ listing }: { listing: Listing }) {
    const [activeImg, setActiveImg] = useState(0);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Listings', href: '/listings' },
        { title: listing.title, href: '#' },
    ];

    const attrs = Object.entries(listing.attributes ?? {}).filter(([, v]) => v);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={listing.title} />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />

            <div className="p-4 md:p-6 space-y-5">

                {/* Header bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Link href="/listings" className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                            <span className="material-icons-round">arrow_back</span>
                        </Link>
                        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{listing.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={`/listings/${listing.id}/edit`}
                            className="flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3.5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            <span className="material-icons-round text-base">edit</span> Edit
                        </Link>
                        <button
                            onClick={() => {
                                if (confirm('Delete this listing?')) router.delete(`/listings/${listing.id}`);
                            }}
                            className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                        >
                            <span className="material-icons-round text-base">delete</span> Delete
                        </button>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">

                    {/* Left: Images + Details */}
                    <div className="md:col-span-2 space-y-4">

                        {/* Image gallery */}
                        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
                            {listing.images.length > 0 ? (
                                <>
                                    <div className="aspect-video w-full overflow-hidden">
                                        <img
                                            src={`/storage/${listing.images[activeImg]?.path}`}
                                            className="h-full w-full object-cover"
                                            alt={listing.title}
                                        />
                                    </div>
                                    {listing.images.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto p-3">
                                            {listing.images.map((img, i) => (
                                                <button
                                                    key={img.id}
                                                    onClick={() => setActiveImg(i)}
                                                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${i === activeImg ? 'border-blue-500' : 'border-transparent'}`}
                                                >
                                                    <img src={`/storage/${img.path}`} className="h-full w-full object-cover" alt="" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex aspect-video items-center justify-center text-neutral-400">
                                    <div className="text-center">
                                        <span className="material-icons-round text-6xl">image_not_supported</span>
                                        <p className="mt-2 text-sm">No images uploaded</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                            <h2 className="mb-3 flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200">
                                <span className="material-icons-round text-neutral-400">description</span>
                                Description
                            </h2>
                            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                                {listing.description}
                            </p>
                        </div>

                        {/* Attributes */}
                        {attrs.length > 0 && (
                            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                                <h2 className="mb-3 flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200">
                                    <span className="material-icons-round text-neutral-400">tune</span>
                                    Details
                                </h2>
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                                    {attrs.map(([key, value]) => (
                                        <div key={key} className="rounded-xl bg-neutral-50 p-3 dark:bg-neutral-800">
                                            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-400">
                                                <span className="material-icons-round text-sm">{ATTR_ICONS[key] ?? 'info'}</span>
                                                {key.replace(/_/g, ' ')}
                                            </div>
                                            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Summary card */}
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">

                            {/* Price */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Price</p>
                                <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                                    KES {Number(listing.price).toLocaleString()}
                                </p>
                                <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    listing.type === 'sale'
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                }`}>
                                    {listing.type === 'sale' ? 'For Sale' : 'For Rent'}
                                </span>
                            </div>

                            <hr className="border-neutral-100 dark:border-neutral-800" />

                            {/* Meta */}
                            <div className="space-y-2.5 text-sm">
                                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                    <span className="material-icons-round text-base text-neutral-400">category</span>
                                    <span>{listing.category?.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                    <span className="material-icons-round text-base text-neutral-400">location_on</span>
                                    <span>{listing.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                    <span className="material-icons-round text-base text-neutral-400">person</span>
                                    <span>{listing.user?.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                                    <span className="material-icons-round text-base text-neutral-400">calendar_today</span>
                                    <span>{new Date(listing.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <hr className="border-neutral-100 dark:border-neutral-800" />

                            {/* Status badge */}
                            <div className={`flex items-center gap-2 rounded-xl p-3 ${
                                listing.is_active
                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                    : 'bg-neutral-50 text-neutral-500 dark:bg-neutral-800'
                            }`}>
                                <span className="material-icons-round text-base">
                                    {listing.is_active ? 'visibility' : 'visibility_off'}
                                </span>
                                <span className="text-sm font-medium">
                                    {listing.is_active ? 'Live on marketplace' : 'Hidden from marketplace'}
                                </span>
                            </div>

                            <Link
                                href={`/listings/${listing.id}/edit`}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                <span className="material-icons-round text-base">edit</span>
                                Edit Listing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
