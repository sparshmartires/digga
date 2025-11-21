import { Check, Crown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function PricingPage() {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      name: t('free'),
      price: 0,
      features: [
        'Create up to 3 events',
        'Basic analytics',
        'Standard support',
        'Event listing',
      ],
      isCurrent: user && !user.hasPaidPlan,
    },
    {
      id: 'pro',
      name: t('pro'),
      price: 299,
      features: [
        'Unlimited events',
        'Advanced analytics',
        'Priority support',
        'Featured listings',
        'Edit published events',
        'Bulk actions',
        'Custom branding',
        'Export attendee data',
      ],
      isCurrent: user?.hasPaidPlan,
      isRecommended: true,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === 'pro') {
      // Check if user is authenticated
      if (!user) {
        navigate('/signin');
        return;
      }

      // Mock payment process
      updateUser({ hasPaidPlan: true });
      alert('Payment successful! You are now a Pro member.');
      
      // Redirect based on user type
      if (user.isOrganizer) {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="mb-4">{t('paymentPlans')}</h1>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your event management needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.isRecommended
                    ? 'border-orange-600 border-2 shadow-lg'
                    : ''
                }`}
              >
                {plan.isRecommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-600 gap-1">
                    <Crown className="w-3 h-3" />
                    Recommended
                  </Badge>
                )}

                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {plan.isCurrent && (
                      <Badge variant="secondary">{t('currentPlan')}</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    <span className="text-3xl">{plan.price} SEK</span>
                    <span className="text-gray-500">/month</span>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.isCurrent ? 'outline' : 'default'}
                    disabled={plan.isCurrent}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.isCurrent ? t('currentPlan') : user ? t('selectPlan') : t('signInToSubscribe')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white rounded-xl text-center">
            <p className="text-gray-600">
              All plans include secure payment processing and 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
