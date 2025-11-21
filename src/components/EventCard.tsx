import { Calendar, MapPin, Users, Heart, Share2 } from 'lucide-react';
import { Event } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const { t } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group h-full flex flex-col ${
        event.isSponsored ? 'ring-1 ring-orange-300' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/90 hover:bg-white shadow-md"
            onClick={handleLikeClick}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/90 hover:bg-white shadow-md"
            onClick={handleShareClick}
          >
            <Share2 className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="mb-2 line-clamp-2">{event.title}</h3>
        
        <div className="space-y-2 text-gray-600 mb-3 flex-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString()} • {event.time}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">{event.attendees} {t('attendees')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            {event.price === 0 ? (
              <span className="text-green-600">{t('free')}</span>
            ) : (
              <span>{event.price} {event.currency}</span>
            )}
          </div>
          <Badge variant="secondary">{t(event.category)}</Badge>
        </div>
      </div>
    </div>
  );
}