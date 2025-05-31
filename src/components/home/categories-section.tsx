
import type { Category } from '@/types';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return <p>No categories available.</p>;
  }

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-6 px-4 md:px-0 font-headline">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-0">
        {categories.map((category) => (
          <Link href={`/category/${category.id}`} key={category.id} legacyBehavior>
            <a className="block group">
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {category.imageUrl && (
                  <div className="relative w-full aspect-square"> {/* Ensure square aspect ratio */}
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                      data-ai-hint={category.dataAiHint || "category abstract"}
                    />
                  </div>
                )}
                <CardHeader className={cn("flex-grow", category.imageUrl ? "p-4" : "p-6")}>
                  <CardTitle className="text-base md:text-lg flex items-center">
                    {category.icon && <category.icon className="mr-2 h-5 w-5 text-primary" />}
                    {category.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
