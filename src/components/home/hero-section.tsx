
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
            <Link href="/episodes">Browse All Episodes</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-accent/20 transition-shadow">
            <Link href="/#series">Explore Series</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

