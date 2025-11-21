import { Event } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface EventCardSimpleProps {
  event: Event;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}

export function EventCardSimple({ event, onClick, onMouseEnter, onMouseLeave, isHovered }: EventCardSimpleProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`bg-white rounded-lg p-4 hover:shadow-md transition-all cursor-pointer border ${
        isHovered 
          ? 'border-orange-600 shadow-md' 
          : event.isSponsored 
            ? 'border-orange-200' 
            : 'border-gray-200'
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="truncate mb-1">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString('sv-SE')} • {event.time}
          </p>
        </div>
        <div className="flex-shrink-0 text-right">
          {event.price === 0 ? (
            <span className="text-green-600">{t('free')}</span>
          ) : (
            <span className="text-orange-600">{event.price} SEK</span>
          )}
        </div>
      </div>
    </div>
  );
}