'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'AutoFlow',
  companyDescription:
    'Streamline your business operations with intelligent automation and analytics',
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  socialLinks: [
    { platform: 'Twitter', href: 'https://twitter.com/autoflow', icon: 'twitter' },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/autoflow', icon: 'linkedin' },
    { platform: 'GitHub', href: 'https://github.com/autoflow', icon: 'github' },
  ],
  copyrightText: '© 2024 AutoFlow. All rights reserved.',
  ctaTitle: 'Ready to get started?',
  ctaDescription: 'Transform your business operations today',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleNavigation = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const renderSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      default:
        return <Twitter className="h-5 w-5" />;
    }
  };

  return (
    <footer id="footer" className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Company Info */}
            <div className="lg:col-span-6">
              <h3 className="text-2xl font-bold mb-4">
                <span data-editable="companyName">{config.companyName}</span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                <span data-editable="companyDescription">{config.companyDescription}</span>
              </p>

              {/* CTA Section */}
              <div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
                <h4 className="text-lg font-semibold mb-2">
                  <span data-editable="ctaTitle">{config.ctaTitle}</span>
                </h4>
                <p className="text-muted-foreground mb-4">
                  <span data-editable="ctaDescription">{config.ctaDescription}</span>
                </p>
                <Button
                  onClick={() => handleNavigation(config.ctaHref)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-editable-href="ctaHref"
                  data-href={config.ctaHref}
                >
                  <span data-editable="ctaText">{config.ctaText}</span>
                </Button>
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-6">
              <div className="grid gap-8 sm:grid-cols-2">
                {/* Company Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Company</h4>
                  <nav className="space-y-3">
                    {config.companyLinks.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavigation(link.href)}
                        className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                        data-editable-href={`companyLinks[${idx}].href`}
                        data-href={link.href}
                      >
                        <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Legal Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Legal</h4>
                  <nav className="space-y-3">
                    {config.legalLinks.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavigation(link.href)}
                        className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                        data-editable-href={`legalLinks[${idx}].href`}
                        data-href={link.href}
                      >
                        <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-foreground">Follow Us</h4>
                <div className="flex space-x-4">
                  {config.socialLinks.map((social, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavigation(social.href)}
                      className="p-2 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                      aria-label={social.platform}
                      data-editable-href={`socialLinks[${idx}].href`}
                      data-href={social.href}
                    >
                      {renderSocialIcon(social.icon)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Copyright */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              <span data-editable="copyrightText">{config.copyrightText}</span>
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Made with ❤️ for modern businesses</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
