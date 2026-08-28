export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  date: string;
  image: string;
  description: string;
  metaDescription: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "key-factors-choosing-solar-company-nigeria",
    title: "Key Factors to Consider Before Choosing a Solar Company",
    date: "August 19, 2026",
    image: "/blog-post-1.webp",
    description: "Investing in solar is a big decision. The right solar company will give you power, savings, and peace of mind for 10+ years. The wrong one? Frustration and extra costs.",
    metaDescription: "Choosing the right solar company in Nigeria? Learn 7 key factors to check before buying solar: warranty, support, product quality, and installation.",
    content: `
<p>Choosing the right <strong>solar company in Nigeria</strong> can make the difference between years of reliable power and constant system failures. Whether you're looking for a <strong>solar provider in Nigeria</strong> for your home or office, you need more than just cheap panels. In this guide, we break down the <strong>7 key factors to consider before choosing the best solar company</strong> so you get quality, warranty, and after-sales support that actually lasts.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px;">1. Customer Service</h3>
<p>A good solar company should provide excellent customer service to prospective, new, and existing clients. From inquiry to installation and beyond, you deserve responsive and professional support.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px;">2. After-Sales Support</h3>
<p>There's nothing more frustrating than a solar company that becomes unresponsive after installation. Choose a solar company that remains available both online and physically throughout the lifetime of your system.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px;">3. System Durability</h3>
<p>The longevity of your solar system depends on the type of materials used. A good solar company should use rugged, durable and appropriate components such as cables, breakers, battery racks, mounting rails, and other accessories.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px;">4. Product Quality</h3>
<p>The performance and lifespan of your system are only as good as the quality of its components. Always choose a solar company that prioritizes premium, tested, and trusted products only.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px;">5. System Design Efficiency</h3>
<p>A well-designed system ensures optimal performance. A professional company will carefully consider factors like Amps, Volts, Watts, kWh, kWp, kVA, kVAR, AH, and your specific load profile. A poorly designed system will always perform below expectation.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px;">6. Quality of Installation</h3>
<p>Even the best products can fail if installed poorly. Choose a company with a highly trained technical team capable of delivering top-notch installations that guarantee efficiency, safety, and reliability.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px;">7. Warranty</h3>
<p>Though premium products rarely fail, it's important to work with a reputable company that provides genuine warranty coverage for both products and installation.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px;">Conclusion</h3>
<p>At Embrace Technologies, we check every box above. From premium products to expert installation and lifetime support, we're committed to powering your home and business the right way.</p>

<p>Ready to go solar? <a href="/contact" style="text-decoration: underline; color: #F97316;">Contact us</a> today</p>`,

  },
  {
    id: 2,
    slug: "why-solar-energy-is-the-future",
    title: "Why Solar Energy Is The Future",
    date: "August 28, 2026",
    image: "/blog/why-solar-cover.webp",
    description: "From cutting electricity bills to increasing property value. Here are 6 reasons why more Nigerians are switching to solar in 2026.",
    metaDescription: "Discover 6 key benefits of solar energy in Nigeria: save money, reliable power, eco-friendly, low maintenance, increase property value.",
    content: `
      <p>Solar power is no longer just an alternative. In Nigeria, it’s becoming the smartest way to power homes and businesses. Here are 6 reasons why:</p>
      <div class="grid gap-8 my-12">
        <div class="flex flex-col md:flex-row items-center gap-6"><img src="/blog/saves-money.webp" alt="Saves Money" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Saves Money</h2><p>Cut down on your electricity bills! With rising NEPA tariffs and fuel costs, solar pays for itself in 18-24 months.</p></div></div>
        <div class="flex flex-col md:flex-row-reverse items-center gap-6"><img src="/blog/reliable-power.webp" alt="Reliable Power Supply" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Reliable Power Supply</h2><p>No more blackouts. Power your home 24/7 without depending on the grid or noisy generators.</p></div></div>
        <div class="flex flex-col md:flex-row items-center gap-6"><img src="/blog/eco-friendly.webp" alt="Eco Friendly" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Eco-Friendly</h2><p>Reduce carbon footprint. Clean energy means cleaner air for your family and community.</p></div></div>
        <div class="flex flex-col md:flex-row-reverse items-center gap-6"><img src="/blog/low-maintenance.webp" alt="Low Maintenance" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Low Maintenance</h2><p>Set it and forget it! Solar systems need very little upkeep and come with 5-year warranties.</p></div></div>
        <div class="flex flex-col md:flex-row items-center gap-6"><img src="/blog/property-value.webp" alt="Increases Property Value" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Increases Property Value</h2><p>Homes with solar sell for more! It’s an investment that adds value to your property.</p></div></div>
      </div>
      <div class="text-center bg-slate-100 rounded-2xl p-8 mt-12">
        <img src="/blog/get-started.webp" alt="Get Started" class="rounded-2xl mx-auto mb-6 max-w-md shadow-lg"/>
        <h2 class="text-3xl font-bold text-slate-800 mb-3">Be a part of this future</h2>
        <p class="text-slate-600 mb-6">Contact us now to get started</p>
        <a href="/landing" class="inline-block bg-[#EA6936] text-white font-bold px-8 py-4 rounded-full hover:bg-[#EA6936]/90 transition">Get Started</a>
      </div>
    `
  },
];