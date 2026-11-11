import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  FileText,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Lock,
  Scale,
} from "lucide-react";

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = [
    { id: "introduction", num: "1", title: "Introduction" },
    { id: "about-us", num: "2", title: "About Us" },
    { id: "information-collected", num: "3", title: "Personal Information We Collect" },
    { id: "how-we-collect", num: "4", title: "How We Collect Your Information" },
    { id: "why-we-collect", num: "5", title: "Why We Collect and Use Your Information" },
    { id: "lawful-basis", num: "6", title: "Lawful Basis for Processing" },
    { id: "sharing-information", num: "7", title: "Sharing Your Personal Information" },
    { id: "international-transfers", num: "8", title: "International Data Transfers" },
    { id: "how-we-protect", num: "9", title: "How We Protect Your Information" },
    { id: "retention", num: "10", title: "How Long We Keep Your Information" },
    { id: "your-rights", num: "11", title: "Your Data Protection Rights" },
    { id: "marketing", num: "12", title: "Marketing Communications" },
    { id: "cookies", num: "13", title: "Cookies and Website Technologies" },
    { id: "children", num: "14", title: "Children's Privacy" },
    { id: "contact-complaints", num: "15", title: "Contact Us and Privacy Complaints" },
    { id: "policy-changes", num: "16", title: "Changes to This Privacy Policy" },
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Embrace Technologies Limited</title>
        <meta
          name="description"
          content="Privacy Policy for Embrace Technologies Limited. Learn how we collect, use, store, disclose, and protect personal data in compliance with the Nigeria Data Protection Act 2023 (NDPA)."
        />
        <link rel="canonical" href="https://embracetechng.com/privacy-policy" />
      </Helmet>

      <main className="min-h-screen bg-slate-50 text-slate-800">
        {/* HERO SECTION */}
        <section className="relative min-h-[320px] sm:min-h-[380px] bg-slate-950 flex items-center justify-center overflow-hidden pt-28 pb-16">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs sm:text-sm font-montserrat font-semibold tracking-wider uppercase mb-5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>NDPA 2023 Compliant</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white tracking-tight uppercase"
            >
              Privacy Policy
            </motion.h1>

            {/* Animated Underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 mx-auto mt-4 rounded-full"
              style={{
                background: "linear-gradient(90deg, #FFC759, #EA6936)",
              }}
            />

            {/* Subtitle / Effective Date */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-sm sm:text-base font-poppins text-slate-300 max-w-2xl mx-auto"
            >
              <strong className="text-white">Embrace Technologies Limited</strong>
              <span className="mx-2">•</span>
              <span>Effective Date: 8 November 2026</span>
              <span className="mx-2">•</span>
              <span>Last Updated: 8 November 2026</span>
            </motion.p>

            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm font-montserrat text-slate-400 mt-6">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-amber-400 font-medium">Privacy Policy</span>
            </nav>
          </div>
        </section>

        {/* MAIN BODY */}
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto items-start">
            {/* STICKY TABLE OF CONTENTS (DESKTOP) */}
            <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-montserrat font-bold text-slate-900 text-base">
                    Table of Contents
                  </h3>
                </div>

                <nav className="mt-4 space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs font-poppins">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-montserrat font-semibold text-slate-400 w-5 shrink-0">
                        {sec.num}.
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-100 text-xs font-poppins text-slate-700">
                    <p className="font-semibold text-sky-900 mb-1 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-sky-600" />
                      Your Data is Protected
                    </p>
                    Compliant with Nigeria Data Protection Act 2023 (NDPA).
                  </div>
                </div>
              </div>
            </aside>

            {/* CONTENT AREA */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm border border-slate-200/80 space-y-12">
              {/* SECTION 1: INTRODUCTION */}
              <section id="introduction" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    1
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Introduction
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Embrace Technologies Limited ("Embrace Technologies", "we", "our" or "us") respects your privacy and is committed to protecting the personal information you share with us.
                </p>
                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  This Privacy Policy explains how we collect, use, store, disclose and protect personal information when you interact with our business, including through our website, social media pages, advertisements, WhatsApp, telephone calls, enquiry forms and other communication channels.
                </p>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 text-sm font-poppins flex items-start gap-3">
                  <Scale className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    We handle personal information in accordance with applicable Nigerian data protection laws, including the <strong>Nigeria Data Protection Act 2023 (NDPA)</strong>.
                  </span>
                </div>
              </section>

              {/* SECTION 2: ABOUT US */}
              <section id="about-us" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    About Us
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Embrace Technologies Limited determines the purposes and means for which personal information collected through its business activities is processed.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 font-poppins text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase tracking-wider">Company</span>
                      <strong className="text-slate-900 font-montserrat">Embrace Technologies Limited</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase tracking-wider">Business Address</span>
                      <span className="text-slate-800">116 Ikorodu Road, Aruna Bus Stop, Ikorodu, Lagos State, Nigeria.</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase tracking-wider">Telephone / WhatsApp</span>
                      <a href="tel:07061451583" className="text-primary font-semibold hover:underline">
                        0706 145 1583
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                    <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase tracking-wider">Privacy Enquiries Email</span>
                      <a href="mailto:info@embracetechng.com" className="text-primary font-semibold hover:underline">
                        info@embracetechng.com
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: PERSONAL INFORMATION WE COLLECT */}
              <section id="information-collected" className="scroll-mt-28 space-y-5 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    3
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Personal Information We Collect
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Depending on how you interact with us, we may collect the following information:
                </p>

                <div className="space-y-4 font-poppins text-sm">
                  {/* Category A */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <h3 className="font-montserrat font-bold text-slate-900 text-sm sm:text-base mb-2.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">A</span>
                      Personal and Contact Information
                    </h3>
                    <ul className="list-disc pl-8 space-y-1.5 text-slate-600">
                      <li>Full name.</li>
                      <li>Telephone and WhatsApp numbers.</li>
                      <li>Email address.</li>
                      <li>Contact and delivery address.</li>
                    </ul>
                  </div>

                  {/* Category B */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <h3 className="font-montserrat font-bold text-slate-900 text-sm sm:text-base mb-2.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-secondary text-primary text-xs flex items-center justify-center font-bold">B</span>
                      Enquiry and Customer Information
                    </h3>
                    <ul className="list-disc pl-8 space-y-1.5 text-slate-600">
                      <li>Location of your property or installation site.</li>
                      <li>Type of property, such as a house, apartment, shop or office.</li>
                      <li>Information about your electricity needs and appliances.</li>
                      <li>Your preferred solar system or products.</li>
                      <li>Budget and purchase timeline.</li>
                      <li>Information you provide when requesting quotations or technical consultations.</li>
                    </ul>
                  </div>

                  {/* Category C */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <h3 className="font-montserrat font-bold text-slate-900 text-sm sm:text-base mb-2.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">C</span>
                      Transaction Information
                    </h3>
                    <ul className="list-disc pl-8 space-y-1.5 text-slate-600">
                      <li>Products or services purchased.</li>
                      <li>Quotations, invoices and payment records.</li>
                      <li>Installation and maintenance records.</li>
                      <li>Customer service and communication history.</li>
                    </ul>
                  </div>

                  {/* Category D */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <h3 className="font-montserrat font-bold text-slate-900 text-sm sm:text-base mb-2.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">D</span>
                      Website and Technical Information
                    </h3>
                    <p className="text-slate-600 pl-8 leading-relaxed">
                      When you visit our website, certain technical information may be collected, such as your IP address, browser type, device information, website usage information and cookies, depending on the website tools and settings in use.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 4: HOW WE COLLECT */}
              <section id="how-we-collect" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    4
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    How We Collect Your Information
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  We may collect personal information directly from you when you:
                </p>

                <ul className="list-disc pl-6 space-y-2 text-slate-600 font-poppins text-sm sm:text-base">
                  <li>Complete an enquiry or lead form on Facebook or Instagram.</li>
                  <li>Contact us through WhatsApp, telephone, email or social media.</li>
                  <li>Submit an enquiry through our website.</li>
                  <li>Request a quotation or solar system assessment.</li>
                  <li>Purchase products or engage our installation services.</li>
                  <li>Participate in our training programmes.</li>
                  <li>Communicate with our employees or representatives.</li>
                </ul>

                <p className="text-slate-500 font-poppins text-xs sm:text-sm italic pt-1">
                  We may also receive information through advertising platforms, website tools and other service providers involved in delivering our services.
                </p>
              </section>

              {/* SECTION 5: WHY WE COLLECT & USE */}
              <section id="why-we-collect" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    5
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Why We Collect and Use Your Information
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  We collect and process your information for legitimate business purposes, including:
                </p>

                <ol className="list-decimal pl-6 space-y-2 text-slate-600 font-poppins text-sm sm:text-base">
                  <li>Responding to enquiries and customer requests.</li>
                  <li>Providing product information, prices and quotations.</li>
                  <li>Assessing customers' solar power requirements.</li>
                  <li>Recommending suitable solar systems and components.</li>
                  <li>Arranging site inspections, installations and maintenance.</li>
                  <li>Processing orders, payments and customer transactions.</li>
                  <li>Providing after-sales support and warranty services.</li>
                  <li>Managing customer relationships and business records.</li>
                  <li>Improving our products, services, website and customer experience.</li>
                  <li>Communicating important service, transaction and operational updates.</li>
                  <li>Meeting applicable legal, regulatory and accounting obligations.</li>
                  <li>Sending promotional messages where we have an appropriate lawful basis or your consent, as required.</li>
                </ol>

                <div className="p-3.5 rounded-lg bg-slate-100 font-poppins text-xs sm:text-sm text-slate-700 font-medium">
                  We do not require information that is unrelated to the purpose for which it is collected.
                </div>
              </section>

              {/* SECTION 6: LAWFUL BASIS */}
              <section id="lawful-basis" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    6
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Lawful Basis for Processing
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  We process personal information where an appropriate lawful basis exists under the <strong>Nigeria Data Protection Act 2023</strong>.
                </p>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Depending on the circumstances, these bases may include:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-poppins text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong className="text-primary font-montserrat block mb-1">Consent</strong>
                    <span className="text-slate-600">Where you have freely agreed to a specific use of your personal information.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong className="text-primary font-montserrat block mb-1">Contractual Necessity</strong>
                    <span className="text-slate-600">Where processing is necessary to provide a requested product or service or fulfil an agreement with you.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong className="text-primary font-montserrat block mb-1">Legitimate Interests</strong>
                    <span className="text-slate-600">Where processing is necessary for a legitimate business purpose and does not override your fundamental rights and freedoms.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong className="text-primary font-montserrat block mb-1">Legal Obligation</strong>
                    <span className="text-slate-600">Where processing is required to comply with applicable laws and regulations.</span>
                  </div>
                </div>

                <p className="text-slate-500 font-poppins text-xs sm:text-sm italic pt-1">
                  Where we rely on consent, you may withdraw it at any time, subject to applicable legal requirements.
                </p>
              </section>

              {/* SECTION 7: SHARING INFORMATION */}
              <section id="sharing-information" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    7
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Sharing Your Personal Information
                  </h2>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-montserrat font-bold text-sm">
                  We do not sell your personal information.
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  However, we may share relevant information with trusted third parties where necessary for legitimate business operations, including:
                </p>

                <ul className="list-disc pl-6 space-y-2 text-slate-600 font-poppins text-sm sm:text-base">
                  <li>
                    <strong>Advertising platforms:</strong> Such as Meta (Facebook and Instagram), where you submit an enquiry through their advertising forms.
                  </li>
                  <li>
                    <strong>Communication platforms:</strong> Such as WhatsApp and other services used to communicate with customers.
                  </li>
                  <li>
                    <strong>Business management and customer record systems:</strong> Including Zoho Books and other customer relationship management (CRM) or customer database systems used by our business.
                  </li>
                  <li>
                    <strong>Technology and hosting providers:</strong> Companies that support our website, email and digital infrastructure.
                  </li>
                  <li>
                    <strong>Payment service providers and financial institutions:</strong> Where required to process transactions.
                  </li>
                  <li>
                    <strong>Installation and logistics partners:</strong> Where necessary to deliver products or provide installation and maintenance services.
                  </li>
                  <li>
                    <strong>Professional advisers and regulatory authorities:</strong> Where disclosure is necessary for legal, regulatory or professional purposes.
                  </li>
                </ul>

                <p className="text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed pt-1">
                  We expect third parties processing personal information on our behalf to handle it appropriately and protect it in accordance with applicable requirements. These third parties may process information under their own privacy policies and terms where they act independently.
                </p>
              </section>

              {/* SECTION 8: INTERNATIONAL TRANSFERS */}
              <section id="international-transfers" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    8
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    International Data Transfers
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Some of the digital platforms and service providers we use may store or process personal information outside Nigeria.
                </p>
                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Where personal information is transferred internationally, we will take appropriate steps to ensure that such transfers comply with applicable Nigerian data protection requirements and that suitable safeguards are in place.
                </p>
              </section>

              {/* SECTION 9: HOW WE PROTECT */}
              <section id="how-we-protect" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    9
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    How We Protect Your Information
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  We take reasonable organisational, administrative and technical measures to protect personal information against unauthorised access, loss, misuse, alteration or disclosure.
                </p>
                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Access to customer information should be limited to authorised personnel and service providers who need it for legitimate business purposes.
                </p>
                <p className="text-slate-500 font-poppins text-xs sm:text-sm italic">
                  However, no electronic storage or transmission system can be guaranteed to be completely secure.
                </p>
              </section>

              {/* SECTION 10: RETENTION */}
              <section id="retention" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    10
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    How Long We Keep Your Information
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  We retain personal information only for as long as reasonably necessary for the purposes for which it was collected.
                </p>

                <div className="space-y-3 font-poppins text-xs sm:text-sm pt-1">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong className="text-slate-900 font-montserrat block mb-1">
                      Enquiries that do not result in a purchase:
                    </strong>
                    <span className="text-slate-600">
                      We generally intend to retain enquiry information for up to 12 months from the date of the enquiry, after which it will be reviewed for deletion or anonymisation, unless there is a lawful reason to retain it for longer.
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <strong className="text-slate-900 font-montserrat block mb-1">
                      Customers and completed transactions:
                    </strong>
                    <span className="text-slate-600">
                      Information relating to purchases, payments, installations, warranties, maintenance and other customer relationships may be retained for longer where necessary to provide services, fulfil contractual obligations, maintain business records, comply with tax and accounting requirements, or establish, exercise or defend legal claims.
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 font-poppins text-sm leading-relaxed pt-1">
                  When personal information is no longer required, we will take appropriate steps to securely delete, destroy or anonymise it, subject to applicable legal retention requirements.
                </p>
              </section>

              {/* SECTION 11: YOUR DATA PROTECTION RIGHTS */}
              <section id="your-rights" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    11
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Your Data Protection Rights
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Subject to applicable law, you may have the right to:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-poppins text-xs sm:text-sm">
                  {[
                    { num: "1", title: "Be informed", desc: "Know how and why your personal information is being processed." },
                    { num: "2", title: "Access", desc: "Request access to personal information we hold about you." },
                    { num: "3", title: "Rectification", desc: "Request correction of inaccurate or incomplete information." },
                    { num: "4", title: "Erasure", desc: "Request deletion of your personal information where legally applicable." },
                    { num: "5", title: "Restriction", desc: "Request that certain processing activities be restricted." },
                    { num: "6", title: "Object", desc: "Object to certain uses of your personal information, including direct marketing." },
                    { num: "7", title: "Data portability", desc: "Request your personal information in a transferable format where applicable." },
                    { num: "8", title: "Withdraw consent", desc: "Withdraw consent where processing is based on consent." },
                    { num: "9", title: "Lodge a complaint", desc: "Complain to the Nigeria Data Protection Commission if you believe your privacy rights have been violated." },
                  ].map((item) => (
                    <div key={item.num} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-montserrat font-bold text-xs flex items-center justify-center">
                          {item.num}
                        </span>
                        <strong className="text-slate-900 font-montserrat text-xs sm:text-sm">{item.title}</strong>
                      </div>
                      <p className="text-slate-600 text-xs pl-7 leading-normal">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-100 font-poppins text-xs sm:text-sm text-slate-700">
                  To exercise these rights, please contact us using the details in Section 15. We may need to verify your identity before responding to certain requests. Some rights may be subject to lawful exceptions.
                </div>
              </section>

              {/* SECTION 12: MARKETING */}
              <section id="marketing" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    12
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Marketing Communications
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  We may contact existing or prospective customers with relevant information about our solar products, services, promotions, training programmes and business updates where permitted by applicable law.
                </p>
                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  You can opt out of promotional communications at any time by contacting us or using an available unsubscribe option.
                </p>
                <p className="text-slate-500 font-poppins text-xs sm:text-sm italic">
                  Opting out of promotional messages will not prevent us from sending important communications relating to an existing purchase, installation, warranty or service request.
                </p>
              </section>

              {/* SECTION 13: COOKIES */}
              <section id="cookies" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    13
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Cookies and Website Technologies
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Our website may use cookies and similar technologies to improve functionality, understand website usage and support certain website services.
                </p>
                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Where applicable, you may control cookies through your browser settings or any cookie preference tool provided on our website.
                </p>
                <p className="text-slate-500 font-poppins text-xs sm:text-sm italic">
                  Some third-party website tools may also collect technical information in accordance with their own privacy policies.
                </p>
              </section>

              {/* SECTION 14: CHILDREN'S PRIVACY */}
              <section id="children" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    14
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Children's Privacy
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Our products and services are primarily intended for adults and business customers.
                </p>
                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  We do not knowingly seek to collect personal information from children in circumstances where parental or guardian involvement or other safeguards are required by applicable law.
                </p>
                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  If we become aware that personal information has been collected unlawfully from a child, we will take appropriate steps to address the situation.
                </p>
              </section>

              {/* SECTION 15: CONTACT & COMPLAINTS */}
              <section id="contact-complaints" className="scroll-mt-28 space-y-5 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    15
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Contact Us and Privacy Complaints
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  If you have questions about this Privacy Policy, wish to exercise your data protection rights or have concerns about how your personal information is handled, please contact us:
                </p>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-primary text-white space-y-3 font-poppins text-sm">
                  <h3 className="font-montserrat font-bold text-lg text-amber-300">
                    Embrace Technologies Limited
                  </h3>
                  <p className="text-slate-200">
                    <strong>Address:</strong> 116 Ikorodu Road, Aruna Bus Stop, Ikorodu, Lagos State, Nigeria.
                  </p>
                  <p className="text-slate-200">
                    <strong>Telephone/WhatsApp:</strong>{" "}
                    <a href="tel:07061451583" className="text-white hover:text-amber-300 underline font-semibold">
                      0706 145 1583
                    </a>
                  </p>
                  <p className="text-slate-200">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@embracetechng.com" className="text-white hover:text-amber-300 underline font-semibold">
                      info@embracetechng.com
                    </a>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-slate-800 font-poppins text-sm space-y-2">
                  <p className="font-montserrat font-bold text-amber-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-700" />
                    Regulatory Authority Complaint (NDPC)
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    If you are not satisfied with how we handle your privacy concern, you may lodge a complaint with the <strong>Nigeria Data Protection Commission (NDPC)</strong> through its official website:
                  </p>
                  <a
                    href="https://ndpc.gov.ng/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-montserrat font-bold text-xs sm:text-sm text-primary hover:text-secondary underline"
                  >
                    https://ndpc.gov.ng/
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </section>

              {/* SECTION 16: POLICY CHANGES */}
              <section id="policy-changes" className="scroll-mt-28 space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-montserrat font-bold text-sm flex items-center justify-center shrink-0">
                    16
                  </span>
                  <h2 className="text-xl sm:text-2xl font-montserrat font-bold text-slate-900">
                    Changes to This Privacy Policy
                  </h2>
                </div>

                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our business operations, technology, legal requirements or data protection practices.
                </p>
                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  Any revised version will be published on our website with an updated revision date.
                </p>
                <p className="text-slate-600 font-poppins text-sm sm:text-base leading-relaxed">
                  We encourage visitors and customers to review this page periodically.
                </p>

                {/* SIGN OFF */}
                <div className="mt-8 pt-6 border-t border-slate-100 text-center sm:text-left">
                  <p className="font-montserrat font-bold text-slate-900 text-base">
                    Embrace Technologies Limited
                  </p>
                  <p className="font-poppins italic text-sm text-secondary font-medium">
                    Stay On. Go Beyond.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
