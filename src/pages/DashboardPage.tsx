import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Filter, Heart, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Redirect non-organizers
  if (!user?.isOrganizer) {
    navigate('/profile');
    return null;
  }

  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Hamlet at Dramaten',
      description: 'Classic Shakespeare tragedy performed by Sweden\'s finest actors',
      category: 'theater',
      genre: 'drama',
      location: 'Dramaten, Stockholm',
      date: '2024-12-15',
      time: '19:00',
      price: '450',
      imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
      sponsored: true,
      attendees: 234,
      views: 1205,
    },
    {
      id: '2',
      title: 'Jazz Night at Fasching',
      description: 'An evening of smooth jazz featuring international and local artists',
      category: 'music',
      genre: 'jazz',
      location: 'Fasching, Stockholm',
      date: '2024-12-18',
      time: '20:30',
      price: '320',
      imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
      sponsored: false,
      attendees: 145,
      views: 892,
    },
    {
      id: '3',
      title: 'Contemporary Art Exhibition',
      description: 'Exploring modern perspectives on identity and society',
      category: 'arts',
      genre: 'samtidskonst',
      location: 'Moderna Museet, Stockholm',
      date: '2024-12-20',
      time: '10:00',
      price: '0',
      imageUrl: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800',
      sponsored: false,
      attendees: 67,
      views: 445,
    },
    {
      id: '4',
      title: 'Swan Lake Ballet',
      description: 'Timeless ballet masterpiece by Tchaikovsky',
      category: 'ballet',
      genre: 'klassisk',
      location: 'Royal Opera House, Stockholm',
      date: '2024-12-22',
      time: '18:00',
      price: '550',
      imageUrl: 'https://images.unsplash.com/photo-1518611507436-f9221403cca2?w=800',
      sponsored: true,
      attendees: 312,
      views: 1567,
    },
    {
      id: '5',
      title: 'Stand-Up Comedy Night',
      description: 'Laugh out loud with Sweden\'s top comedians',
      category: 'comedy',
      genre: 'standup',
      location: 'Comedy Club Stockholm',
      date: '2024-12-25',
      time: '21:00',
      price: '280',
      imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
      sponsored: false,
      attendees: 89,
      views: 523,
    },
  ];

  // Apply all filters
  const filteredEvents = events.filter(event => {
    const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter;
    const genreMatch = genreFilter === 'all' || event.genre === genreFilter;
    
    // Date filter logic
    let dateMatch = true;
    if (dateFilter !== 'all') {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dateFilter === 'today') {
        dateMatch = eventDate.toDateString() === today.toDateString();
      } else if (dateFilter === 'week') {
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);
        dateMatch = eventDate >= today && eventDate <= weekFromNow;
      } else if (dateFilter === 'month') {
        const monthFromNow = new Date(today);
        monthFromNow.setMonth(today.getMonth() + 1);
        dateMatch = eventDate >= today && eventDate <= monthFromNow;
      }
    }
    
    return categoryMatch && genreMatch && dateMatch;
  });

  const handleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map(e => e.id));
    }
  };

  const handleSelectEvent = (eventId: string) => {
    setSelectedEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleEditEvent = (eventId: string) => {
    // Check if user has paid plan
    if (!user?.hasPaidPlan) {
      navigate('/upgrade');
      return;
    }
    navigate(`/edit-event/${eventId}`);
  };

  const handleDeleteSelected = () => {
    if (confirm(`Delete ${selectedEvents.length} selected events?`)) {
      // Mock deletion
      setSelectedEvents([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-orange-600">{t('myEvents')}</h1>
            <p className="text-gray-600 mt-2">
              Manage your events and track their performance
            </p>
          </div>
          <Button
            onClick={() => navigate('/create-event')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('createEvent')}
          </Button>
        </div>

        {/* Payment Plan Alert */}
        {!user?.hasPaidPlan && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertDescription className="flex items-center justify-between">
              <span>Upgrade to Pro to unlock event editing and advanced features</span>
              <Button onClick={() => navigate('/upgrade')} size="sm">
                {t('upgradeToPro')}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Filters and Bulk Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm">{t('selectAll')}</span>
            </div>

            <div className="h-6 w-px bg-gray-300" />

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                <SelectItem value="theater">{t('theater')}</SelectItem>
                <SelectItem value="ballet">{t('ballet')}</SelectItem>
                <SelectItem value="opera">{t('opera')}</SelectItem>
                <SelectItem value="arts">{t('arts')}</SelectItem>
                <SelectItem value="music">{t('music')}</SelectItem>
                <SelectItem value="comedy">{t('comedy')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t('allGenres')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allGenres')}</SelectItem>
                <SelectItem value="drama">{t('drama')}</SelectItem>
                <SelectItem value="jazz">{t('jazz')}</SelectItem>
                <SelectItem value="samtidskonst">{t('samtidskonst')}</SelectItem>
                <SelectItem value="klassisk">{t('klassisk')}</SelectItem>
                <SelectItem value="standup">{t('standup')}</SelectItem>
                <SelectItem value="fotografi">{t('fotografi')}</SelectItem>
                <SelectItem value="skulptur">{t('skulptur')}</SelectItem>
                <SelectItem value="musikal">{t('musikal')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t('allDates')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allDates')}</SelectItem>
                <SelectItem value="today">{t('today')}</SelectItem>
                <SelectItem value="week">{t('thisWeek')}</SelectItem>
                <SelectItem value="month">{t('thisMonth')}</SelectItem>
              </SelectContent>
            </Select>

            {selectedEvents.length > 0 && (
              <>
                <div className="h-6 w-px bg-gray-300" />
                <span className="text-sm text-gray-600">
                  {selectedEvents.length} selected
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  {t('deleteSelected')}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                event.sponsored ? 'ring-2 ring-orange-300' : ''
              }`}
            >
              <div className="flex gap-6">
                <Checkbox
                  checked={selectedEvents.includes(event.id)}
                  onCheckedChange={() => handleSelectEvent(event.id)}
                />

                <div className="relative w-48 aspect-video rounded-lg overflow-hidden flex-shrink-0 group">
                  <ImageWithFallback
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/90 hover:bg-white shadow-md h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Heart className="w-4 h-4 text-gray-700" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/90 hover:bg-white shadow-md h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Share2 className="w-4 h-4 text-gray-700" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3>{event.title}</h3>
                        <Badge variant="secondary">{t(event.category)}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {new Date(event.date).toLocaleDateString()} • {event.time}
                      </p>
                      <p className="text-gray-600 text-sm">{event.location}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEvent(event.id)}
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        {t('edit')}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/event/${event.id}`)}
                      >
                        {t('view')}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                    <span>{event.attendees} attendees</span>
                    <span>{event.views} views</span>
                    <span>
                      {event.price === '0' ? t('free') : `${event.price} SEK`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">No events found</p>
              <Button onClick={() => navigate('/create-event')}>
                {t('createEvent')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}