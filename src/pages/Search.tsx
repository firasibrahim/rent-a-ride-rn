import { useState } from 'react';
import { Search as SearchIcon, Filter, MapPin, Car, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CarCard from '@/components/CarCard';

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

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [passengers, setPassengers] = useState('');

  const brands = ['BMW', 'Tesla', 'Mercedes-Benz', 'Range Rover', 'Audi', 'Lexus'];
  const fuelTypes = ['Gasoline', 'Electric', 'Hybrid', 'Diesel'];

  const handleCarSelect = (car: Car) => {
    console.log('Selected car:', car);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedBrand('');
    setFuelType('');
    setPassengers('');
  };

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Find Your <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Perfect Car</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Use our advanced filters to discover the ideal vehicle for your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search Query */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by brand, model..."
                      className="pl-10 input-premium"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City or airport"
                      className="pl-10 input-premium"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Price Range (per day)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min"
                        type="number"
                        className="pl-10 input-premium"
                      />
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max"
                        type="number"
                        className="pl-10 input-premium"
                      />
                    </div>
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full input-premium"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fuel Type
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full input-premium"
                  >
                    <option value="">All Types</option>
                    {fuelTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full input-premium"
                  >
                    <option value="">Any</option>
                    <option value="2">2+ seats</option>
                    <option value="4">4+ seats</option>
                    <option value="5">5+ seats</option>
                    <option value="7">7+ seats</option>
                  </select>
                </div>

                <Button className="w-full btn-hero">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {mockCars.filter(car => car.available).length} cars available
                </h2>
                <p className="text-muted-foreground">Showing results for your search</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="input-premium text-sm">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                  <option>Distance</option>
                </select>
              </div>
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockCars.map((car, index) => (
                <div key={car.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CarCard
                    car={car}
                    onSelect={handleCarSelect}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12 space-x-2">
              <Button variant="outline" className="btn-ghost" disabled>
                Previous
              </Button>
              <Button className="btn-hero w-10 h-10 p-0">1</Button>
              <Button variant="outline" className="btn-ghost w-10 h-10 p-0">2</Button>
              <Button variant="outline" className="btn-ghost w-10 h-10 p-0">3</Button>
              <Button variant="outline" className="btn-ghost">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;