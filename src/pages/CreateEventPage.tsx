import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';

export function CreateEventPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect non-organizers
  if (!user?.isOrganizer) {
    navigate('/');
    return null;
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cast: '',
    genre: '',
    category: '',
    location: '',
    date: '',
    time: '',
    price: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['theater', 'ballet', 'opera', 'arts', 'music', 'comedy'];
  const genres = ['drama', 'klassisk', 'fotografi', 'skulptur', 'samtidskonst', 'jazz', 'standup', 'musikal'];

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
    if (!formData.genre) newErrors.genre = t('genreRequired');
    if (!formData.category) newErrors.category = t('categoryRequired');
    if (!formData.location.trim()) newErrors.location = t('locationRequired');
    if (!formData.date) newErrors.date = t('dateRequired');
    if (!formData.time) newErrors.time = t('timeRequired');
    if (!formData.price) newErrors.price = t('priceRequired');

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
      // Mock API call - in real app, this would save to backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate event creation
      console.log('Creating event:', formData);

      // Check if user has paid plan
      if (!user?.hasPaidPlan) {
        // Redirect to upgrade page if not pro
        navigate('/upgrade');
      } else {
        // Success - redirect to dashboard if pro
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to create event. Please try again.' });
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
          <h1 className="text-orange-600">{t('createEvent')}</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details below to create a new event
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t('eventDetails')}</CardTitle>
            <CardDescription>
              All fields are required unless marked as optional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
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

              {/* Description */}
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

              {/* Cast of Characters */}
              <div className="space-y-2">
                <Label htmlFor="cast">
                  <Users className="w-4 h-4 inline mr-2" />
                  {t('castOfCharacters')} <span className="text-gray-500 text-sm">(Optional)</span>
                </Label>
                <Textarea
                  id="cast"
                  value={formData.cast}
                  onChange={(e) => handleChange('cast', e.target.value)}
                  placeholder="List the main cast members or performers..."
                  rows={3}
                />
                <p className="text-sm text-gray-500">
                  Example: John Doe as Hamlet, Jane Smith as Ophelia
                </p>
              </div>

              {/* Category and Genre */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    {t('category')} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange('category', value)}
                  >
                    <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                      <SelectValue placeholder={t('selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {t(cat)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">
                    {t('genre')} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.genre}
                    onValueChange={(value) => handleChange('genre', value)}
                  >
                    <SelectTrigger className={errors.genre ? 'border-red-500' : ''}>
                      <SelectValue placeholder={t('selectGenre')} />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {t(genre)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.genre && (
                    <p className="text-sm text-red-500">{errors.genre}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  {t('location')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Dramaten, Stockholm"
                  className={errors.location ? 'border-red-500' : ''}
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {t('date')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className={errors.date ? 'border-red-500' : ''}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-500">{errors.date}</p>
                  )}
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

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  {t('price')} (SEK) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="0 for free events"
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">
                  {t('eventImage')} <span className="text-gray-500 text-sm">(Optional)</span>
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500">
                  Provide a URL to an image for your event
                </p>
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
                  {isSubmitting ? t('creating') : t('createEvent')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}