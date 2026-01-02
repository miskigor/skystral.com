import { Link } from 'react-router-dom';
import { Zap, TrendingUp, BarChart3, MessageSquare, Instagram, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

export default function Landing() {
  const { t } = useLanguage();

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    { icon: TrendingUp, key: 'landing.features.strategies' },
    { icon: BarChart3, key: 'landing.features.analytics' },
    { icon: Wrench, key: 'landing.features.tools', isLink: true, onClick: scrollToServices },
    { icon: MessageSquare, key: 'landing.features.discussions' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute top-6 right-6">
        <LanguageSelector />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-[80%] mx-auto">
          <div className="flex justify-center mb-12">
            <Zap className="w-24 h-24 text-red-600" strokeWidth={2} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight">
            {t('site.title')}
          </h1>

          <div className="h-1 w-32 bg-red-600 mx-auto mb-6"></div>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-red-600">
            {t('site.subtitle')}
          </h2>
        </div>

        <div className="mb-16 -mx-4 lg:mx-0">
          <div className="border-2 border-red-600 p-1">
            <div className="border-2 border-white p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
                {t('landing.hero')}
              </h3>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 text-center">
                {t('landing.description')}
              </p>

              <div className="mb-12">
                <h4 className="text-2xl font-bold mb-8 text-center">
                  {t('landing.features.title')}
                </h4>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 border-l-4 border-red-600 pl-6 py-2"
                    >
                      {feature.icon && <feature.icon className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />}
                      {feature.isLink ? (
                        <button
                          onClick={feature.onClick}
                          className="text-lg font-semibold text-left hover:text-red-600 transition-colors"
                        >
                          {t(feature.key)}
                        </button>
                      ) : (
                        <span className="text-lg font-semibold">{t(feature.key)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-[80%] mx-auto">

          <div id="services" className="mb-16">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="border-2 border-white p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {t('landing.services.tiktok.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  {t('landing.services.tiktok.description')}
                </p>
              </div>

              <div className="border-2 border-white p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {t('landing.services.facebook.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  {t('landing.services.facebook.description')}
                </p>
              </div>

              <div className="border-2 border-white p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {t('landing.services.email.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  {t('landing.services.email.description')}
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="mb-12 -mx-4 lg:mx-0">
          <div className="border-2 border-red-600 p-1">
            <div className="border-2 border-white p-8 md:p-12 text-center">
              <p className="text-red-600 font-bold text-lg mb-4">
                {t('landing.growth.subtitle')}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                {t('landing.growth.title')}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {t('landing.growth.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-[80%] mx-auto">
          <div className="flex justify-center mb-16">
            <a
              href="https://form.typeform.com/to/rmjpZBRj"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white font-bold text-xl px-12 py-5 hover:bg-red-700 transition-colors border-4 border-red-600 hover:border-red-700 inline-block"
            >
              {t('landing.apply')}
            </a>
          </div>

          <div className="text-center">
            <div className="inline-block border-t-2 border-red-600 w-48 mb-6"></div>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2026 {t('site.title')}. {t('landing.rights')}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
