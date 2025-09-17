import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Fuel, Users, Calendar, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock car data (in a real app, this would come from an API)
const carDetails = {
  id: '1',
  brand: 'BMW',
  model: '3 Series',
  year: 2024,
  images: [
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
  ],
  pricePerDay: 89,
  location: 'New York, NY',
  rating: 4.8,
  reviewCount: 124,
  fuelType: 'Gasoline',
  passengers: 5,
  transmission: 'Automatic',
  mileage: '28 MPG',
  features: [
    'GPS Navigation',
    'Bluetooth',
    'Air Conditioning',
    'Backup Camera',
    'Premium Sound System',
    'Leather Seats',
    'Sunroof',
    'Cruise Control',
  ],
  description: 'Experience luxury and performance with the BMW 3 Series. This premium sedan offers exceptional comfort, advanced technology, and dynamic driving experience perfect for business trips or leisure travel.',
  provider: {
    name: 'Premium Car Rentals',
    rating: 4.9,
    responseTime: '< 1 hour',
  },
  available: true,
};

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [totalDays, setTotalDays] = useState(1);

  const calculateTotal = () => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD.getTime() - pickup.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays || 1);
      return diffDays * carDetails.pricePerDay;
    }
    return carDetails.pricePerDay;
  };

  const handleBookNow = () => {
    // In a real app, this would navigate to the booking confirmation page
    console.log('Booking car:', { carId: id, pickupDate, returnDate, totalDays });
    navigate('/booking-confirmation');
  };

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 btn-ghost"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cars
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Car Images & Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4 rounded-2xl overflow-hidden">
                <img
                  src={carDetails.images[selectedImage]}
                  alt={`${carDetails.brand} ${carDetails.model}`}
                  className="w-full h-80 md:h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="badge-success">Available</span>
                </div>
              </div>
              
              <div className="flex space-x-4 overflow-x-auto">
                {carDetails.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {carDetails.year} {carDetails.brand} {carDetails.model}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{carDetails.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span className="font-medium">{carDetails.rating}</span>
                    <span>({carDetails.reviewCount} reviews)</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {carDetails.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-foreground">{carDetails.passengers}</div>
                  <div className="text-sm text-muted-foreground">Passengers</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <Fuel className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-foreground">{carDetails.fuelType}</div>
                  <div className="text-sm text-muted-foreground">Fuel Type</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <span className="text-2xl mb-2 block">⚙️</span>
                  <div className="font-semibold text-foreground">{carDetails.transmission}</div>
                  <div className="text-sm text-muted-foreground">Transmission</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <span className="text-2xl mb-2 block">⛽</span>
                  <div className="font-semibold text-foreground">{carDetails.mileage}</div>
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {carDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Provider Info */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Car Provider</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{carDetails.provider.name}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span className="text-muted-foreground">{carDetails.provider.rating} rating</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Responds within {carDetails.provider.responseTime}
                    </div>
                  </div>
                  <Button variant="outline" className="btn-ghost">
                    Contact Provider
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  ${carDetails.pricePerDay}
                  <span className="text-lg font-normal text-muted-foreground">/day</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-sm text-muted-foreground">Fully insured</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Pick-up Date
                  </label>
                  <Input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="input-premium"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Return Date
                  </label>
                  <Input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="input-premium"
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                  />
                </div>

                {pickupDate && returnDate && (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Rental Duration:</span>
                      <span className="font-semibold">{totalDays} days</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Daily Rate:</span>
                      <span className="font-semibold">${carDetails.pricePerDay}</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">Total:</span>
                        <span className="text-2xl font-bold text-primary">${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleBookNow}
                  disabled={!pickupDate || !returnDate}
                  className="w-full btn-hero disabled:opacity-50"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>

                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Free cancellation up to 24 hours before pickup
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;