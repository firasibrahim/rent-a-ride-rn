import { Search, MapPin, Calendar, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const HeroSection = () => {
  const [searchLocation, setSearchLocation] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light opacity-95" />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Rental Car
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover premium vehicles from trusted providers. Book instantly and drive with confidence.
          </p>
        </div>

        {/* Search Card */}
        <div className="animate-slide-up max-w-4xl mx-auto bg-card/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-border/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Pick-up Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="City or airport"
                  className="pl-10 input-premium"
                />
              </div>
            </div>

            {/* Pick-up Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Pick-up Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10 input-premium"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Return Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10 input-premium"
                  defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button className="w-full btn-hero h-12">
                <Search className="h-5 w-5 mr-2" />
                Search Cars
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="animate-bounce-in mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">500+</div>
            <div className="text-primary-foreground/80">Premium Cars</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">50+</div>
            <div className="text-primary-foreground/80">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">10k+</div>
            <div className="text-primary-foreground/80">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">4.9</div>
            <div className="text-primary-foreground/80">Rating</div>
          </div>
        </div>
      </div>

      {/* Floating Car Icons */}
      <Car className="absolute top-20 left-10 h-8 w-8 text-primary-foreground/20 animate-pulse" />
      <Car className="absolute bottom-32 right-16 h-6 w-6 text-primary-foreground/20 animate-pulse delay-500" />
      <Car className="absolute top-1/3 right-8 h-10 w-10 text-primary-foreground/20 animate-pulse delay-1000" />
    </section>
  );
};

export default HeroSection;