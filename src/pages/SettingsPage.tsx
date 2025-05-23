import React from 'react';
import SettingsPanel from '../components/settings/SettingsPanel';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sesuaikan pengalaman Aisky Anda
        </p>
      </div>
      
      <SettingsPanel />
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h2 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
          Tentang Aisky
        </h2>
        <p className="text-blue-700 dark:text-blue-400 mb-2">
          Aisky adalah AI website UI yang di design oleh Dzarel menggunakan API resmi Gemini. 
          Platform ini dirancang untuk memberikan pengalaman interaksi yang intuitif dan cerdas, 
          memadukan teknologi AI terkini dengan antarmuka yang modern dan responsif.
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-500">
          Versi: 1.0.0 | Made with ❤️ by DzarelDeveloper
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;