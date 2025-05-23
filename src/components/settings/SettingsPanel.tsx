import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import Button from '../ui/Button';
import { Save, RotateCcw } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [localSettings, setLocalSettings] = React.useState(settings);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (field: keyof typeof localSettings, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value,
    }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    setSaved(true);
    
    // Reset saved status after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    resetSettings();
    setLocalSettings(settings);
    setSaved(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pengaturan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Theme Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tema
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={localSettings.theme === 'light'}
                onChange={() => handleChange('theme', 'light')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Terang</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={localSettings.theme === 'dark'}
                onChange={() => handleChange('theme', 'dark')}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Gelap</span>
            </label>
          </div>
        </div>
        
        {/* Language Selector */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bahasa
          </label>
          <select
            id="language"
            value={localSettings.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
          </select>
        </div>
        
        {/* AI Style */}
        <div>
          <label htmlFor="aiStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gaya AI
          </label>
          <select
            id="aiStyle"
            value={localSettings.aiStyle}
            onChange={(e) => handleChange('aiStyle', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="balanced">Seimbang</option>
            <option value="creative">Kreatif</option>
            <option value="precise">Presisi</option>
            <option value="friendly">Ramah</option>
            <option value="professional">Profesional</option>
          </select>
        </div>
        
        {/* Temperature Slider */}
        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Temperatur AI: {localSettings.temperature}
          </label>
          <input
            id="temperature"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={localSettings.temperature}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Lebih Prediktif</span>
            <span>Lebih Kreatif</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button 
            type="submit"
            rightIcon={<Save size={18} />}
            className={saved ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            {saved ? 'Tersimpan!' : 'Simpan Pengaturan'}
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            onClick={handleReset}
            rightIcon={<RotateCcw size={18} />}
          >
            Reset ke Default
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPanel;