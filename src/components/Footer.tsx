import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-3xl bg-white/10 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.25)] transition hover:bg-white/15">
              <img
                src="./embracewhite.png"
                alt="Embrace Technologies"
                className="h-30 w-auto object-contain rounded-2xl"
              />
            </Link>
            <p className="text-slate-400 font-montserrat text-sm leading-relaxed">
              Empowering homes and businesses with clean, reliable solar and
              security solutions. Partner with us for smarter energy and safer
              spaces.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-slate-400 transition-colors hover:text-secondary">
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 transition-colors hover:text-secondary">
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 transition-colors hover:text-secondary">
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 transition-colors hover:text-secondary">
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 transition-colors hover:text-secondary"
                aria-label="Embrace Technologies TikTok profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M218 53.4a93.4 93.4 0 0 1-60-21.1v69.4a53.6 53.6 0 1 1-53.5-53.5V112a93.4 93.4 0 0 1 113.9-58.6Zm-93 73.2a34.6 34.6 0 1 0 34.6 34.6V98.9a54 54 0 0 1-34.6-11Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">
              Sitemap
            </h4>
            <ul className="space-y-3 text-sm text-slate-300 font-montserrat">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-secondary">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-secondary">
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="transition-colors hover:text-secondary">
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-secondary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-slate-300 font-montserrat">
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-secondary">
                  Residential Solar
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-secondary">
                  Commercial Solar
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-secondary">
                  Battery Storage
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-secondary">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="transition-colors hover:text-secondary">
                  Energy Audits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-6">
              Contact Information
            </h4>
            <ul className="space-y-5 text-sm text-slate-300 font-montserrat">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>
                  116 Ikorodu-Lagos Road, Haruna Bustop,
                  <br />
                  Ikorodu, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+2347061451583"
                    className="transition-colors hover:text-secondary">
                    +234 706 145 1583
                  </a>
                  <a
                    href="tel:+2348078954388"
                    className="transition-colors hover:text-secondary">
                    +234 807 895 4388
                  </a>
                  <a
                    href="tel:+2349110152566"
                    className="transition-colors hover:text-secondary">
                    +234 911 015 2566
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a
                  href="mailto:info@embracetechng.com"
                  className="transition-colors hover:text-secondary break-all">
                  info@embracetechng.com
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
                  Enquire Now
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Embrace Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/"
              className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
