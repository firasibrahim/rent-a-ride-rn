import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Car, CreditCard, Settings, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    memberSince: '2023-01-15',
    totalBookings: 12,
    totalSpent: 2450,
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to the API
    console.log('Saving user data:', userData);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    {
      icon: Car,
      label: 'Total Bookings',
      value: userData.totalBookings,
      color: 'text-primary',
    },
    {
      icon: CreditCard,
      label: 'Total Spent',
      value: `$${userData.totalSpent}`,
      color: 'text-accent',
    },
    {
      icon: Calendar,
      label: 'Member Since',
      value: new Date(userData.memberSince).getFullYear(),
      color: 'text-success',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24 pb-20 lg:pb-8">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            My <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your account settings and view your rental history.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-foreground">Personal Information</h2>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={isEditing ? 'btn-hero' : 'btn-ghost'}
                >
                  {isEditing ? (
                    'Save Changes'
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {userData.firstName[0]}{userData.lastName[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {userData.firstName} {userData.lastName}
                    </h3>
                    <p className="text-muted-foreground">Premium Member</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={userData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 input-premium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={userData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 input-premium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 input-premium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={userData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 input-premium"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={userData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 input-premium"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSave} className="btn-hero">
                      Save Changes
                    </Button>
                    <Button 
                      onClick={() => setIsEditing(false)} 
                      variant="outline" 
                      className="btn-ghost"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm mt-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Security</h2>
              
              <div className="space-y-4">
                <Button className="w-full btn-ghost justify-start">
                  <Settings className="h-4 w-4 mr-3" />
                  Change Password
                </Button>
                
                <Button className="w-full btn-ghost justify-start">
                  <CreditCard className="h-4 w-4 mr-3" />
                  Payment Methods
                </Button>
                
                <Button className="w-full btn-ghost justify-start text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-6">Account Overview</h3>
              
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mt-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h3>
              
              <div className="space-y-3">
                <Button className="w-full btn-hero">
                  Browse Cars
                </Button>
                
                <Button className="w-full btn-ghost">
                  View Bookings
                </Button>
                
                <Button className="w-full btn-ghost">
                  Support Center
                </Button>
              </div>
            </div>

            {/* Membership Badge */}
            <div className="bg-gradient-to-r from-accent to-accent-light rounded-2xl p-6 mt-6 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="text-lg font-semibold text-accent-foreground mb-2">Premium Member</h3>
              <p className="text-accent-foreground/80 text-sm">
                Enjoy exclusive discounts and priority support!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;