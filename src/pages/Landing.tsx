import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Hotel,
  Calendar,
  Users,
  MessageCircle,
  BarChart3,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/hotel-hero.jpg";
import roomImage from "@/assets/hotel-room.jpg";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Smart Booking System",
      description: "Seamless room reservations with real-time availability and instant confirmations."
    },
    {
      icon: Users,
      title: "Staff Management",
      description: "Efficient task assignment and team coordination for optimal hotel operations."
    },
    {
      icon: MessageCircle,
      title: "Guest Communication",
      description: "Direct messaging between guests and staff for personalized service."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and reporting for data-driven decision making."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe and encrypted payment processing with multiple gateway options."
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description: "Round-the-clock system availability for uninterrupted hotel management."
    }
  ];

  const benefits = [
    "Replace 8+ legacy systems with one unified platform",
    "Reduce manual processes by 70% through automation",
    "Improve guest satisfaction with personalized experiences",
    "Increase operational efficiency with real-time analytics",
    "Cut administrative overhead by 40%"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Hotel Lobby"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-luxury bg-clip-text text-transparent">
                GuestHub
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
              The next-generation Hotel Management System that transforms hospitality operations 
              with intelligent automation and seamless guest experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="xl"
                variant="luxury"
                onClick={() => navigate('/auth/register')}
                className="shadow-luxury"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => navigate('/auth/login')}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Powerful Features for Modern Hotels
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to manage your hotel operations efficiently and deliver 
              exceptional guest experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-luxury rounded-2xl mb-4">
                    <feature.icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Transform Your Hotel Operations
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-lg text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                variant="hotel"
                className="mt-8"
                onClick={() => navigate('/auth/register')}
              >
                Get Started Today
              </Button>
            </div>
            <div className="relative">
              <img
                src={roomImage}
                alt="Elegant Hotel Room"
                className="rounded-2xl shadow-strong w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-medium border">
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-secondary fill-secondary" />
                  <div>
                    <p className="font-semibold">Premium Experience</p>
                    <p className="text-sm text-muted-foreground">5-star service guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Hotel className="h-16 w-16 mx-auto mb-6 text-secondary" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Revolutionize Your Hotel?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join thousands of hotels worldwide that trust GuestHub to deliver 
              exceptional hospitality experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                variant="luxury"
                onClick={() => navigate('/auth/register')}
                className="shadow-luxury"
              >
                Start Free Trial
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}