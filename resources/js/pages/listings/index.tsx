import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface ListingImage { id: number; path: string; }
interface Category { id: number; name: string; slug: string; }
interface Listing {
    id: number;
    title: string;
    price: string;
    type: 'sale' | 'rent';
    location: string;
    is_active: boolean;
    is_featured: boolean;
    category: Category;
    images: ListingImage[];
    created_at: string;
}
interface Paginated<T> { data: T[]; current_page: number; last_page: number; total: number; }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'My Listings', href: '/listings' },
];

const CATEGORY_ICONS: Record<string, string> = {
    houses: '🏠', cars: '🚗', plots: '🌍', bnb: '🏨', 'car-hire': '🔑',
};

export default function ListingsIndex({ listings }: { listings: Paginated<Listing> }) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;

    function handleDelete(id: number) {
        if (!confirm('Delete this listing? This cannot be undone.')) return;
        router.delete(`/listings/${id}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Listings" />

            {/* Material Icons CDN */}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />

            <div className="p-4 md:p-6 space-y-5">

                {/* Flash */}
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400">
                        <span className="material-icons-round text-lg">check_circle</span>
                        {flash.success}
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">My Listings</h1>
                        <p className="text-sm text-neutral-500">{listings.total} total listings</p>
                    </div>
                    <Link
                        href="/listings/create"
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 shadow-sm"
                    >
                        <span className="material-icons-round text-lg">add</span>
                        New Listing
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    {listings.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-16 text-neutral-400">
                            <span className="material-icons-round text-5xl">inbox</span>
                            <p className="text-sm">No listings yet. Create your first one!</p>
                            <Link href="/listings/create" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                Add Listing
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/50">
                                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Listing</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Category</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Price</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Type</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Status</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {listings.data.map((listing) => (
                                        <tr key={listing.id} className="transition hover:bg-neutral-50 dark:hover:bg-neutral-800/30">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {/* Thumbnail */}
                                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-2xl">
                                                        {listing.images?.[0]
                                                            ? <img src={`/storage/${listing.images[0].path}`} className="h-full w-full object-cover" alt="" />
                                                            : CATEGORY_ICONS[listing.category?.slug] ?? '📋'
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-neutral-800 dark:text-neutral-200">{listing.title}</p>
                                                        <p className="flex items-center gap-1 text-xs text-neutral-400">
                                                            <span className="material-icons-round text-xs">location_on</span>
                                                            {listing.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                                    {listing.category?.name}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 font-semibold text-neutral-800 dark:text-neutral-200">
                                                KES {Number(listing.price).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                    listing.type === 'sale'
                                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                                }`}>
                                                    {listing.type === 'sale' ? 'For Sale' : 'For Rent'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                    listing.is_active
                                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                        : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                                                }`}>
                                                    <span className="material-icons-round text-xs">
                                                        {listing.is_active ? 'visibility' : 'visibility_off'}
                                                    </span>
                                                    {listing.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={`/listings/${listing.id}`}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
                                                        title="View"
                                                    >
                                                        <span className="material-icons-round text-lg">visibility</span>
                                                    </Link>
                                                    <Link
                                                        href={`/listings/${listing.id}/edit`}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                                                        title="Edit"
                                                    >
                                                        <span className="material-icons-round text-lg">edit</span>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(listing.id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                                        title="Delete"
                                                    >
                                                        <span className="material-icons-round text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {listings.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                        <span>Page {listings.current_page} of {listings.last_page}</span>
                        <div className="flex gap-2">
                            {listings.current_page > 1 && (
                                <Link href={`/listings?page=${listings.current_page - 1}`}
                                    className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                                    <span className="material-icons-round text-sm">chevron_left</span> Prev
                                </Link>
                            )}
                            {listings.current_page < listings.last_page && (
                                <Link href={`/listings?page=${listings.current_page + 1}`}
                                    className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                                    Next <span className="material-icons-round text-sm">chevron_right</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
