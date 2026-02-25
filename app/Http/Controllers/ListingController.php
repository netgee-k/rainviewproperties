<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ListingController extends Controller
{
    // ── Index: all listings for the logged-in seller ──────────────────────────
    public function index(): Response
    {
        $listings = Listing::with(['category', 'images'])
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('listings/index', [
            'listings' => $listings,
        ]);
    }

    // ── Create form ───────────────────────────────────────────────────────────
    public function create(): Response
    {
        return Inertia::render('listings/create', [
            'categories' => Category::all(['id', 'name', 'slug']),
        ]);
    }

    // ── Store new listing ─────────────────────────────────────────────────────
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id'  => 'required|exists:categories,id',
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'price'        => 'required|numeric|min:0',
            'type'         => 'required|in:sale,rent',
            'location'     => 'required|string|max:255',
            'attributes'   => 'nullable|array',
            'images.*'     => 'nullable|image|max:5120',
        ]);

        $listing = Listing::create([
            ...$data,
            'user_id'    => Auth::id(),
            'attributes' => $data['attributes'] ?? [],
        ]);

        // Handle image uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $i => $image) {
                $path = $image->store('listings', 'public');
                $listing->images()->create(['path' => $path, 'order' => $i]);
            }
        }

        return redirect()->route('listings.index')
            ->with('success', 'Listing created successfully!');
    }

    // ── Show single listing ───────────────────────────────────────────────────
    public function show(Listing $listing): Response
    {
        $listing->load(['category', 'images', 'user']);

        return Inertia::render('listings/show', [
            'listing' => $listing,
        ]);
    }

    // ── Edit form ─────────────────────────────────────────────────────────────
    public function edit(Listing $listing): Response
    {
        $this->authorize('update', $listing);

        $listing->load(['category', 'images']);

        return Inertia::render('listings/edit', [
            'listing'    => $listing,
            'categories' => Category::all(['id', 'name', 'slug']),
        ]);
    }

    // ── Update listing ────────────────────────────────────────────────────────
    public function update(Request $request, Listing $listing)
    {
        $this->authorize('update', $listing);

        $data = $request->validate([
            'category_id'  => 'required|exists:categories,id',
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'price'        => 'required|numeric|min:0',
            'type'         => 'required|in:sale,rent',
            'location'     => 'required|string|max:255',
            'attributes'   => 'nullable|array',
            'images.*'     => 'nullable|image|max:5120',
        ]);

        $listing->update($data);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $i => $image) {
                $path = $image->store('listings', 'public');
                $listing->images()->create([
                    'path'  => $path,
                    'order' => $listing->images()->count() + $i,
                ]);
            }
        }

        return redirect()->route('listings.index')
            ->with('success', 'Listing updated successfully!');
    }

    // ── Delete listing ────────────────────────────────────────────────────────
    public function destroy(Listing $listing)
    {
        $this->authorize('delete', $listing);

        // Delete images from storage
        foreach ($listing->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $listing->delete();

        return redirect()->route('listings.index')
            ->with('success', 'Listing deleted.');
    }
}
