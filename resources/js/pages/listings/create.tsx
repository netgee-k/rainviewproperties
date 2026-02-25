import { ListingForm } from './_form';

interface Category { id: number; name: string; slug: string; }

export default function CreateListing({ categories }: { categories: Category[] }) {
    return <ListingForm categories={categories} mode="create" />;
}
