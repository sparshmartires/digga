import { useState } from 'react';
import { Edit2, MapPin, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockEvents } from '../data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { EventCard } from '../components/EventCard';
import { GenrePreferences } from '../components/GenrePreferences';

export function ProfilePage() {
  const { t } = useLanguage();
  const { user, updateUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedBio, setEditedBio] = useState(user?.bio || '');

  const savedEvents = mockEvents.slice(0, 3);
  const createdEvents = mockEvents.filter(e => e.organizerId === user?.id);

  const handleSave = () => {
    updateUser({ name: editedName, bio: editedBio });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setEditedBio(user?.bio || '');
    setIsEditing(false);
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Name"
                    />
                    <Textarea
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      placeholder="Bio"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>{t('save')}</Button>
                      <Button variant="outline" onClick={handleCancel}>
                        {t('cancel')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h2>{user.name}</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        {t('editProfile')}
                      </Button>
                    </div>
                    <p className="text-gray-600 mb-4">{user.email}</p>
                    {user.bio && <p className="mb-4">{user.bio}</p>}

                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="text-gray-600">{t('followers')}: </span>
                        <span>{user.followers}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">{t('following')}: </span>
                        <span>{user.following}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={signOut} className="w-full">
                {t('signOut')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className={`grid w-full ${user.isOrganizer ? 'grid-cols-3' : 'grid-cols-3'}`}>
            <TabsTrigger value="saved">{t('savedEvents')}</TabsTrigger>
            {!user.isOrganizer && <TabsTrigger value="preferences">Preferences</TabsTrigger>}
            <TabsTrigger value="followers">{t('followers')}</TabsTrigger>
            <TabsTrigger value="following">{t('following')}</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event.id)}
                />
              ))}
            </div>
            {savedEvents.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No saved events yet
              </div>
            )}
          </TabsContent>

          {!user.isOrganizer && (
            <TabsContent value="preferences" className="mt-6">
              <GenrePreferences />
            </TabsContent>
          )}

          <TabsContent value="followers" className="mt-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + i}00000000-0000-0000-0000-000000000000?w=100&h=100&fit=crop`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p>User {i}</p>
                          <p className="text-sm text-gray-500">@user{i}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Following</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="following" className="mt-6">
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://images.unsplash.com/photo-${1600000000000 + i}00000000-0000-0000-0000-000000000000?w=100&h=100&fit=crop`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p>Organizer {i}</p>
                          <p className="text-sm text-gray-500">@organizer{i}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Unfollow</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}