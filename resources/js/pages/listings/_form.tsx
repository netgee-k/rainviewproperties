import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { FormEvent, useRef, useState } from 'react';

interface Category { id: number; name: string; slug: string; }
interface Listing {
    id?: number;
    category_id?: number;
    title?: string;
    description?: string;
    price?: string;
    type?: 'sale' | 'rent';
    location?: string;
    attributes?: Record<string, string>;
    is_active?: boolean;
    images?: { id: number; path: string }[];
}

// ── Dynamic attribute fields per category ────────────────────────────────────
const CATEGORY_ATTRIBUTES: Record<string, { key: string; label: string; placeholder: string }[]> = {
    houses: [
        { key: 'bedrooms',  label: 'Bedrooms',  placeholder: 'e.g. 3' },
        { key: 'bathrooms', label: 'Bathrooms', placeholder: 'e.g. 2' },
        { key: 'size_sqft', label: 'Size (sqft)', placeholder: 'e.g. 1500' },
    ],
    cars: [
        { key: 'make',     label: 'Make',     placeholder: 'e.g. Toyota' },
        { key: 'model',    label: 'Model',    placeholder: 'e.g. Prado' },
        { key: 'year',     label: 'Year',     placeholder: 'e.g. 2021' },
        { key: 'mileage',  label: 'Mileage',  placeholder: 'e.g. 45000 km' },
        { key: 'engine',   label: 'Engine',   placeholder: 'e.g. 2.8L Diesel' },
    ],
    plots: [
        { key: 'size_acres', label: 'Size (acres)', placeholder: 'e.g. 0.25' },
        { key: 'title_deed', label: 'Title Deed',   placeholder: 'e.g. Freehold' },
    ],
    bnb: [
        { key: 'rooms',    label: 'Rooms',    placeholder: 'e.g. 2' },
        { key: 'amenities',label: 'Amenities',placeholder: 'e.g. WiFi, Pool, Parking' },
    ],
    'car-hire': [
        { key: 'make',        label: 'Make',          placeholder: 'e.g. Toyota' },
        { key: 'model',       label: 'Model',         placeholder: 'e.g. Land Cruiser' },
        { key: 'seats',       label: 'Seats',         placeholder: 'e.g. 7' },
        { key: 'price_per_day', label: 'Price/Day (KES)', placeholder: 'e.g. 5000' },
    ],
};

function FormField({ label, error, icon, children }: {
    label: string; error?: string; icon: string; children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <span className="material-icons-round text-base text-neutral-400">{icon}</span>
                {label}
            </label>
            {children}
            {error && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                    <span className="material-icons-round text-xs">error</span>{error}
                </p>
            )}
        </div>
    );
}

const inputClass = "w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-blue-500 dark:focus:ring-blue-900/30";

