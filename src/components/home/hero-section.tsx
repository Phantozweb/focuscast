
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground font-headline">
          FocusCast
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Optometry Insights, Clearly Delivered.
        </p>
        <div className="max-w-xl mx-auto">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="search"
              placeholder="Search episodes, series..."
              className="flex-1 h-12 text-base md:text-lg"
              aria-label="Search episodes and series"
            />
            <Button type="submit" size="lg" className="h-12" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            nothing to see here
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
