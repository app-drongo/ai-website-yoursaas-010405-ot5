'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'TechFlow',
  brandHref: '/',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaText: 'Get Started',
  ctaHref: '/signup',
  mobileMenuLabel: 'Open navigation menu',
  closeMenuLabel: 'Close navigation menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleBrandClick = () => {
    navigate(config.brandHref);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section
      id="navigation"
      className={`bg-background/95 text-foreground border-b border-border/50 sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-primary/5' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <button
              onClick={handleBrandClick}
              data-editable-href="brandHref"
              data-href={config.brandHref}
              className="text-xl lg:text-2xl font-bold text-foreground hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="Go to homepage"
            >
              <span data-editable="brandName">{config.brandName}</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-1 lg:space-x-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {config.navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.href)}
                data-editable-href={`navItems[${idx}].href`}
                data-href={item.href}
                className="relative text-foreground hover:text-primary transition-all duration-200 font-medium px-4 py-2 rounded-lg hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group"
              >
                <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-8 group-hover:-translate-x-1/2" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button
              onClick={handleCtaClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 font-semibold px-6 py-2"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 rounded-lg"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-card/95 text-card-foreground w-80 sm:w-96 backdrop-blur-lg border-l border-border/50"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <button
                        onClick={handleBrandClick}
                        data-editable-href="brandHref"
                        data-href={config.brandHref}
                        className="text-xl font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
                      >
                        <span data-editable="brandName">{config.brandName}</span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-6" role="navigation" aria-label="Mobile navigation">
                    <div className="space-y-2">
                      {config.navItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.href)}
                          data-editable-href={`navItems[${idx}].href`}
                          data-href={item.href}
                          className="block w-full text-left text-lg font-medium text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-border/50">
                    <Button
                      onClick={handleCtaClick}
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25 font-semibold"
                      size="lg"
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}
