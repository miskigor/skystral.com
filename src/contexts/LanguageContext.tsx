import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de' | 'hr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'site.title': 'SKYSTRAL',
    'site.subtitle': 'MARKETING',
    'landing.hero': 'Empowering brands with data-driven marketing solutions',
    'landing.description': 'Crafting strategies that connect with audiences, impactful connections that drive performance and progress, developing strategies that resonate, deliver foster meaningful growth, and tangible results.',
    'landing.features.title': 'All the tools you need to grow your brand',
    'landing.features.forum': 'Community forum and discussions',
    'landing.features.strategies': 'Marketing strategies',
    'landing.features.analytics': 'Campaign analytics',
    'landing.features.tools': 'Growth tools',
    'landing.features.discussions': 'Private discussions',
    'landing.cta': 'APPLY NOW',
    'landing.apply': 'APPLY TODAY',
    'landing.services.tiktok.title': 'TikTok Ads',
    'landing.services.tiktok.description': 'Leverage TikTok\'s powerful algorithm to reach a highly engaged audience with creative, short-form video ads that capture attention and drive conversions.',
    'landing.services.facebook.title': 'Facebook Campaigns',
    'landing.services.facebook.description': 'Create targeted campaigns on Facebook that connect with the right audience, increasing engagement and driving measurable results for your brand.',
    'landing.services.email.title': 'Email and SMS',
    'landing.services.email.description': 'Reach your audience directly through personalized email and SMS campaigns that drive engagement, increase conversions, and nurture customer relationships.',
    'landing.growth.subtitle': 'Everything you need',
    'landing.growth.title': 'Real and consistent growth',
    'landing.growth.description': 'Unlock your brand\'s full potential with tailored strategies that drive sustainable growth. From increasing engagement to improving ROI, we provide the tools and expertise to help you succeed in a competitive digital landscape.',
    'landing.rights': 'ALL RIGHTS RESERVED',
    'auth.login': 'LOGIN',
    'auth.login.subtitle': 'Enter the Skystral community',
    'auth.register': 'REGISTER',
    'auth.register.subtitle': 'Join the Skystral community',
    'auth.email': 'EMAIL',
    'auth.password': 'PASSWORD',
    'auth.username': 'USERNAME',
    'auth.login.button': 'LOG IN',
    'auth.register.button': 'REGISTER',
    'auth.loading': 'LOADING...',
    'auth.no.account': 'Don\'t have an account?',
    'auth.have.account': 'Already have an account?',
    'auth.register.link': 'Register',
    'auth.login.link': 'Log in',
    'forum.title': 'SKYSTRAL FORUM',
    'forum.logout': 'LOGOUT',
    'forum.topics': 'TOPICS',
    'forum.new.topic': 'NEW TOPIC',
    'forum.topic.placeholder': 'Topic title...',
    'forum.create': 'CREATE',
    'forum.cancel': 'CANCEL',
    'forum.no.topics': 'No topics. Be the first to start a discussion!',
    'forum.responses': 'responses',
    'forum.select.topic': 'SELECT A TOPIC',
    'forum.select.description': 'Select a topic from the left or create a new one to start a discussion',
    'forum.no.responses': 'No responses yet. Be the first!',
    'forum.reply.placeholder': 'Write your response...',
    'forum.post.reply': 'POST REPLY',
    'forum.login.to.reply': 'Please log in or register to participate in discussions',
    'loading': 'LOADING...',
  },
  de: {
    'site.title': 'SKYSTRAL',
    'site.subtitle': 'MARKETING',
    'landing.hero': 'Marken durch datengetriebene Marketinglösungen stärken',
    'landing.description': 'Wir entwickeln Strategien, die Zielgruppen ansprechen, wirkungsvolle Verbindungen schaffen, die Leistung und Fortschritt fördern, Strategien entwickeln, die resonieren, sinnvolles Wachstum fördern und greifbare Ergebnisse liefern.',
    'landing.features.title': 'Alle Tools, die Sie brauchen, um Ihre Marke wachsen zu lassen',
    'landing.features.forum': 'Community-Forum und Diskussionen',
    'landing.features.strategies': 'Marketing-Strategien',
    'landing.features.analytics': 'Kampagnenanalysen',
    'landing.features.tools': 'Wachstums-Tools',
    'landing.features.discussions': 'Private Diskussionen',
    'landing.cta': 'JETZT BEWERBEN',
    'landing.apply': 'HEUTE BEWERBEN',
    'landing.services.tiktok.title': 'TikTok Ads',
    'landing.services.tiktok.description': 'Nutzen Sie TikToks leistungsstarken Algorithmus, um ein hoch engagiertes Publikum mit kreativen Kurzvideos zu erreichen, die Aufmerksamkeit erregen und Conversions steigern.',
    'landing.services.facebook.title': 'Facebook Kampagnen',
    'landing.services.facebook.description': 'Erstellen Sie gezielte Kampagnen auf Facebook, die mit der richtigen Zielgruppe in Kontakt treten, das Engagement erhöhen und messbare Ergebnisse für Ihre Marke erzielen.',
    'landing.services.email.title': 'E-Mail und SMS',
    'landing.services.email.description': 'Erreichen Sie Ihr Publikum direkt durch personalisierte E-Mail- und SMS-Kampagnen, die das Engagement fördern, Conversions erhöhen und Kundenbeziehungen pflegen.',
    'landing.growth.subtitle': 'Alles, was Sie brauchen',
    'landing.growth.title': 'Echtes und konsistentes Wachstum',
    'landing.growth.description': 'Erschließen Sie das volle Potenzial Ihrer Marke mit maßgeschneiderten Strategien, die nachhaltiges Wachstum fördern. Von der Steigerung des Engagements bis zur Verbesserung des ROI bieten wir die Tools und das Fachwissen, um Ihnen zu helfen, in einer wettbewerbsintensiven digitalen Landschaft erfolgreich zu sein.',
    'landing.rights': 'ALLE RECHTE VORBEHALTEN',
    'auth.login': 'ANMELDEN',
    'auth.login.subtitle': 'Treten Sie der Skystral Community bei',
    'auth.register': 'REGISTRIEREN',
    'auth.register.subtitle': 'Werden Sie Teil der Skystral Community',
    'auth.email': 'E-MAIL',
    'auth.password': 'PASSWORT',
    'auth.username': 'BENUTZERNAME',
    'auth.login.button': 'ANMELDEN',
    'auth.register.button': 'REGISTRIEREN',
    'auth.loading': 'LÄDT...',
    'auth.no.account': 'Kein Konto?',
    'auth.have.account': 'Bereits ein Konto?',
    'auth.register.link': 'Registrieren',
    'auth.login.link': 'Anmelden',
    'forum.title': 'SKYSTRAL FORUM',
    'forum.logout': 'ABMELDEN',
    'forum.topics': 'THEMEN',
    'forum.new.topic': 'NEUES THEMA',
    'forum.topic.placeholder': 'Thema Titel...',
    'forum.create': 'ERSTELLEN',
    'forum.cancel': 'ABBRECHEN',
    'forum.no.topics': 'Keine Themen. Sei der Erste, der eine Diskussion startet!',
    'forum.responses': 'Antworten',
    'forum.select.topic': 'WÄHLEN SIE EIN THEMA',
    'forum.select.description': 'Wählen Sie ein Thema von links aus oder erstellen Sie ein neues, um eine Diskussion zu beginnen',
    'forum.no.responses': 'Noch keine Antworten. Sei der Erste!',
    'forum.reply.placeholder': 'Schreiben Sie Ihre Antwort...',
    'forum.post.reply': 'ANTWORT POSTEN',
    'forum.login.to.reply': 'Bitte melden Sie sich an oder registrieren Sie sich, um an Diskussionen teilzunehmen',
    'loading': 'LÄDT...',
  },
  hr: {
    'site.title': 'SKYSTRAL',
    'site.subtitle': 'MARKETING',
    'landing.hero': 'Osnažujemo brendove s marketinškim rješenjima temeljenima na podacima',
    'landing.description': 'Stvaramo strategije koje povezuju s publikom, impaktne veze koje pokreću performanse i napredak, razvijamo strategije koje odjekuju, potiču smisleni rast i pružaju opipljive rezultate.',
    'landing.features.title': 'Svi alati koji su ti potrebni za rast tvog brenda',
    'landing.features.forum': 'Forum zajednice i diskusije',
    'landing.features.strategies': 'Marketinške strategije',
    'landing.features.analytics': 'Analize kampanja',
    'landing.features.tools': 'Alati za rast',
    'landing.features.discussions': 'Privatne diskusije',
    'landing.cta': 'PRIJAVI SE SADA',
    'landing.apply': 'PRIJAVI SE DANAS',
    'landing.services.tiktok.title': 'TikTok Oglasi',
    'landing.services.tiktok.description': 'Iskoristi moćan TikTok algoritam kako bi dosegnuo/la visoko angažiranu publiku s kreativnim, kratkim video oglasima koji privlače pozornost i pokreću konverzije.',
    'landing.services.facebook.title': 'Facebook Kampanje',
    'landing.services.facebook.description': 'Kreiraj ciljane kampanje na Facebooku koje povezuju s pravom publikom, povećavajući angažman i donoseći mjerljive rezultate za tvoj brend.',
    'landing.services.email.title': 'Email i SMS',
    'landing.services.email.description': 'Dosegni svoju publiku direktno kroz personalizirane email i SMS kampanje koje povećavaju angažman, poboljšavaju konverzije i njeguju odnose s kupcima.',
    'landing.growth.subtitle': 'Sve što ti treba',
    'landing.growth.title': 'Pravi i dosljedni rast',
    'landing.growth.description': 'Otključaj puni potencijal svog brenda s prilagođenim strategijama koje pokreću održivi rast. Od povećanja angažmana do poboljšanja ROI-a, pružamo alate i stručnost koja ti je potrebna za uspjeh u konkurentnom digitalnom okruženju.',
    'landing.rights': 'SVA PRAVA PRIDRŽANA',
    'auth.login': 'PRIJAVA',
    'auth.login.subtitle': 'Uđi u Skystral zajednicu',
    'auth.register': 'REGISTRACIJA',
    'auth.register.subtitle': 'Pridruži se Skystral zajednici',
    'auth.email': 'EMAIL',
    'auth.password': 'LOZINKA',
    'auth.username': 'KORISNIČKO IME',
    'auth.login.button': 'PRIJAVI SE',
    'auth.register.button': 'REGISTRIRAJ SE',
    'auth.loading': 'UČITAVANJE...',
    'auth.no.account': 'Nemaš račun?',
    'auth.have.account': 'Već imaš račun?',
    'auth.register.link': 'Registriraj se',
    'auth.login.link': 'Prijavi se',
    'forum.title': 'SKYSTRAL FORUM',
    'forum.logout': 'ODJAVA',
    'forum.topics': 'TEME',
    'forum.new.topic': 'NOVA TEMA',
    'forum.topic.placeholder': 'Naslov teme...',
    'forum.create': 'KREIRAJ',
    'forum.cancel': 'ODUSTANI',
    'forum.no.topics': 'Nema tema. Budi prvi koji će započeti diskusiju!',
    'forum.responses': 'odgovora',
    'forum.select.topic': 'ODABERI TEMU',
    'forum.select.description': 'Odaberi temu s lijeve strane ili kreiraj novu da započneš diskusiju',
    'forum.no.responses': 'Nema još odgovora. Budi prvi!',
    'forum.reply.placeholder': 'Napiši svoj odgovor...',
    'forum.post.reply': 'OBJAVI ODGOVOR',
    'forum.login.to.reply': 'Molimo prijavi se ili registriraj kako bi sudjelovao/la u diskusijama',
    'loading': 'UČITAVANJE...',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bolt-now-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('bolt-now-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
