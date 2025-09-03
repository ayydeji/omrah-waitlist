"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

// Form validation schema
const waitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export function WaitlistForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      // Success
      toast.success("Welcome to the waitlist!", {
        description:
          "We'll notify you when Omrah launches. Get ready for a spiritual journey! ✨",
        duration: 5000,
      });

      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Waitlist submission error:", error);
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly.",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="px-12 py-6 text-lg font-medium bg-background hover:bg-primary/90 hover:text-primary-foreground
                       text-foreground rounded-full border-2 border-black hover:border-border/50 
                       transition-all duration-300 transform hover:-translate-y-0.5 hover:cursor-pointer"
          >
            Join the waitlist
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-background border-2 border-black rounded-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold text-foreground text-center">
            Join the Omrah waitlist
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center">
            Be the first to experience AI-powered Umrah planning. We'll notify
            you when we launch.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  {...register("firstName")}
                  type="text"
                  placeholder="First name"
                  className="h-12 text-base border-2 border-black rounded-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive text-center mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Input
                  {...register("lastName")}
                  type="text"
                  placeholder="Last name"
                  className="h-12 text-base border-2 border-black rounded-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive text-center mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className="h-12 text-base border-2 border-black rounded-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive text-center mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-background text-foreground border-2 border-black hover:bg-foreground hover:text-background rounded-full transition-all duration-300 hover:cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Joining waitlist...
                </>
              ) : (
                "Join waitlist"
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </DialogContent>
    </Dialog>
  );
}
