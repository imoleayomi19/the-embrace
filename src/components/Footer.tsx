import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Globe,
} from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: '/about' },
    { name: 'Our Services', to: '/services' },
    { name: 'Projects', to: '/projects' },
    { name: 'Contact', to: '/contact' },
  ];

  const services = [
    { name: 'Residential Solar', to: '/services' },
    { name: 'Commercial Solar', to: '/services' },
    { name: 'Battery Storage', to: '/services' },
    { name: 'Maintenance', to: '/services' },
    { name: 'Energy Audits', to: '/services' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-100 min-h-[calc(100vh-80px)] flex flex-col justify-between pt-20 pb-10 relative overflow-hidden">
      {/* Subtle background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-950 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col flex-grow justify-between">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-12 border-b border-slate-800/60">

          {/* Column 1: Brand & About */}
          <div className="lg:col-span-4 space-y-4 items-center flex flex-col">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-2xl bg-white/5 p-3 shadow-lg transition hover:bg-white/10 border border-white/5"
            >
              <img
                src="./embracewhite.png"
                alt="Embrace Technologies"
                className="h-39 w-auto object-contain"
              />
            </Link>
            {/* Body Text - Poppins Regular */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },

              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 text-slate-400 transition-all hover:bg-secondary hover:text-white hover:scale-110"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-slate-400 transition-all hover:bg-secondary hover:text-white hover:scale-110"
                aria-label="Embrace Technologies TikTok profile"
              >
                <img
                  src="/tiktok-icon.png"
                  alt="TikTok"
                  className="w-4 h-4 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            {/* Section Title - Montserrat Bold */}
            <h4 className="text-sm font-montserrat font-bold uppercase tracking-widest text-white mb-4">
              Quick Links
            </h4>
            {/* Navigation Menu - Montserrat Medium */}
            <ul className="space-y-2 text-sm text-slate-400 font-montserrat font-medium">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="transition-all hover:text-secondary hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-montserrat font-bold uppercase tracking-widest text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 font-montserrat font-medium">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link
                    to={service.to}
                    className="transition-all hover:text-secondary hover:translate-x-1 inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-montserrat font-bold uppercase tracking-widest text-white mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-montserrat font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                {/* Body Text - Poppins Regular */}
                <span className="leading-relaxed font-poppins font-normal">
                  116 Ikorodu-Lagos Road, Haruna Bustop, <br /> Ikorodu, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+2347061451583" className="transition-colors hover:text-secondary block font-poppins font-normal">
                    +234 706 145 1583
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:Info@embracetechng.com"
                    className="transition-colors hover:text-secondary break-all font-poppins font-semibold text-slate-300"
                  >
                    Info@embracetechng.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:embracetechnologiesltd@gmail.com"
                    className="transition-colors hover:text-secondary font-poppins font-semibold text-slate-300"
                  >
                    embracetechnologiesltd@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-secondary shrink-0" />
                <a
                  href="https://www.embracetechng.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-secondary break-all font-poppins font-semibold text-slate-300"
                >
                  www.embracetechng.com
                </a>
              </li>
              <li className="pt-2">
                {/* Button - Montserrat SemiBold */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/20 px-5 py-2.5 text-sm font-montserrat font-semibold text-secondary transition-all hover:bg-secondary hover:text-white hover:shadow-lg"
                >
                  Enquire Now
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-slate-500 text-xs font-poppins font-normal">
          <p>© {new Date().getFullYear()} Embrace Technologies Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy" className="transition-colors hover:text-white font-montserrat font-medium">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-white font-montserrat font-medium">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}