export function ListingForm({
    categories,
    listing,
    mode,
}: {
    categories: Category[];
    listing?: Listing;
    mode: 'create' | 'edit';
}) {
    const isEdit = mode === 'edit';

    const { data, setData, post, put, processing, errors } = useForm({
        category_id:  listing?.category_id ?? '',
        title:        listing?.title ?? '',
        description:  listing?.description ?? '',
        price:        listing?.price ?? '',
        type:         listing?.type ?? 'sale',
        location:     listing?.location ?? '',
        attributes:   listing?.attributes ?? {},
        is_active:    listing?.is_active ?? true,
        images:       [] as File[],
    });

    const fileRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<string[]>([]);

    const selectedCategory = categories.find(c => c.id === Number(data.category_id));
    const attrFields = selectedCategory ? (CATEGORY_ATTRIBUTES[selectedCategory.slug] ?? []) : [];

    function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files ?? []);
        setData('images', files);
        setPreviews(files.map(f => URL.createObjectURL(f)));
    }

    function handleAttr(key: string, value: string) {
        setData('attributes', { ...(data.attributes as Record<string, string>), [key]: value });
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        if (isEdit && listing?.id) {
            post(`/listings/${listing.id}?_method=PUT`, { forceFormData: true });
        } else {
            post('/listings', { forceFormData: true });
        }
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Listings', href: '/listings' },
        { title: isEdit ? 'Edit Listing' : 'New Listing', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Listing' : 'New Listing'} />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />

            <div className="p-4 md:p-6">
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="mx-auto max-w-3xl space-y-5">

                        {/* Header */}
                        <div className="flex items-center gap-4">
                            <Link href="/listings" className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                                <span className="material-icons-round">arrow_back</span>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                                    {isEdit ? 'Edit Listing' : 'Create New Listing'}
                                </h1>
                                <p className="text-sm text-neutral-500">Fill in the details below</p>
                            </div>
                        </div>

                        {/* Card: Basic Info */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
                            <h2 className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200">
                                <span className="material-icons-round text-blue-500">info</span>
                                Basic Information
                            </h2>

                            {/* Category */}
                            <FormField label="Category" error={errors.category_id} icon="category">
                                <select
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Select a category...</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </FormField>

                            {/* Title */}
                            <FormField label="Title" error={errors.title} icon="title">
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="e.g. 3-Bedroom House in Kilimani"
                                    className={inputClass}
                                />
                            </FormField>

                            {/* Description */}
                            <FormField label="Description" error={errors.description} icon="description">
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Describe the property in detail..."
                                    rows={4}
                                    className={inputClass + ' resize-none'}
                                />
                            </FormField>

                            {/* Price + Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField label="Price (KES)" error={errors.price} icon="payments">
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        placeholder="e.g. 5000000"
                                        className={inputClass}
                                    />
                                </FormField>
                                <FormField label="Listing Type" error={errors.type} icon="sell">
                                    <select
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value as 'sale' | 'rent')}
                                        className={inputClass}
                                    >
                                        <option value="sale">For Sale</option>
                                        <option value="rent">For Rent</option>
                                    </select>
                                </FormField>
                            </div>

                            {/* Location */}
                            <FormField label="Location" error={errors.location} icon="location_on">
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                    placeholder="e.g. Kilimani, Nairobi"
                                    className={inputClass}
                                />
                            </FormField>
                        </div>

                        {/* Card: Dynamic Attributes */}
                        {attrFields.length > 0 && (
                            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
                                <h2 className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200">
                                    <span className="material-icons-round text-amber-500">tune</span>
                                    {selectedCategory?.name} Details
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {attrFields.map(field => (
                                        <FormField key={field.key} label={field.label} icon="edit_note">
                                            <input
                                                type="text"
                                                value={(data.attributes as Record<string, string>)[field.key] ?? ''}
                                                onChange={e => handleAttr(field.key, e.target.value)}
                                                placeholder={field.placeholder}
                                                className={inputClass}
                                            />
                                        </FormField>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Card: Images */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
                            <h2 className="flex items-center gap-2 font-semibold text-neutral-800 dark:text-neutral-200">
                                <span className="material-icons-round text-emerald-500">photo_library</span>
                                Images
                            </h2>

                            {/* Existing images (edit mode) */}
                            {isEdit && listing?.images && listing.images.length > 0 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {listing.images.map(img => (
                                        <div key={img.id} className="relative aspect-square overflow-hidden rounded-xl">
                                            <img src={`/storage/${img.path}`} className="h-full w-full object-cover" alt="" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* New image previews */}
                            {previews.length > 0 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {previews.map((src, i) => (
                                        <div key={i} className="relative aspect-square overflow-hidden rounded-xl border-2 border-blue-300">
                                            <img src={src} className="h-full w-full object-cover" alt="" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Upload zone */}
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 py-8 text-neutral-400 transition hover:border-blue-400 hover:text-blue-500 dark:border-neutral-700"
                            >
                                <span className="material-icons-round text-4xl">cloud_upload</span>
                                <span className="text-sm font-medium">Click to upload images</span>
                                <span className="text-xs">PNG, JPG up to 5MB each</span>
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImages}
                                className="hidden"
                            />
                        </div>

                        {/* Card: Settings */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                            <label className="flex cursor-pointer items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons-round text-neutral-400">toggle_on</span>
                                    <div>
                                        <p className="font-medium text-neutral-800 dark:text-neutral-200">Active Listing</p>
                                        <p className="text-xs text-neutral-400">Visible to buyers on the marketplace</p>
                                    </div>
                                </div>
                                <div
                                    onClick={() => setData('is_active', !data.is_active)}
                                    className={`relative h-6 w-11 rounded-full transition ${data.is_active ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                                >
                                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${data.is_active ? 'translate-x-5' : ''}`} />
                                </div>
                            </label>
                        </div>

                        {/* Submit */}
                        <div className="flex items-center justify-end gap-3">
                            <Link href="/listings" className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                            >
                                <span className="material-icons-round text-lg">
                                    {processing ? 'hourglass_empty' : isEdit ? 'save' : 'add_circle'}
                                </span>
                                {processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Listing'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
