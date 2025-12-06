'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_CONTACT = {
  title: 'Get in Touch',
  subtitle:
    "Ready to transform your business? Let's discuss your project and explore how our solutions can drive your success.",
  formTitle: 'Send us a message',
  formSubtitle: "Fill out the form below and we'll get back to you within 24 hours.",
  nameLabel: 'Full Name',
  namePlaceholder: 'Enter your full name',
  emailLabel: 'Email Address',
  emailPlaceholder: 'Enter your email address',
  companyLabel: 'Company',
  companyPlaceholder: 'Enter your company name',
  messageLabel: 'Message',
  messagePlaceholder: 'Tell us about your project or requirements...',
  submitText: 'Send Message',
  contactMethods: [
    {
      icon: 'Mail',
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'hello@yourcompany.com',
      action: 'mailto:hello@yourcompany.com',
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      description: 'Speak with our team',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
    },
    {
      icon: 'MessageSquare',
      title: 'Live Chat',
      description: 'Chat with support',
      value: 'Available 9AM-6PM EST',
      action: '#chat',
    },
  ],
  responseTime: 'We typically respond within 2-4 hours during business hours',
  successMessage: "Thank you! We'll be in touch soon.",
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      Mail: Mail,
      Phone: Phone,
      MessageSquare: MessageSquare,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Mail;
    return <IconComponent className="h-6 w-6" />;
  };

  const handleContactMethod = (action: string) => {
    if (action.startsWith('mailto:') || action.startsWith('tel:')) {
      window.location.href = action;
    } else if (action === '#chat') {
      // Handle chat opening logic
      console.log('Opening chat...');
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                <span data-editable="formTitle">{config.formTitle}</span>
              </h3>
              <p className="text-muted-foreground mb-8">
                <span data-editable="formSubtitle">{config.formSubtitle}</span>
              </p>
            </div>

            <div className="grid gap-6">
              {config.contactMethods.map((method, idx) => (
                <Card
                  key={idx}
                  className="bg-card text-card-foreground border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleContactMethod(method.action)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                        {getIcon(method.icon)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">
                          <span data-editable={`contactMethods[${idx}].title`}>{method.title}</span>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          <span data-editable={`contactMethods[${idx}].description`}>
                            {method.description}
                          </span>
                        </p>
                        <p className="font-medium text-primary">
                          <span data-editable={`contactMethods[${idx}].value`}>{method.value}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted text-muted-foreground p-4 rounded-lg">
              <Clock className="h-4 w-4" />
              <span data-editable="responseTime">{config.responseTime}</span>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card text-card-foreground border-border">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    <span data-editable="successMessage">{config.successMessage}</span>
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-form-id="69346446ba59bfdf76ac8aea"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        <span data-editable="nameLabel">{config.nameLabel}</span>
                      </label>
                      <Input
                        type="text"
                        placeholder={config.namePlaceholder}
                        value={formData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        required
                        className="bg-background text-foreground border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        <span data-editable="emailLabel">{config.emailLabel}</span>
                      </label>
                      <Input
                        type="email"
                        placeholder={config.emailPlaceholder}
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        required
                        className="bg-background text-foreground border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      <span data-editable="companyLabel">{config.companyLabel}</span>
                    </label>
                    <Input
                      type="text"
                      placeholder={config.companyPlaceholder}
                      value={formData.company}
                      onChange={e => handleInputChange('company', e.target.value)}
                      className="bg-background text-foreground border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      <span data-editable="messageLabel">{config.messageLabel}</span>
                    </label>
                    <Textarea
                      placeholder={config.messagePlaceholder}
                      value={formData.message}
                      onChange={e => handleInputChange('message', e.target.value)}
                      required
                      rows={5}
                      className="bg-background text-foreground border-border resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span data-editable="submitText">{config.submitText}</span>
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
