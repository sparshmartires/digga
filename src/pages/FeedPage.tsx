import { useState } from 'react';
import { Heart, MessageCircle, Share2, Calendar, Filter, Settings, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { mockPosts, mockEvents } from '../data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { EditProfileModal } from '../components/EditProfileModal';

export function FeedPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(mockPosts);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Mock previously attended events
  const attendedEvents = [
    mockEvents[0], // Hamlet
    mockEvents[2], // Fotoutställning
    mockEvents[6], // Stand Up Comedy
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  // Filter posts based on category, genre, and date
  const filteredPosts = posts.filter(post => {
    // Find the event associated with this post
    const event = mockEvents.find(e => e.id === post.eventId);
    
    // Category filter
    if (categoryFilter !== 'all' && (!event || event.category !== categoryFilter)) {
      return false;
    }
    
    // Genre filter
    if (genreFilter !== 'all' && (!event || event.genre !== genreFilter)) {
      return false;
    }
    
    // Date filter
    if (dateFilter !== 'all' && event) {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dateFilter === 'today') {
        if (eventDate.toDateString() !== today.toDateString()) return false;
      } else if (dateFilter === 'week') {
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);
        if (eventDate < today || eventDate > weekFromNow) return false;
      } else if (dateFilter === 'month') {
        const monthFromNow = new Date(today);
        monthFromNow.setMonth(today.getMonth() + 1);
        if (eventDate < today || eventDate > monthFromNow) return false;
      }
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header with Edit Profile Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-orange-600">{t('feed')}</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditProfileOpen(true)}
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            {t('editProfile')}
          </Button>
        </div>

        {/* Filters Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-orange-600" />
              <h3 className="text-orange-600">{t('filters')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <Select onValueChange={setCategoryFilter} value={categoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('allCategories')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allCategories')}</SelectItem>
                  <SelectItem value="theater">{t('theater')}</SelectItem>
                  <SelectItem value="ballet">{t('ballet')}</SelectItem>
                  <SelectItem value="opera">{t('opera')}</SelectItem>
                  <SelectItem value="arts">{t('arts')}</SelectItem>
                  <SelectItem value="music">{t('music')}</SelectItem>
                  <SelectItem value="comedy">{t('comedy')}</SelectItem>
                  <SelectItem value="musical">Musical</SelectItem>
                </SelectContent>
              </Select>

              {/* Genre Filter */}
              <Select onValueChange={setGenreFilter} value={genreFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('allGenres')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allGenres')}</SelectItem>
                  <SelectItem value="drama">{t('drama')}</SelectItem>
                  <SelectItem value="klassisk">{t('klassisk')}</SelectItem>
                  <SelectItem value="fotografi">{t('fotografi')}</SelectItem>
                  <SelectItem value="skulptur">{t('skulptur')}</SelectItem>
                  <SelectItem value="samtidskonst">{t('samtidskonst')}</SelectItem>
                  <SelectItem value="jazz">{t('jazz')}</SelectItem>
                  <SelectItem value="standup">{t('standup')}</SelectItem>
                  <SelectItem value="musikal">{t('musikal')}</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select onValueChange={setDateFilter} value={dateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('allDates')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allDates')}</SelectItem>
                  <SelectItem value="today">{t('today')}</SelectItem>
                  <SelectItem value="week">{t('thisWeek')}</SelectItem>
                  <SelectItem value="month">{t('thisMonth')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Previously Attended Events */}
        <div className="mb-8">
          <h2 className="mb-4 text-orange-600">{t('previouslyAttended')}</h2>
          <div className="grid grid-cols-1 gap-4">
            {attendedEvents.map((event) => (
              <Card
                key={event.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Feed Section */}
        <h2 className="mb-4 text-orange-600">{t('recentActivity')}</h2>
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-6">
                {/* Post Header */}
                <div className="flex items-start gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={post.userAvatar} />
                    <AvatarFallback>{post.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{post.userName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.timestamp).toLocaleDateString()} • {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="mb-4">{post.content}</p>

                {/* Event Card if linked */}
                {post.eventId && post.eventImage && (
                  <div
                    className="mb-4 border rounded-lg overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => navigate(`/event/${post.eventId}`)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <ImageWithFallback
                        src={post.eventImage}
                        alt={post.eventTitle || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{post.eventTitle}</span>
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    <span>{t('shareEvent')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">{t('loadMore')}</Button>
        </div>
      </div>
      <EditProfileModal open={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
    </div>
  );
}