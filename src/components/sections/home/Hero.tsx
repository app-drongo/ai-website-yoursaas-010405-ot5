'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, CheckCircle, Zap, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Streamline Your Business Operations',
  subtitle: 'Intelligent Automation & Analytics',
  description:
    'Transform your workflow with AI-powered automation that reduces manual tasks by 80% and provides real-time insights to drive growth.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  badgeText: 'Trusted by 10,000+ businesses',
  heroImageUrl:
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
  heroImageAlt: 'Modern business dashboard with analytics',
  features: [
    '80% reduction in manual tasks',
    'Real-time analytics dashboard',
    'Enterprise-grade security',
  ],
  stats: [
    { label: 'Active Users', value: '50K+' },
    { label: 'Time Saved', value: '2M hrs' },
    { label: 'Uptime', value: '99.9%' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % config.stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.stats.length]);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Badge */}
            <div className="flex justify-start">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 px-4 py-2"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                <span data-editable="badgeText">{config.badgeText}</span>
              </Badge>
            </div>

            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span data-editable="title">{config.title}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl text-primary font-semibold">
                <span data-editable="subtitle">{config.subtitle}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                <span data-editable="description">{config.description}</span>
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span data-editable={`features[${idx}]`} className="text-foreground font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {config.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`text-center transition-all duration-500 ${
                    currentStat === idx ? 'scale-105 text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div className="text-2xl font-bold" data-editable={`stats[${idx}].value`}>
                    {stat.value}
                  </div>
                  <div className="text-sm" data-editable={`stats[${idx}].label`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <Card className="bg-card border-border shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />

                  {/* Floating Elements */}
                  <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">Live Analytics</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">Performance Up 40%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
