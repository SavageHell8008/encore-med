import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FilterBar } from "@/components/product/FilterBar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllProducts } from "@/data/products";
import { getCategory, getUseCase } from "@/data/taxonomy";
import { generateItemListSchema } from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import type { Product } from "@/lib/types";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const category = first(params.category);
  const need = first(params.need);
  const intent = first(params.intent);
  const sort = first(params.sort);

  const isFiltered = Boolean(category || need || intent || sort);

  return buildMetadata({
    title: "All Medical Equipment — Rent or Buy in Delhi",
    description:
      "Every item Encore Care rents and sells in Delhi — hospital beds, oxygen, BiPAP, monitors, pumps and mobility. Filter by equipment type or by what the patient is struggling with, and ask for a quote.",
    path: "/products",
    // Filtered permutations are thin duplicates of this page. They stay
    // crawlable (follow) so link equity flows to the products, but out of the
    // index so they cannot compete with the curated category pages.
    index: !isFiltered,
  });
}

/** Price sorts are gone with the prices — there is nothing to sort on. */
function sortProducts(products: Product[], sort?: string): Product[] {
  switch (sort) {
    case "name":
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return [...products].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    default:
      // Default order puts the most-rented items first.
      return [...products].sort(
        (a, b) => Number(b.badges.includes("bestseller")) - Number(a.badges.includes("bestseller")),
      );
  }
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const filters = {
    category: first(params.category),
    need: first(params.need),
    intent: first(params.intent),
    sort: first(params.sort),
  };

  let products = getAllProducts();

  if (filters.category) {
    products = products.filter((p) => p.categorySlug === filters.category);
  }
  if (filters.need) {
    products = products.filter((p) => p.useCaseSlugs.includes(filters.need!));
  }
  if (filters.intent === "rent") {
    products = products.filter((p) => p.offerMode === "rent-or-buy");
  }
  if (filters.intent === "sale-only") {
    products = products.filter((p) => p.offerMode === "buy-only");
  }

  products = sortProducts(products, filters.sort);

  const activeCategory = filters.category ? getCategory(filters.category) : undefined;
  const activeNeed = filters.need ? getUseCase(filters.need) : undefined;

  return (
    <>
      <JsonLd
        schema={generateItemListSchema(
          products.map((p) => ({ name: p.name, href: `/products/${p.slug}` })),
          "Encore Care medical equipment",
        )}
      />

      <Container className="pt-10">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Equipment", href: "/products" },
          ]}
        />

        <div className="mt-8">
          <SectionHeading
            eyebrow={`${products.length} item${products.length === 1 ? "" : "s"}`}
            title={
              activeCategory
                ? activeCategory.headline
                : activeNeed
                  ? `Equipment for: ${activeNeed.name.toLowerCase()}`
                  : "Every item we rent and sell"
            }
            description={
              activeCategory?.description ??
              activeNeed?.description ??
              "Everything here can be bought; the items marked on rent are also stocked on the rental fleet. Tell us what you need and how long for, and we will quote for it."
            }
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <FilterBar filters={filters} />
          </aside>

          <div>
            <ProductGrid products={products} priorityCount={3} className="lg:grid-cols-2 xl:grid-cols-3" />
          </div>
        </div>
      </Container>

      <div className="h-24" />
    </>
  );
}
