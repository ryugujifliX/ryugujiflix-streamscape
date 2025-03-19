
// User preference service for storing and retrieving user settings

// Types
export interface UserPreferences {
  theme: 'dark' | 'light';
  autoPlay: boolean;
  autoNextEpisode: boolean;
  defaultQuality: string;
  defaultSubtitleLanguage: string;
  defaultServer: string;
  notifications: boolean;
}

// Default preferences
const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  autoPlay: true,
  autoNextEpisode: true,
  defaultQuality: '720p',
  defaultSubtitleLanguage: 'English',
  defaultServer: 'VidStreaming',
  notifications: true
};

// Storage key
const PREFERENCES_STORAGE_KEY = 'user_preferences';

// Get user preferences
export const getUserPreferences = (): UserPreferences => {
  const storedPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
  
  if (storedPreferences) {
    try {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(storedPreferences) };
    } catch (error) {
      console.error('Error parsing stored preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  }
  
  return DEFAULT_PREFERENCES;
};

// Update user preferences
export const updateUserPreferences = (preferences: Partial<UserPreferences>): UserPreferences => {
  const currentPreferences = getUserPreferences();
  const updatedPreferences = { ...currentPreferences, ...preferences };
  
  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(updatedPreferences));
  
  return updatedPreferences;
};

// Reset preferences to default
export const resetPreferences = (): UserPreferences => {
  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
  return DEFAULT_PREFERENCES;
};

// Get specific preference
export const getPreference = <K extends keyof UserPreferences>(key: K): UserPreferences[K] => {
  const preferences = getUserPreferences();
  return preferences[key];
};

// Set specific preference
export const setPreference = <K extends keyof UserPreferences>(
  key: K, 
  value: UserPreferences[K]
): UserPreferences => {
  return updateUserPreferences({ [key]: value } as Partial<UserPreferences>);
};

export default {
  getUserPreferences,
  updateUserPreferences,
  resetPreferences,
  getPreference,
  setPreference
};
