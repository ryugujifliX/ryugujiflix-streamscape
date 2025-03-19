
import { User } from './api';
import { toast } from "../components/ui/use-toast";

// Storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

// Get current authenticated user
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

// Login user
export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    // In a real app, you'd call your backend API here
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store auth token and user data
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${data.user.username}!`,
    });
    
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    
    // For demo purposes, we'll simulate a successful login
    // This would be removed in a real production app
    if (email === 'demo@example.com' && password === 'password') {
      const mockUser: User = {
        id: 'user123',
        username: 'DemoUser',
        email: 'demo@example.com',
        avatar: 'https://via.placeholder.com/150/19171b/ffffff?text=DU',
        watchlist: [1, 2, 5],
        watchHistory: [
          {
            animeId: 1,
            episodeId: 1,
            timestamp: 350,
            completed: true,
            lastWatched: new Date().toISOString()
          }
        ],
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(AUTH_TOKEN_KEY, 'mock_token_123');
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));
      
      toast({
        title: "Demo Login Successful",
        description: `Welcome to the demo, ${mockUser.username}!`,
      });
      
      return mockUser;
    }
    
    toast({
      title: "Login Failed",
      description: error instanceof Error ? error.message : "Invalid credentials",
      variant: "destructive",
    });
    
    return null;
  }
};

// Register user
export const register = async (username: string, email: string, password: string): Promise<User | null> => {
  try {
    // In a real app, you'd call your backend API here
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    
    // Store auth token and user data
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
    
    toast({
      title: "Registration Successful",
      description: `Welcome to RyuguJiFlix, ${data.user.username}!`,
    });
    
    return data.user;
  } catch (error) {
    console.error('Registration error:', error);
    
    // For demo purposes, we'll simulate a successful registration
    // This would be removed in a real production app
    const mockUser: User = {
      id: `user_${Date.now()}`,
      username,
      email,
      avatar: `https://via.placeholder.com/150/19171b/ffffff?text=${username.substring(0, 2).toUpperCase()}`,
      watchlist: [],
      watchHistory: [],
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(AUTH_TOKEN_KEY, `mock_token_${Date.now()}`);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));
    
    toast({
      title: "Demo Registration Successful",
      description: `Welcome to the demo, ${mockUser.username}!`,
    });
    
    return mockUser;
  }
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  
  toast({
    title: "Logged Out",
    description: "You have been successfully logged out.",
  });
  
  // Redirect to home page or login page
  window.location.href = '/';
};

// Update user profile
export const updateProfile = async (userData: Partial<User>): Promise<User | null> => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    // In a real app, you'd call your backend API here
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }

    const data = await response.json();
    
    // Update stored user data
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    return data.user;
  } catch (error) {
    console.error('Profile update error:', error);
    
    // For demo purposes, we'll simulate a successful update
    // This would be removed in a real production app
    const currentUser = getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
      
      toast({
        title: "Demo Profile Updated",
        description: "Your profile has been updated (demo mode).",
      });
      
      return updatedUser;
    }
    
    toast({
      title: "Update Failed",
      description: error instanceof Error ? error.message : "Failed to update profile",
      variant: "destructive",
    });
    
    return null;
  }
};

export default {
  isAuthenticated,
  getCurrentUser,
  login,
  register,
  logout,
  updateProfile
};
