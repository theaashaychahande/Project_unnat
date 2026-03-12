import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, CheckCircle, Lightbulb, Droplet, Milestone, Trash2, Zap, TreePine, Building, Globe } from 'lucide-react';
import { useAppContext } from '../AppContext';

type Language = 'en' | 'hi' | 'mr';

const translations = {
  en: {
    nav: {
      title: "Project Unnat",
      login: "Login",
      register: "Register",
      dashboard: "Go to Dashboard"
    },
    hero: {
      badge: "🇮🇳 Powered by Digital India",
      title: "Citizen Grievance System",
      subtitle: "Citizen Complaint & Governance Platform",
      description: "A transparent platform for citizens of Nagpur to raise civic issues and track their resolution in real time.",
      fileComplaint: "File a Complaint",
      trackComplaint: "Track Your Complaint",
      languages: "Available in Hindi · Marathi · English"
    },
    stats: {
      wards: "Municipal Wards",
      filed: "Complaints Filed",
      rate: "Resolution Rate",
      registered: "Citizens Registered"
    },
    howItWorks: {
      title: "How It Works",
      step1: {
        title: "Register with Aadhaar verification",
        desc: "Secure your identity and get started with a simple, verified registration process."
      },
      step2: {
        title: "Submit your complaint with photo and location",
        desc: "Easily report issues by providing details, photos, and precise location data."
      },
      step3: {
        title: "Track resolution in real time",
        desc: "Monitor the progress of your complaints and receive updates until resolution."
      }
    },
    categories: {
      title: "Report Issues Across All Civic Departments",
      roads: "Roads",
      water: "Water Supply",
      electricity: "Electricity",
      garbage: "Garbage",
      lights: "Street Lights",
      parks: "Parks",
      property: "Public Property",
      drainage: "Drainage"
    },
    footer: {
      motto: "Swachh Shasan. Swasth Nagrik.",
      about: "About Us",
      help: "Help & Support",
      rti: "RTI",
      privacy: "Privacy Policy",
      initiative: "A Digital India Initiative",
      rights: "© 2025 Nagpur Municipal Corporation. All rights reserved."
    }
  },
  hi: {
    nav: {
      title: "प्रोजेक्ट उन्नत",
      login: "लॉगिन",
      register: "पंजीकरण",
      dashboard: "डैशबोर्ड पर जाएं"
    },
    hero: {
      badge: "🇮🇳 डिजिटल इंडिया द्वारा संचालित",
      title: "नागरिक शिकायत प्रणाली",
      subtitle: "नागरिक शिकायत और शासन मंच",
      description: "नागुपर के नागरिकों के लिए नागरिक मुद्दों को उठाने और वास्तविक समय में उनके समाधान को ट्रैक करने के लिए एक पारदर्शी मंच।",
      fileComplaint: "शिकायत दर्ज करें",
      trackComplaint: "अपनी शिकायत ट्रैक करें",
      languages: "हिंदी · मराठी · अंग्रेजी में उपलब्ध"
    },
    stats: {
      wards: "नगरपालिका वार्ड",
      filed: "दर्ज की गई शिकायतें",
      rate: "समाधान दर",
      registered: "पंजीकृत नागरिक"
    },
    howItWorks: {
      title: "यह कैसे काम करता है",
      step1: {
        title: "आधार सत्यापन के साथ पंजीकरण करें",
        desc: "अपनी पहचान सुरक्षित करें और एक सरल, सत्यापित पंजीकरण प्रक्रिया के साथ शुरुआत करें।"
      },
      step2: {
        title: "फोटो और स्थान के साथ अपनी शिकायत दर्ज करें",
        desc: "विवरण, फोटो और सटीक स्थान डेटा प्रदान करके आसानी से मुद्दों की रिपोर्ट करें।"
      },
      step3: {
        title: "वास्तविक समय में समाधान ट्रैक करें",
        desc: "अपनी शिकायतों की प्रगति की निगरानी करें और समाधान तक अपडेट प्राप्त करें।"
      }
    },
    categories: {
      title: "सभी नागरिक विभागों में मुद्दों की रिपोर्ट करें",
      roads: "सड़कें",
      water: "जलापूर्ति",
      electricity: "बिजली",
      garbage: "कचरा",
      lights: "स्ट्रीट लाइट",
      parks: "पार्क",
      property: "सार्वजनिक संपत्ति",
      drainage: "निकासी"
    },
    footer: {
      motto: "स्वच्छ शासन। स्वस्थ नागरिक।",
      about: "हमारे बारे में",
      help: "सहायता और समर्थन",
      rti: "आरटीआई",
      privacy: "गोपनीयता नीति",
      initiative: "एक डिजिटल इंडिया पहल",
      rights: "© 2025 नागपुर नगर निगम। सर्वाधिकार सुरक्षित।"
    }
  },
  mr: {
    nav: {
      title: "प्रोजेक्ट उन्नत",
      login: "लॉगिन",
      register: "नोंदणी",
      dashboard: "डॅशबोर्डवर जा"
    },
    hero: {
      badge: "🇮🇳 डिजिटल इंडियाद्वारे समर्थित",
      title: "नागरिक तक्रार प्रणाली",
      subtitle: "नागरिक तक्रार आणि शासन मंच",
      description: "नागपूरच्या नागरिकांसाठी नागरी समस्या मांडण्यासाठी आणि त्यांच्या निवारणाचा रिअल टाइममध्ये मागोवा घेण्यासाठी एक पारदर्शक व्यासपीठ.",
      fileComplaint: "तक्रार नोंदवा",
      trackComplaint: "तुमच्या तक्रारीचा मागोवा घ्या",
      languages: "हिंदी · मराठी · इंग्रजीमध्ये उपलब्ध"
    },
    stats: {
      wards: "नगरपालिका वॉर्ड",
      filed: "दाखल तक्रारी",
      rate: "निवारण दर",
      registered: "नोंदणीकृत नागरिक"
    },
    howItWorks: {
      title: "हे कसे कार्य करते",
      step1: {
        title: "आधार पडताळणीसह नोंदणी करा",
        desc: "तुमची ओळख सुरक्षित करा आणि साध्या, पडताळणी केलेल्या नोंदणी प्रक्रियेसह सुरुवात करा."
      },
      step2: {
        title: "फोटो आणि ठिकाणासह तुमची तक्रार सबमिट करा",
        desc: "तपशील, फोटो आणि अचूक स्थान डेटा प्रदान करून सहजपणे समस्या कळवा."
      },
      step3: {
        title: "रिअल टाइममध्ये निवारणाचा मागोवा घ्या",
        desc: "तुमच्या तक्रारींच्या प्रगतीवर लक्ष ठेवा आणि निवारण होईपर्यंत अपडेट्स मिळवा."
      }
    },
    categories: {
      title: "सर्व नागरी विभागांमधील समस्यांची तक्रार करा",
      roads: "रस्ते",
      water: "पाणीपुरवठा",
      electricity: "वीज",
      garbage: "कचरा",
      lights: "स्ट्रीट लाइट",
      parks: "उद्याने",
      property: "सार्वजनिक मालमत्ता",
      drainage: "सांडपाणी निचरा"
    },
    footer: {
      motto: "स्वच्छ शासन. स्वस्थ नागरिक.",
      about: "आमच्याबद्दल",
      help: "मदत आणि समर्थन",
      rti: "आरआयटी",
      privacy: "गोपनीयता धोरण",
      initiative: "एक डिजिटल इंडिया उपक्रम",
      rights: "© 2025 नागपुर महानगरपालिका. सर्व हक्क राखीव."
    }
  }
};

