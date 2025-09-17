import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';

// Import car images
import carBmw from '@/assets/car-bmw.jpg';
import carTesla from '@/assets/car-tesla.jpg';
import carMercedes from '@/assets/car-mercedes.jpg';
import carSuv from '@/assets/car-suv.jpg';

interface Car {
  id: string;
  brand: string;
  model: string;
  image: string;
  pricePerDay: number;
  location: string;
  rating: number;
  reviewCount: number;
  fuelType: string;
  passengers: number;
  available: boolean;
}

const mockCars: Car[] = [
  {
    id: '1',
    brand: 'BMW',
    model: '3 Series',
    image: carBmw,
    pricePerDay: 89,
    location: 'New York, NY',
    rating: 4.8,
    reviewCount: 124,
    fuelType: 'Gasoline',
    passengers: 5,
    available: true,
  },
  {
    id: '2',
    brand: 'Tesla',
    model: 'Model S',
    image: carTesla,
    pricePerDay: 149,
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviewCount: 89,
    fuelType: 'Electric',
    passengers: 5,
    available: true,
  },
  {
    id: '3',
    brand: 'Mercedes-Benz',
    model: 'C-Class Convertible',
    image: carMercedes,
    pricePerDay: 129,
    location: 'Miami, FL',
    rating: 4.7,
    reviewCount: 156,
    fuelType: 'Gasoline',
    passengers: 4,
    available: false,
  },
  {
    id: '4',
    brand: 'Range Rover',
    model: 'Evoque',
    image: carSuv,
    pricePerDay: 119,
    location: 'Denver, CO',
    rating: 4.6,
    reviewCount: 93,
    fuelType: 'Gasoline',
    passengers: 7,
    available: true,
  },
];

const Home = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    // In a real app, this would navigate to the car details page
    console.log('Selected car:', car);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Cars Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Featured <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Vehicles</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our premium collection of vehicles, carefully selected for your comfort and style.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-ghost"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>{mockCars.filter(car => car.available).length} cars available</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="input-premium text-sm">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* Car Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mockCars.map((car, index) => (
              <div key={car.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <CarCard
                  car={car}
                  onSelect={handleCarSelect}
                />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <Button className="btn-hero px-12 py-4 text-lg">
              Load More Cars
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Choose <span className="text-primary">CarRent</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make car rental simple, secure, and affordable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Premium Fleet</h3>
              <p className="text-muted-foreground">
                Choose from our carefully maintained collection of premium vehicles.
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Instant Booking</h3>
              <p className="text-muted-foreground">
                Book your car instantly with secure payment and immediate confirmation.
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-success to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Fully Insured</h3>
              <p className="text-muted-foreground">
                All vehicles come with comprehensive insurance for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;