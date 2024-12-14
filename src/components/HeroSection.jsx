import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center text-center py-20 bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <h1 className="text-5xl font-bold mb-6">Learn Anytime, Anywhere</h1>
      <p className="text-lg mb-8">
        Join our community of learners and start building your skills today!
      </p>
      <Button size="lg" variant="default">
        Get Started
      </Button>
    </div>
  );
};

export default HeroSection;
