import { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Booking {
  id: string;
  carBrand: string;
  carModel: string;
  carImage: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingDate: string;
}

const mockBookings: Booking[] = [
  {
    id: 'BK001',
    carBrand: 'BMW',
    carModel: '3 Series',
    carImage: '/api/placeholder/300/200',
    pickupDate: '2024-09-25',
    returnDate: '2024-09-30',
    pickupLocation: 'New York, NY',
    totalPrice: 445,
    status: 'confirmed',
    bookingDate: '2024-09-20',
  },
  {
    id: 'BK002',
    carBrand: 'Tesla',
    carModel: 'Model S',
    carImage: '/api/placeholder/300/200',
    pickupDate: '2024-10-15',
    returnDate: '2024-10-18',
    pickupLocation: 'Los Angeles, CA',
    totalPrice: 447,
    status: 'pending',
    bookingDate: '2024-09-18',
  },
  {
    id: 'BK003',
    carBrand: 'Range Rover',
    carModel: 'Evoque',
    carImage: '/api/placeholder/300/200',
    pickupDate: '2024-08-10',
    returnDate: '2024-08-15',
    pickupLocation: 'Denver, CO',
    totalPrice: 595,
    status: 'completed',
    bookingDate: '2024-08-05',
  },
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="badge-success flex items-center space-x-1">
            <CheckCircle className="h-3 w-3" />
            <span>Confirmed</span>
          </span>
        );
      case 'pending':
        return (
          <span className="badge-warning flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>Pending</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="badge-destructive flex items-center space-x-1">
            <XCircle className="h-3 w-3" />
            <span>Cancelled</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center space-x-1 bg-muted/50 text-muted-foreground border border-border px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle className="h-3 w-3" />
            <span>Completed</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredBookings = mockBookings.filter((booking) => {
    const today = new Date();
    const pickupDate = new Date(booking.pickupDate);
    
    if (activeTab === 'upcoming') {
      return pickupDate > today && booking.status !== 'cancelled' && booking.status !== 'completed';
    }
    if (activeTab === 'past') {
      return pickupDate <= today || booking.status === 'completed' || booking.status === 'cancelled';
    }
    return true; // 'all'
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24 pb-20 lg:pb-8">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            My <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Bookings</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your car rental reservations and view booking history.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-muted/30 rounded-xl p-1 inline-flex">
            {[
              { id: 'all', label: 'All Bookings' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'past', label: 'Past' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-6">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming reservations."
                : activeTab === 'past'
                ? "You don't have any past bookings."
                : "You haven't made any bookings yet."
              }
            </p>
            <Button className="btn-hero">
              Browse Cars
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking, index) => (
              <div
                key={booking.id}
                className="car-card p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Car Image & Info */}
                  <div className="lg:col-span-1">
                    <img
                      src={booking.carImage}
                      alt={`${booking.carBrand} ${booking.carModel}`}
                      className="w-full h-32 lg:h-24 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-foreground">
                      {booking.carBrand} {booking.carModel}
                    </h3>
                    <p className="text-sm text-muted-foreground">Booking #{booking.id}</p>
                  </div>

                  {/* Booking Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Pick-up</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(booking.pickupDate)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Return</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(booking.returnDate)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Location</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.pickupLocation}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Booked</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(booking.bookingDate)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        {getStatusBadge(booking.status)}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${booking.totalPrice}
                        </div>
                        <div className="text-sm text-muted-foreground">Total</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1 flex flex-col justify-center space-y-2">
                    {booking.status === 'confirmed' && (
                      <>
                        <Button className="btn-hero">
                          View Details
                        </Button>
                        <Button variant="outline" className="btn-ghost">
                          Cancel Booking
                        </Button>
                      </>
                    )}
                    {booking.status === 'pending' && (
                      <>
                        <Button className="btn-accent">
                          Complete Payment
                        </Button>
                        <Button variant="outline" className="btn-ghost">
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === 'completed' && (
                      <>
                        <Button className="btn-hero">
                          View Receipt
                        </Button>
                        <Button variant="outline" className="btn-ghost">
                          Leave Review
                        </Button>
                      </>
                    )}
                    {booking.status === 'cancelled' && (
                      <Button variant="outline" className="btn-ghost">
                        Book Again
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;