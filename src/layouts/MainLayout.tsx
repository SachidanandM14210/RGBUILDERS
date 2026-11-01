import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { api } from '../lib/api';
import { CompanySettings } from '../types';

export function MainLayout() {
  const [settings, setSettings] = useState<CompanySettings | undefined>(undefined);

  useEffect(() => {
    api.getCompanySettings()
      .then((res) => {
        if (res.success && res.settings) {
          setSettings(res.settings);
        }
      })
      .catch((err) => {
        console.warn('Could not load company settings, using defaults.', err);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#222222]">
      <Navbar companyPhone={settings?.phone} />
      <main className="flex-grow">
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings} />
      <WhatsAppButton phoneNumber={settings?.whatsapp} />
    </div>
  );
}
