import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 mt-auto border-t border-border/40 bg-background">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>
          Powered by{' '}
          <Link
            href="https://focus-in.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            Focus-IN
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