const StatItem = ({ value, label, icon: Icon }: { value: string; label: string; icon?: React.ElementType }) => (
  <div className="text-center p-4">
    {Icon && <Icon className="text-gov-green-primary mx-auto mb-2" size={32} />}
    <p className="font-baskerville text-4xl font-bold text-gov-green-dark mb-1">{value}</p>
    <p className="text-gov-text-secondary text-sm">{label}</p>
  </div>
);

const CategoryTile = ({ icon: Icon, name }: { icon: React.ElementType; name: string }) => (
  <div className="card-gov p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-gov-green-primary">
    <Icon className="text-gov-green-primary mb-3" size={40} />
    <p className="text-gov-text-primary font-bold">{name}</p>
  </div>
);

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  const handleDashboardRedirect = () => {
    if (currentUser) {
      navigate(currentUser.role === 'Admin' ? '/admin-dashboard' : '/citizen-dashboard');
    }
  };

  const handleLoginClick = () => {
    if (currentUser) {
      handleDashboardRedirect();
    } else {
      navigate('/auth', { state: { login: true } });
    }
  };

  const handleRegisterClick = () => {
    if (currentUser) {
      handleDashboardRedirect();
    } else {
      navigate('/auth', { state: { register: true } });
    }
  };

  return (
    <div className="min-h-screen bg-gov-background font-noto text-gov-text-primary">
      {/* Navbar */}
      <nav className="bg-gov-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🇮🇳</span>
            <h1 className="font-baskerville text-2xl font-bold text-gov-green-dark">{t.nav.title}</h1>
          </div>
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="flex items-center space-x-2 bg-gov-background rounded-lg p-1 border border-gov-border">
              <Globe size={16} className="text-gov-green-primary ml-1" />
              <div className="flex space-x-1">
                {(['en', 'hi', 'mr'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      lang === l 
                        ? 'bg-gov-green-primary text-white' 
                        : 'text-gov-text-secondary hover:bg-gov-green-light hover:text-gov-green-dark'
                    }`}
                  >
                    {l === 'en' ? 'EN' : l === 'hi' ? 'HI' : 'MR'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button type="button" onClick={handleLoginClick} className="btn-gov-outline">
                {currentUser ? t.nav.dashboard : t.nav.login}
              </button>
              {!currentUser && (
                <button type="button" onClick={handleRegisterClick} className="btn-gov-primary">{t.nav.register}</button>
              )}
            </div>
          </div>
        </div>
        <div className="tricolor-strip">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <div className="card-gov p-8 md:p-16 max-w-4xl mx-auto">
            <p className="text-gov-green-primary font-mono text-sm mb-4 tracking-wider">{t.hero.badge}</p>
            <h2 className="font-tiro text-5xl md:text-6xl font-bold text-gov-green-dark leading-tight mb-4">
              {lang === 'en' ? t.hero.title : t.hero.title}
            </h2>
            <p className="text-2xl text-gov-text-secondary mb-6">{t.hero.subtitle}</p>
            <p className="text-gov-text-secondary max-w-2xl mx-auto mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button 
                type="button" 
                onClick={handleRegisterClick} 
                className="btn-gov-primary font-bold"
              >
                {currentUser ? t.nav.dashboard : t.hero.fileComplaint}
              </button>
              <button 
                type="button" 
                onClick={() => { 
                  if (currentUser) {
                    navigate(currentUser.role === 'Admin' ? '/admin-dashboard' : '/citizen-dashboard');
                  } else {
                    navigate('/auth', { state: { login: true } });
                  }
                }} 
                className="btn-gov-outline font-bold"
              >
                {t.hero.trackComplaint}
              </button>
            </div>
            <p className="text-gov-text-secondary text-sm font-mono">{t.hero.languages}</p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-gov-green-light py-8">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 divide-x divide-gov-border">
            <StatItem value="48" label={t.stats.wards} icon={Building} />
            <StatItem value="12,400+" label={t.stats.filed} icon={FileText} />
            <StatItem value="98%" label={t.stats.rate} icon={CheckCircle} />
            <StatItem value="32,000+" label={t.stats.registered} icon={Users} />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-6 py-16">
          <h3 className="section-heading-gov">{t.howItWorks.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-gov p-8 relative overflow-hidden hover:-translate-y-1 transition-transform">
              <span className="absolute -top-4 -left-4 text-8xl font-bold text-gov-border opacity-50">01</span>
              <h4 className="text-xl font-bold text-gov-green-dark mb-4">{t.howItWorks.step1.title}</h4>
              <p className="text-gov-text-secondary">{t.howItWorks.step1.desc}</p>
            </div>
            <div className="card-gov p-8 relative overflow-hidden hover:-translate-y-1 transition-transform">
              <span className="absolute -top-4 -left-4 text-8xl font-bold text-gov-border opacity-50">02</span>
              <h4 className="text-xl font-bold text-gov-green-dark mb-4">{t.howItWorks.step2.title}</h4>
              <p className="text-gov-text-secondary">{t.howItWorks.step2.desc}</p>
            </div>
            <div className="card-gov p-8 relative overflow-hidden hover:-translate-y-1 transition-transform">
              <span className="absolute -top-4 -left-4 text-8xl font-bold text-gov-border opacity-50">03</span>
              <h4 className="text-xl font-bold text-gov-green-dark mb-4">{t.howItWorks.step3.title}</h4>
              <p className="text-gov-text-secondary">{t.howItWorks.step3.desc}</p>
            </div>
          </div>
        </section>

        {/* Complaint Categories Section */}
        <section className="container mx-auto px-6 py-16">
          <h3 className="section-heading-gov">{t.categories.title}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <CategoryTile icon={Milestone} name={t.categories.roads} />
            <CategoryTile icon={Droplet} name={t.categories.water} />
            <CategoryTile icon={Zap} name={t.categories.electricity} />
            <CategoryTile icon={Trash2} name={t.categories.garbage} />
            <CategoryTile icon={Lightbulb} name={t.categories.lights} />
            <CategoryTile icon={TreePine} name={t.categories.parks} />
            <CategoryTile icon={Building} name={t.categories.property} />
            <CategoryTile icon={FileText} name={t.categories.drainage} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gov-green-dark text-white py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🇮🇳</span>
            <div>
              <h4 className="font-baskerville text-xl font-bold">{t.nav.title}</h4>
              <p className="text-sm text-white/70">{t.footer.motto}</p>
            </div>
          </div>
          <div className="text-center">
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline text-white/80">{t.footer.about}</a></li>
              <li><a href="#" className="hover:underline text-white/80">{t.footer.help}</a></li>
              <li><a href="#" className="hover:underline text-white/80">{t.footer.rti}</a></li>
              <li><a href="#" className="hover:underline text-white/80">{t.footer.privacy}</a></li>
            </ul>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/70 mb-2">{t.footer.initiative}</p>
            {/* GOI Logo Placeholder */}
            <div className="w-24 h-12 bg-white/10 ml-auto flex items-center justify-center text-white/50 text-xs rounded font-bold border border-white/20">GOI Logo</div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/50 text-xs uppercase tracking-widest font-bold">
          {t.footer.rights}
        </div>
      </footer>
    </div>
  );
};

export default Landing;
