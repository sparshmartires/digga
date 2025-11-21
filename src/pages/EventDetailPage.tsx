import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Bookmark, Share2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { mockEvents } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Event not found</h2>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {/* Event Image */}
          <div className={`relative aspect-video ${event.isSponsored ? 'ring-2 ring-orange-300' : ''}`}>
            <ImageWithFallback
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1>{event.title}</h1>
                  <Badge variant="secondary">{t(event.category)}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isSaved ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">{t('date')} & {t('time')}</p>
                    <p>{new Date(event.date).toLocaleDateString()} • {event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">{t('location')}</p>
                    <p>{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">{t('attendees')}</p>
                    <p>{event.attendees} people attending</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">{t('price')}</p>
                  {event.price === 0 ? (
                    <p className="text-2xl text-green-600">{t('free')}</p>
                  ) : (
                    <p className="text-2xl">{event.price} {event.currency}</p>
                  )}
                  <Button className="w-full mt-4" size="lg">
                    Get Tickets
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-3">{t('organizer')}</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={event.organizerAvatar} />
                      <AvatarFallback>{event.organizerName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p>{event.organizerName}</p>
                    </div>
                    <Button variant="outline" size="sm">Follow</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <h3 className="mb-4">About This Event</h3>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}