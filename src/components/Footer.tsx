// import { Link } from 'react-router-dom';
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   MessageCircle,
// } from 'lucide-react';

// export function Footer() {
//   return (
//     <footer className="bg-slate-950 text-slate-100 pt-20 pb-10">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
//           <div className="space-y-6">
//             <Link
//               to="/"
//               className="inline-flex items-center justify-center rounded-3xl bg-white/10 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.25)] transition hover:bg-white/15">
//               <img
//                 src="./embracewhite.png"
//                 alt="Embrace Technologies"
//                 className="h-30 w-auto object-contain rounded-2xl"
//               />
//             </Link>
//             <p className="text-slate-400 font-montserrat text-sm leading-relaxed">
//               Empowering homes and businesses with clean, reliable solar and
//               security solutions. Partner with us for smarter energy and safer
//               spaces.
//             </p>
//             <div className="flex items-center gap-4">
//               <a
//                 href="#"
//                 className="text-slate-400 transition-colors hover:text-secondary">
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-slate-400 transition-colors hover:text-secondary">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-slate-400 transition-colors hover:text-secondary">
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-slate-400 transition-colors hover:text-secondary">
//                 <Linkedin className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-slate-400 transition-colors hover:text-secondary"
//                 aria-label="Embrace Technologies TikTok profile">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 256 256"
//                   fill="currentColor"
//                   className="w-5 h-5"
//                 >
//                   <path d="M218 53.4a93.4 93.4 0 0 1-60-21.1v69.4a53.6 53.6 0 1 1-53.5-53.5V112a93.4 93.4 0 0 1 113.9-58.6Zm-93 73.2a34.6 34.6 0 1 0 34.6 34.6V98.9a54 54 0 0 1-34.6-11Z" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">
//               Sitemap
//             </h4>
//             <ul className="space-y-3 text-sm text-slate-300 font-montserrat">
//               <li>
//                 <Link
//                   to="/"
//                   className="transition-colors hover:text-secondary">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="transition-colors hover:text-secondary">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/services"
//                   className="transition-colors hover:text-secondary">
//                   Our Services
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/projects"
//                   className="transition-colors hover:text-secondary">
//                   Projects
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="transition-colors hover:text-secondary">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">
//               Explore
//             </h4>
//             <ul className="space-y-3 text-sm text-slate-300 font-montserrat">
//               <li>
//                 <Link
//                   to="/services"
//                   className="transition-colors hover:text-secondary">
//                   Residential Solar
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/services"
//                   className="transition-colors hover:text-secondary">
//                   Commercial Solar
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/services"
//                   className="transition-colors hover:text-secondary">
//                   Battery Storage
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/services"
//                   className="transition-colors hover:text-secondary">
//                   Maintenance
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/services"
//                   className="transition-colors hover:text-secondary">
//                   Energy Audits
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">
//               Contact Information
//             </h4>
//             <ul className="space-y-5 text-sm text-slate-300 font-montserrat">
//               <li className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
//                 <span>
//                   116 Ikorodu-Lagos Road, Haruna Bustop,
//                   <br />
//                   Ikorodu, Lagos, Nigeria
//                 </span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
//                 <div className="flex flex-col gap-1">
//                   <a
//                     href="tel:+2347061451583"
//                     className="transition-colors hover:text-secondary">
//                     +234 706 145 1583
//                   </a>
//                   <a
//                     href="tel:+2348078954388"
//                     className="transition-colors hover:text-secondary">
//                     +234 807 895 4388
//                   </a>
//                   <a
//                     href="tel:+2349110152566"
//                     className="transition-colors hover:text-secondary">
//                     +234 911 015 2566
//                   </a>
//                 </div>
//               </li>
//               <li className="flex items-center gap-3">
//                 <MessageCircle className="w-5 h-5 text-secondary shrink-0" />
//                 <a
//                   href="https://wa.me/2347061451583?text=Hello%20Embrace%20Technologies%2C%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20information."
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="transition-colors hover:text-secondary">
//                   Chat on WhatsApp
//                 </a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail className="w-5 h-5 text-secondary shrink-0" />
//                 <a
//                   href="mailto:embracetechnologiesltd@gmail.com"
//                   className="transition-colors hover:text-secondary break-all">
//                   embracetechnologiesltd@gmail.com               </a>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
//                   Enquire Now
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-slate-400 text-sm">
//           <p>© {new Date().getFullYear()} Embrace Technologies. All rights reserved.</p>
//           <div className="flex flex-wrap items-center gap-6">
//             <Link
//               to="/"
//               className="transition-colors hover:text-white">
//               Privacy Policy
//             </Link>
//             <Link
//               to="/"
//               className="transition-colors hover:text-white">
//               Terms of Service
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

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
    <footer className="bg-slate-950 text-slate-100 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-950 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/60">

          {/* Column 1: Brand & About */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-2xl bg-white/5 p-3 shadow-lg transition hover:bg-white/10 border border-white/5"
            >
              <img
                src="./embracewhite.png"
                alt="Embrace Technologies"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 font-montserrat text-sm leading-relaxed max-w-sm">
              Empowering homes and businesses with clean, reliable solar and
              security solutions. Partner with us for smarter energy and safer
              spaces.
            </p>
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
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-slate-400 transition-all hover:bg-secondary hover:text-white hover:scale-110"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-slate-400 transition-all hover:bg-secondary hover:text-white hover:scale-110"
                aria-label="Embrace Technologies TikTok profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M218 53.4a93.4 93.4 0 0 1-60-21.1v69.4a53.6 53.6 0 1 1-53.5-53.5V112a93.4 93.4 0 0 1 113.9-58.6Zm-93 73.2a34.6 34.6 0 1 0 34.6 34.6V98.9a54 54 0 0 1-34.6-11Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-montserrat">
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
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-6">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-montserrat">
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
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4 text-sm text-slate-400 font-montserrat">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  116 Ikorodu-Lagos Road, Haruna Bustop, <br /> Ikorodu, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+2347061451583" className="transition-colors hover:text-secondary block">
                    +234 706 145 1583
                  </a>
                  <a href="tel:+2348078954388" className="transition-colors hover:text-secondary block">
                    +234 807 895 4388
                  </a>
                  <a href="tel:+2349110152566" className="transition-colors hover:text-secondary block">
                    +234 911 015 2566
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-secondary shrink-0" />
                <a
                  href="https://wa.me/2347061451583?text=Hello%20Embrace%20Technologies%2C%20I%20am%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20information."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-secondary"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:Info@embracetechng.com"
                    className="transition-colors hover:text-secondary break-all font-medium text-slate-300"
                  >
                    Info@embracetechng.com
                  </a>
                  <a
                    href="mailto:embracetechnologiesltd@gmail.com"
                    className="transition-colors hover:text-secondary break-all text-xs text-slate-500"
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
                  className="transition-colors hover:text-secondary break-all font-medium text-slate-300"
                >
                  www.embracetechng.com
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/20 px-5 py-2.5 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-white hover:shadow-lg"
                >
                  Enquire Now
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-slate-500 text-sm font-montserrat">
          <p>© {new Date().getFullYear()} Embrace Technologies Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
