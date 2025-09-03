import { HeroText } from "@/components/hero-text";
import { PromptRotator } from "@/components/prompt-rotator";
import { WaitlistForm } from "@/components/waitlist-form";
import { ItineraryCard } from "@/components/itinerary-card";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-muted/20 via-background to-background overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='1' seed='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_0%_100%,rgba(34,197,94,0.3),rgba(255,255,255,0))]" />

      {/* Itinerary card positioned in background */}
      <div className="hidden lg:block absolute left-8 top-1/2 transform -translate-y-1/2">
        <ItineraryCard />
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Hero text with logo */}
          <HeroText />

          {/* Animated prompt input */}
          <div className="mt-16 mb-12">
            <PromptRotator />
          </div>

          {/* CTA button */}
          <WaitlistForm />

          {/* Social proof */}
          <div className="mt-8 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-green-100 border-2 border-background rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-green-700">
                      M
                    </span>
                  </div>
                  <div className="w-6 h-6 bg-blue-100 border-2 border-background rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-700">A</span>
                  </div>
                  <div className="w-6 h-6 bg-purple-100 border-2 border-background rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-700">
                      S
                    </span>
                  </div>
                  <div className="w-6 h-6 bg-orange-100 border-2 border-background rounded-full flex items-center justify-center">
                    <span className="text-xs text-orange-700">+</span>
                  </div>
                </div>
                <span className="ml-2 font-medium">
                  Join 200+ members already on the waitlist
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground/70">
              🔒 We respect your privacy. Unsubscribe anytime.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile itinerary card */}
      <div className="lg:hidden fixed bottom-4 right-4 z-10">
        <div className="w-64 scale-75 origin-bottom-right">
          <ItineraryCard />
        </div>
      </div>
    </div>
  );
}
