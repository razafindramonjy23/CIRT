import { MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const ministries = [
    { key: 'footer.presidency', href: '#' },
    { key: 'footer.interior', href: '#' },
    { key: 'footer.economy', href: '#' },
    { key: 'footer.education', href: '#' },
  ];

  const services = [
    { key: 'footer.health', href: '#' },
    { key: 'footer.telecom', href: '#' },
    { key: 'footer.digital', href: '#' },
  ];

  const links = [
    { key: 'footer.bank', href: '#' },
    { key: 'footer.edbm', href: '#' },
    { key: 'footer.evisa', href: '#' },
    { key: 'footer.tourism', href: '#' },
  ];

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-foreground rounded-xl flex items-center justify-center text-foreground font-bold text-lg">
              </div>
              <span className="font-semibold text-lg">{t('footer.presidency')}</span>
            </div>
            <div className="space-y-4 text-primary-foreground/70">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Village des Jeux Ankorondrano, Bâtiment D1, Antananarivo 101</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>contact@digital.gov.mg</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+261 32 03 846 40</span>
              </p>
            </div>
          </div>

          {/* Ministries */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t('footer.ministries')}</h4>
            <ul className="space-y-3">
              {ministries.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t('footer.links')}</h4>
            <ul className="space-y-3">
              {links.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-primary-foreground/50 text-sm">
            {t('footer.presidency')} — {t('footer.rights')} © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
