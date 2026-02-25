import { ListingForm } from './_form';

interface Category { id: number; name: string; slug: string; }
interface Listing {
    id: number;
    category_id: number;
    title: string;
    description: string;
    price: string;
    type: 'sale' | 'rent';
    location: string;
    attributes: Record<string, string>;
    is_active: boolean;
    images: { id: number; path: string }[];
}

export default function EditListing({
    listing,
    categories,
}: {
    listing: Listing;
    categories: Category[];
}) {
    return <ListingForm categories={categories} listing={listing} mode="edit" />;
}
