/**
- @license
- SPDX-License-Identifier: Apache-2.0
 */
// src/App.tsx — Componente raíz bilingüe (ES / EN) para The Big Chair

import { useState } from 'react';
import { Navbar, NavbarLanguage } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PerspectiveSection } from './components/PerspectiveSection';
import { SolutionsSection } from './components/SolutionsSection';
import { MethodologySection } from './components/MethodologySection';
import { MethodEllaSection } from './components/MethodEllaSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import CookieBanner from './components/CookieBanner';
import { InterestOption, LegalTabId } from './data/content';

export type AppLanguage = NavbarLanguage;

export default function App() {
  const [language, setLanguage] = useState<AppLanguage>('es');
  const [selectedInterest, setSelectedInterest] =
    useState<InterestOption>('Inmersión 360°');
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTabId>('aviso');
  const [cookieBannerForce, setCookieBannerForce] = useState(false);

  const handleOpenLegal = (tab: LegalTabId) => {
    setLegalTab(tab);
    setLegalOpen(true);
  };

  return (
    // Inicio: contenedor principal de la aplicación
    <div className="min-h-screen flex flex-col bg-[#F5F2EC] text-[#020202]">
      <Navbar
        language={language}
        onChangeLanguage={setLanguage}
        onOpenLegal={handleOpenLegal}
      />

      <main className="flex-1">
        <HeroSection language={language} />
        <PerspectiveSection language={language} />
        <SolutionsSection
          language={language}
          onSelectInterest={setSelectedInterest}
        />
        <MethodologySection language={language} />
        <MethodEllaSection
          language={language}
          onSelectElla={setSelectedInterest}
        />
        <TeamSection language={language} />
        <ContactSection
          language={language}
          selectedInterest={selectedInterest}
          onInterestChange={setSelectedInterest}
          onOpenLegal={handleOpenLegal}
        />
      </main>

      <Footer
        language={language}
        onOpenLegal={handleOpenLegal}
        onOpenCookieSettings={() => setCookieBannerForce(true)}
      />

      <LegalModal
        language={language}
        isOpen={legalOpen}
        activeTab={legalTab}
        onSelectTab={setLegalTab}
        onClose={() => setLegalOpen(false)}
      />

      <CookieBanner
        language={language}
        isOpenForce={cookieBannerForce}
        onCloseForce={() => setCookieBannerForce(false)}
        onOpenCookiePolicy={() => handleOpenLegal('cookies')}
      />
    </div>
    // Fin: contenedor principal de la aplicación
  );
}