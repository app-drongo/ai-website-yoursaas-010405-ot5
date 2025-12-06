'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Choose Your Plan',
  subtitle: "Scale your SaaS with confidence. Start free, upgrade when you're ready.",
  billingToggleText: 'Annual billing (save 20%)',
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      currency: '$',
      period: 'month',
      popular: false,
      features: ['Up to 3 projects', '5GB storage', 'Basic analytics', 'Email support'],
      ctaText: 'Get Started Free',
      ctaHref: '/signup',
    },
    {
      name: 'Professional',
      description: 'Ideal for growing teams and businesses',
      monthlyPrice: 29,
      yearlyPrice: 23,
      currency: '$',
      period: 'month',
      popular: true,
      features: [
        'Unlimited projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Team collaboration',
        'API access',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=pro',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      monthlyPrice: 99,
      yearlyPrice: 79,
      currency: '$',
      period: 'month',
      popular: false,
      features: [
        'Everything in Professional',
        'Unlimited storage',
        'Custom integrations',
        '24/7 phone support',
        'SSO & advanced security',
        'Dedicated account manager',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={toggleBilling}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                isYearly ? 'bg-primary' : 'bg-muted'
              }`}
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              <span data-editable="billingToggleText">{config.billingToggleText}</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative bg-card text-card-foreground border-border transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-xl font-semibold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold">
                      <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                      <span
                        data-editable={`plans[${idx}].${isYearly ? 'yearlyPrice' : 'monthlyPrice'}`}
                      >
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                    </span>
                    {(plan.monthlyPrice > 0 || plan.yearlyPrice > 0) && (
                      <span className="text-muted-foreground ml-1">
                        /<span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                      </span>
                    )}
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">Billed annually</p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Need a custom solution?
            <Button
              variant="link"
              className="text-primary hover:text-primary/80 p-0 ml-1"
              onClick={() => navigate('/contact')}
            >
              Contact our sales team
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}
