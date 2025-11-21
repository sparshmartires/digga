import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

export function EditEventPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  // Redirect non-organizers or users without paid plan
  if (!user?.isOrganizer) {
    navigate('/');
    return null;
  }

  if (!user?.hasPaidPlan) {
    navigate('/upgrade');
    return null;
  }

  // Mock event data - in real app, fetch by ID
  const mockEvent = {
    id: id,
    title: 'Hamlet at Dramaten',
    description: 'Classic Shakespeare tragedy performed by Sweden\'s finest actors',
    cast: 'John Doe as Hamlet, Jane Smith as Ophelia',
    genre: 'drama',
    category: 'theater',
    location: 'Dramaten, Stockholm',
    date: '2024-12-15',
    time: '19:00',
    price: '450',
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
  };

  const [formData, setFormData] = useState({
    title: mockEvent.title,
    description: mockEvent.description,
    time: mockEvent.time,
    // Read-only fields
    cast: mockEvent.cast,
    genre: mockEvent.genre,
    category: mockEvent.category,
    location: mockEvent.location,
    date: mockEvent.date,
    price: mockEvent.price,
    imageUrl: mockEvent.imageUrl,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = t('titleRequired');
    if (!formData.description.trim()) newErrors.description = t('descriptionRequired');
    if (!formData.time) newErrors.time = t('timeRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, this would update the backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate event update
      console.log('Updating event:', formData);

      // Success - redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Failed to update event. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToDashboard')}
          </Button>
          <h1 className="text-orange-600">{t('editEvent')}</h1>
          <p className="text-gray-600 mt-2">
            You can only edit the title, description, and time
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t('eventDetails')}</CardTitle>
            <CardDescription>
              Only title, description, and time are editable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title - EDITABLE */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  {t('eventTitle')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Hamlet at Dramaten"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Description - EDITABLE */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  {t('description')} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe your event..."
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Cast of Characters - READ ONLY */}
              <div className="space-y-2">
                <Label htmlFor="cast">
                  <Users className="w-4 h-4 inline mr-2" />
                  {t('castOfCharacters')} <span className="text-gray-500 text-sm">(Read only)</span>
                </Label>
                <Textarea
                  id="cast"
                  value={formData.cast}
                  disabled
                  rows={3}
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Category and Genre - READ ONLY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    {t('category')} <span className="text-gray-500 text-sm">(Read only)</span>
                  </Label>
                  <Input
                    id="category"
                    value={t(formData.category)}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">
                    {t('genre')} <span className="text-gray-500 text-sm">(Read only)</span>
                  </Label>
                  <Input
                    id="genre"
                    value={t(formData.genre)}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Location - READ ONLY */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  {t('location')} <span className="text-gray-500 text-sm">(Read only)</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Date - READ ONLY and Time - EDITABLE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {t('date')} <span className="text-gray-500 text-sm">(Read only)</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">
                    <Clock className="w-4 h-4 inline mr-2" />
                    {t('time')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className={errors.time ? 'border-red-500' : ''}
                  />
                  {errors.time && (
                    <p className="text-sm text-red-500">{errors.time}</p>
                  )}
                </div>
              </div>

              {/* Price - READ ONLY */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  {t('price')} (SEK) <span className="text-gray-500 text-sm">(Read only)</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {t('cancel')}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Event'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
