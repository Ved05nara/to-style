import { Button } from "@/components/ui/button";
import { Hotel } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Hotel className="h-16 w-16 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link to="/">
          <Button size="lg">
            Return Home
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;