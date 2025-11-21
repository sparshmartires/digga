import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Calendar, Clock, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { EventCard } from '../components/EventCard';
import { EventCardSimple } from '../components/EventCardSimple';
import { InteractiveMap } from '../components/InteractiveMap';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { useLanguage } from '../context/LanguageContext';
import { mockEvents } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function LandingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const popularEvents = mockEvents.slice(0, 6);

  const categories = [
    { id: 'theater', icon: Calendar, color: 'bg-orange-100 text-orange-600' },
    { id: 'ballet', icon: Clock, color: 'bg-amber-100 text-amber-600' },
    { id: 'opera', icon: DollarSign, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'arts', icon: DollarSign, color: 'bg-orange-200 text-orange-700' },
    { id: 'music', icon: Calendar, color: 'bg-amber-200 text-amber-700' },
    { id: 'comedy', icon: Clock, color: 'bg-yellow-200 text-yellow-800' },
  ];

  // FAQ data
  const faqs = [
    {
      question: 'Hur bokar jag biljetter?',
      answer: 'Klicka på ett evenemang för att se detaljerad information och boka biljetter direkt. Du kan betala säkert med kort eller Swish.',
    },
    {
      question: 'Kan jag avboka mina biljetter?',
      answer: 'Ja, biljetter kan avbokas upp till 24 timmar innan evenemanget startar. Återbetalning sker inom 5-7 arbetsdagar.',
    },
    {
      question: 'Hur blir jag eventarrangör?',
      answer: 'Registrera dig och välj "Jag vill skapa och hantera evenemang" vid registreringen. Du kan sedan skapa och publicera dina egna evenemang.',
    },
    {
      question: 'Vilka betalningsmetoder accepteras?',
      answer: 'Vi accepterar alla vanliga kredit- och betalkort samt Swish. Alla betalningar är säkra och krypterade.',
    },
    {
      question: 'Finns det grupprabatter?',
      answer: 'Många evenemang erbjuder grupprabatter för bokningar av 10 eller fler biljetter. Kontakta arrangören direkt för mer information.',
    },
    {
      question: 'Hur fungerar kartan?',
      answer: 'Kartan visar alla evenemang i Stockholm-området. Hovra över markörer för att se snabb information, eller klicka för att se fullständiga detaljer.',
    },
  ];

  // Mosaic images for hero
  const mosaicImages = [
    'https://images.unsplash.com/photo-1663616132816-f3d0155c0a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwbWFza3MlMjBkcmFtYXxlbnwxfHx8fDE3NjM1NTY5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1592554536753-6d811a6ff52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxsZXQlMjBzaG9lc3xlbnwxfHx8fDE3NjM2MzY0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1646687327712-c8222016f79c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBwYWxldHRlJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzYzNjM2NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1676201452204-fdeeec78221a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW9saW4lMjBjbGFzc2ljYWwlMjBtdXNpY3xlbnwxfHx8fDE3NjM1OTcxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjM2MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1615754890634-69ac8bca7189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZSUyMHNwb3RsaWdodHxlbnwxfHx8fDE3NjM2MzY0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1458639817867-2c9d4c5dcad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwaGFsbHxlbnwxfHx8fDE3NjM2MzY0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1720303429758-92e2123800cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzY3VscHR1cmV8ZW58MXx8fHwxNzYzNjM2NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const genres = Array.from(new Set(mockEvents.map(e => e.genre)));
  const locations = Array.from(new Set(mockEvents.map(e => {
    const parts = e.location.split(',');
    return parts[parts.length - 1].trim();
  })));

  useEffect(() => {
    let results = [...mockEvents];

    if (searchQuery) {
      results = results.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      results = results.filter(event => event.category === selectedCategory);
    }

    if (selectedGenre !== 'all') {
      results = results.filter(event => event.genre === selectedGenre);
    }

    if (selectedLocation !== 'all') {
      results = results.filter(event => event.location.includes(selectedLocation));
    }

    setFilteredEvents(results);
  }, [searchQuery, selectedCategory, selectedGenre, selectedLocation]);

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGenre('all');
    setSelectedLocation('all');
    setSearchQuery('');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search on Left and Text on Right */}
      <div className="relative min-h-[520px] bg-gradient-to-br from-orange-600 to-amber-700 overflow-hidden">
        {/* Mosaic Grid Background */}
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 gap-0">
          {mosaicImages.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden opacity-25">
              <ImageWithFallback
                src={image}
                alt={`Mosaic ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {mosaicImages.map((image, index) => (
            <div key={`repeat-${index}`} className="relative aspect-square overflow-hidden opacity-25">
              <ImageWithFallback
                src={image}
                alt={`Mosaic ${index + 9}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/60 to-amber-700/60" />
        
        <div className="relative container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-[500px]">
            {/* Left: Search Container - Wide */}
            <div className="lg:col-span-3 flex flex-col">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex-1 flex flex-col max-h-[480px]">
                {/* Search Header */}
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex gap-3 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white"
                      />
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Filter className="w-5 h-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <div>
                            <h4 className="mb-2">{t('filters')}</h4>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm text-gray-600 mb-1 block">
                                {t('allCategories')}
                              </label>
                              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">{t('allCategories')}</SelectItem>
                                  <SelectItem value="theater">{t('theater')}</SelectItem>
                                  <SelectItem value="ballet">{t('ballet')}</SelectItem>
                                  <SelectItem value="opera">{t('opera')}</SelectItem>
                                  <SelectItem value="musical">{t('musical')}</SelectItem>
                                  <SelectItem value="arts">{t('arts')}</SelectItem>
                                  <SelectItem value="music">{t('music')}</SelectItem>
                                  <SelectItem value="comedy">{t('comedy')}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm text-gray-600 mb-1 block">
                                {t('genre')}
                              </label>
                              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">{t('allGenres')}</SelectItem>
                                  {genres.map(genre => (
                                    <SelectItem key={genre} value={genre}>
                                      {t(genre)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm text-gray-600 mb-1 block">
                                {t('location')}
                              </label>
                              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">{t('allLocations')}</SelectItem>
                                  {locations.map(location => (
                                    <SelectItem key={location} value={location}>
                                      {location}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full" onClick={resetFilters}>
                            Rensa filter
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-gray-600">{t('filters')}:</span>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allCategories')}</SelectItem>
                        <SelectItem value="theater">{t('theater')}</SelectItem>
                        <SelectItem value="ballet">{t('ballet')}</SelectItem>
                        <SelectItem value="opera">{t('opera')}</SelectItem>
                        <SelectItem value="musical">{t('musical')}</SelectItem>
                        <SelectItem value="arts">{t('arts')}</SelectItem>
                        <SelectItem value="music">{t('music')}</SelectItem>
                        <SelectItem value="comedy">{t('comedy')}</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder={t('genre')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allGenres')}</SelectItem>
                        {genres.map(genre => (
                          <SelectItem key={genre} value={genre}>
                            {t(genre)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder={t('location')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allLocations')}</SelectItem>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Content: Events List on Left, Map on Right */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Events List - Left Side */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-3 border-r">
                    <p className="text-sm text-gray-600 mb-3">
                      {filteredEvents.length} evenemang i Stockholm
                    </p>
                    {filteredEvents.map((event) => (
                      <EventCardSimple
                        key={event.id}
                        event={event}
                        onClick={() => handleEventClick(event.id)}
                        onMouseEnter={() => setHoveredEventId(event.id)}
                        onMouseLeave={() => setHoveredEventId(null)}
                        isHovered={hoveredEventId === event.id}
                      />
                    ))}
                    {filteredEvents.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        Inga evenemang hittades. Prova att justera dina sökkriterier.
                      </div>
                    )}
                  </div>

                  {/* Map - Right Side */}
                  <div className="w-[400px] flex-shrink-0">
                    <InteractiveMap
                      events={filteredEvents}
                      hoveredEventId={hoveredEventId}
                      onEventClick={handleEventClick}
                      currency="SEK"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hero Text */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              {/* Hero Text */}
              <div className="text-white">
                <h1 className="text-white mb-4">{t('heroTitle')}</h1>
                <p className="text-white/95 text-xl mb-6">{t('heroSubtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Events - Moved under hero */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6">{t('popularEvents')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularEvents.map((event) => (
            <div
              key={event.id}
              className={event.isSponsored ? 'md:col-span-2' : ''}
            >
              <EventCard
                event={event}
                onClick={() => handleEventClick(event.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6">{t('categories')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl hover:shadow-md transition-shadow"
              >
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span>{t(category.id)}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-8 text-center">Vanliga Frågor</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="pr-8">{faq.question}</h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}