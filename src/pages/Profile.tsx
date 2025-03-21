
import React, { useState } from 'react';
import { getCurrentUser, updateProfile, logout } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, LogOut, Save, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Predefined avatar options
const avatarOptions = [
  "https://via.placeholder.com/150/19171b/ffffff?text=01",
  "https://via.placeholder.com/150/c72a55/ffffff?text=02",
  "https://via.placeholder.com/150/3498db/ffffff?text=03",
  "https://via.placeholder.com/150/2ecc71/ffffff?text=04",
  "https://via.placeholder.com/150/f39c12/ffffff?text=05",
  "https://via.placeholder.com/150/9b59b6/ffffff?text=06",
  "https://via.placeholder.com/150/1abc9c/ffffff?text=07",
  "https://via.placeholder.com/150/e74c3c/ffffff?text=08",
];

const Profile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [showCustomUrlInput, setShowCustomUrlInput] = useState(false);
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || avatarOptions[0],
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    setFormData({ ...formData, avatar: avatarUrl });
    setShowCustomUrlInput(false);
  };

  const handleCustomAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAvatarUrl(e.target.value);
  };

  const applyCustomAvatar = () => {
    if (customAvatarUrl.trim()) {
      setFormData({ ...formData, avatar: customAvatarUrl });
      setShowCustomUrlInput(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const updatedUser = await updateProfile(formData);
      if (updatedUser) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="ryugu-container py-10">
      <h1 className="text-3xl font-bold mb-10">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback className="bg-ryugu-red/50 text-white text-2xl">
                  {formData.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-white/70">{user.email}</p>
              <div className="mt-6 w-full">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-black/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-black/50"
                  />
                </div>
                
                {/* Avatar Selection */}
                <div className="space-y-4">
                  <Label>Select Avatar</Label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-3">
                    {avatarOptions.map((avatar, index) => (
                      <div 
                        key={index} 
                        className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
                          formData.avatar === avatar 
                            ? 'border-ryugu-red' 
                            : 'border-transparent hover:border-white/30'
                        }`}
                        onClick={() => handleAvatarSelect(avatar)}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={avatar} alt={`Avatar option ${index + 1}`} />
                          <AvatarFallback>
                            {index + 1}
                          </AvatarFallback>
                        </Avatar>
                        {formData.avatar === avatar && (
                          <div className="absolute inset-0 bg-ryugu-red/20 flex items-center justify-center">
                            <Check size={16} className="text-ryugu-red" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Custom URL option */}
                    <div 
                      className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
                        showCustomUrlInput || (!avatarOptions.includes(formData.avatar) && formData.avatar !== '')
                          ? 'border-ryugu-red' 
                          : 'border-transparent hover:border-white/30'
                      }`}
                      onClick={() => setShowCustomUrlInput(true)}
                    >
                      <div className="h-12 w-12 bg-black/50 flex items-center justify-center text-white/70">
                        <span className="text-xs">Custom</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Custom URL input */}
                  {showCustomUrlInput && (
                    <div className="mt-3 flex space-x-2">
                      <Input
                        placeholder="Enter custom avatar URL"
                        value={customAvatarUrl}
                        onChange={handleCustomAvatarChange}
                        className="bg-black/50 flex-grow"
                      />
                      <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={applyCustomAvatar}
                        className="whitespace-nowrap"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="mt-4 flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
