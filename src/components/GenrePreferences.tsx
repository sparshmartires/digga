import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

// Available genres that match the mockData
const availableGenres = [
  'drama',
  'klassisk',
  'fotografi',
  'skulptur',
  'samtidskonst',
  'jazz',
  'standup',
  'musikal',
];

export function GenrePreferences() {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const [selectedGenres, setSelectedGenres] = useState<string[]>(user?.preferredGenres || []);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSave = () => {
    updateUser({ preferredGenres: selectedGenres });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Genre Preferences</CardTitle>
        <CardDescription>
          Select your favorite genres to personalize your feed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-6">
          {availableGenres.map(genre => (
            <Badge
              key={genre}
              variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                selectedGenres.includes(genre)
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => toggleGenre(genre)}
            >
              {t(genre)}
            </Badge>
          ))}
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}
