import { Users, Target, Heart, Zap } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion för Kultur',
      description: 'Vi brinner för att göra kultur tillgänglig för alla. Varje evenemang är en möjlighet att uppleva något extraordinärt.',
    },
    {
      icon: Users,
      title: 'Gemenskap',
      description: 'Vi skapar en plattform där arrangörer och besökare möts för att dela sina kulturella upplevelser.',
    },
    {
      icon: Target,
      title: 'Enkel Bokning',
      description: 'Vår mission är att göra det enkelt att hitta och boka biljetter till alla typer av kulturella evenemang.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Vi utvecklar ständigt nya funktioner för att förbättra upplevelsen för både arrangörer och besökare.',
    },
  ];

  const team = [
    {
      name: 'Anna Andersson',
      role: 'VD & Grundare',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    },
    {
      name: 'Erik Johansson',
      role: 'Teknisk Chef',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    },
    {
      name: 'Maria Svensson',
      role: 'Marknadsansvarig',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    },
    {
      name: 'Johan Karlsson',
      role: 'Produktchef',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white mb-6">Om EventHub</h1>
            <p className="text-xl text-white/95">
              Vi är en passionerad grupp människor som älskar kultur och vill göra det enkelt för alla att upptäcka och uppleva fantastiska evenemang i Stockholm.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">Vår Mission</h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            EventHub grundades 2023 med visionen att skapa en modern plattform där kultur möter teknologi. Vi tror på kraften i levande upplevelser och vill göra det enklare än någonsin för människor att hitta och delta i kulturella evenemang som berikar livet.
          </p>
          <p className="text-lg text-gray-600 text-center">
            Idag hjälper vi tusentals arrangörer att nå ut med sina evenemang och ännu fler besökare att upptäcka nya kulturella upplevelser varje dag.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Våra Värderingar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-center mb-12">Vårt Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-orange-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-orange-600 to-amber-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-5xl mb-2">500+</p>
              <p className="text-white/90">Evenemang per månad</p>
            </div>
            <div>
              <p className="text-5xl mb-2">50K+</p>
              <p className="text-white/90">Aktiva användare</p>
            </div>
            <div>
              <p className="text-5xl mb-2">200+</p>
              <p className="text-white/90">Arrangörer</p>
            </div>
            <div>
              <p className="text-5xl mb-2">98%</p>
              <p className="text-white/90">Nöjda kunder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-12">
          <h2 className="mb-6">Vill du veta mer?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Kontakta oss gärna om du har frågor eller vill samarbeta med EventHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@eventhub.se"
              className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Skicka e-post
            </a>
            <a
              href="tel:+46812345678"
              className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Ring oss
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
