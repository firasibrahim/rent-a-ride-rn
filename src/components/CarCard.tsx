import { Star, MapPin, Fuel, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
}

const CarCard = ({ car, onSelect }: CarCardProps) => {
  return (
    <div className="car-card p-0 overflow-hidden animate-fade-in">
      <div className="relative">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="car-card-image"
        />
        <div className="absolute top-3 right-3">
          {car.available ? (
            <span className="badge-success">Available</span>
          ) : (
            <span className="badge-destructive">Unavailable</span>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {car.brand} {car.model}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">{car.location}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${car.pricePerDay}
            </div>
            <div className="text-sm text-muted-foreground">per day</div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-accent fill-current" />
            <span className="font-medium">{car.rating}</span>
            <span>({car.reviewCount})</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Fuel className="h-4 w-4" />
            <span>{car.fuelType}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{car.passengers} seats</span>
          </div>
        </div>

        <Button 
          onClick={() => onSelect(car)}
          disabled={!car.available}
          className="w-full btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {car.available ? 'View Details' : 'Unavailable'}
        </Button>
      </div>
    </div>
  );
};

export default CarCard;