'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, BarChart3, Users, Clock, Workflow } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Powerful Features for Modern Business',
  subtitle: 'Everything you need to streamline operations and accelerate growth',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  features: [
    {
      icon: 'Zap',
      title: 'Intelligent Automation',
      description:
        'Automate repetitive tasks with AI-powered workflows that adapt to your business needs',
      badge: 'Popular',
    },
    {
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description:
        'Get deep insights with real-time dashboards and predictive analytics to make data-driven decisions',
      badge: 'New',
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description:
        'Bank-grade security with end-to-end encryption, SSO, and compliance certifications',
      badge: '',
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description:
        'Seamless collaboration tools with real-time sync, comments, and role-based permissions',
      badge: '',
    },
    {
      icon: 'Clock',
      title: '24/7 Monitoring',
      description: 'Continuous system monitoring with instant alerts and 99.9% uptime guarantee',
      badge: '',
    },
    {
      icon: 'Workflow',
      title: 'Custom Integrations',
      description:
        'Connect with 500+ apps or build custom integrations with our powerful API platform',
      badge: 'Beta',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const icons = {
      Zap,
      Shield,
      BarChart3,
      Users,
      Clock,
      Workflow,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Zap;
    return <IconComponent className="h-8 w-8 text-primary" />;
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="features" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <Button
            size="lg"
            onClick={handleCTAClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90 group"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">{getIcon(feature.icon)}</div>
                  {feature.badge && (
                    <Badge
                      variant={feature.badge === 'Popular' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted text-muted-foreground rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to transform your business?
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of companies already using our platform to streamline operations and
              drive growth.
            </p>
            <Button
              size="lg"
              onClick={handleCTAClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
