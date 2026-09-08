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
    id: 4,
    slug: "top-7-benefits-solar-energy-nigeria-2026",
    title: "Top 7 Benefits of Solar Energy in Nigeria in 2026",
    date: "September 7, 2026",
    image: "/blogpost.jpg",
    description: "From lower energy costs to reliable backup power, discover why more Nigerian homes and businesses are switching to solar in 2026.",
    metaDescription: "Discover the top 7 benefits of solar energy in Nigeria in 2026, including lower electricity bills, reliable power, generator savings and energy independence.",
    content: `
      <p>If you live in Nigeria, you know the story too well: NEPA takes light, fuel prices go up, and the generator makes noise all night.</p>
      <p>In 2026, more Nigerians are done with that cycle. Solar energy is no longer only for big companies or luxury homes. It is how regular homes and businesses are staying on, saving money and getting peace of mind.</p>
      <p>Here are the <strong>top 7 benefits of switching to solar energy in Nigeria</strong> right now.</p>

      <h2 class="text-[#1E3A5F]">1. Cut Your Electricity Bills</h2>
      <p>This is the biggest pain point for many households and businesses. NEPA bills and generator fuel can take ₦50,000 to ₦200,000 every month. With solar, you pay for installation once, then the sun powers your home for free.</p>
      <p>Many families and SMEs can see a return on their investment within two to three years, depending on their energy usage and system design. After that, the reduction in fuel and grid-related costs can become significant savings.</p>

      <h2 class="text-[#1E3A5F]">2. Enjoy Reliable Power Supply</h2>
      <p>Imagine working, watching TV or running a business without constantly asking, "Up NEPA, down NEPA?" A properly designed solar system with battery backup gives you power even when the national grid is down.</p>
      <p>For hospitals, schools, shops and home offices, reliable power means fewer interruptions, less lost work and more confidence throughout the day.</p>

      <h2 class="text-[#1E3A5F]">3. Save on Generator Costs</h2>
      <p>Diesel and petrol prices are not smiling. Generators also need servicing, make noise and pollute the air. Solar removes much of that ongoing cost and inconvenience: no fuel, no engine noise and fewer weekly mechanic visits.</p>
      <p>Instead of budgeting for every hour your generator runs, you can use stored solar energy for your essential appliances and reduce your dependence on backup fuel.</p>

      <h2 class="text-[#1E3A5F]">4. Benefit from Low Maintenance and a Long Lifespan</h2>
      <p>Quality solar panels are built to last, with many carrying warranties of 25 years or more. Routine care is straightforward: occasional panel cleaning, visual checks and a battery inspection by a qualified technician.</p>
      <p>That is a very different maintenance experience from a generator that may break down every few months and requires oil, filters, fuel-system care and engine repairs.</p>

      <h2 class="text-[#1E3A5F]">5. Use Cleaner, More Environmentally Friendly Energy</h2>
      <p>Every hour your generator is switched off, you reduce carbon emissions and noise pollution. Solar is clean energy that is better for your family, your community and the planet.</p>
      <p>As more Nigerians pay attention to air quality, noise and environmental responsibility, switching to solar becomes a practical way to make a positive difference without giving up the power your property needs.</p>

      <h2 class="text-[#1E3A5F]">6. Increase Your Property Value</h2>
      <p>Homes and offices with solar power are in high demand in Lagos, Abuja, Port Harcourt and other growing cities. Tenants and buyers are willing to pay more for a property that already has stable, affordable power.</p>
      <p>Solar is therefore more than an energy solution. It is an investment that can make your building more attractive and add value over time.</p>

      <h2 class="text-[#1E3A5F]">7. Gain Energy Independence</h2>
      <p>This is the biggest win. You stop depending entirely on NEPA or fuel stations. You control when you have power, which appliances you run and how much energy you use.</p>
      <p>In 2026, that kind of freedom matters. A well-sized solar system gives you more control over your daily routine and protects your home or business from unpredictable power interruptions.</p>

      <h2 class="text-[#1E3A5F]">Who Should Switch to Solar in Nigeria?</h2>
      <p>Solar is not just for mansions. It can work well for:</p>
      <ul>
        <li><strong>Homeowners</strong> tired of high electricity and generator bills</li>
        <li><strong>Small businesses</strong> such as salons, cold rooms, supermarkets and POS shops</li>
        <li><strong>Institutions</strong> including churches, schools and clinics that need constant power</li>
      </ul>
      <p>The right system depends on your appliances, daily usage and backup needs. Our team can assess your property and design the right solar system for your home or business.</p>
      <p><a href="/contact" class="font-bold text-[#EA6936] hover:underline">Contact Embrace Technologies Limited</a> to start planning a quieter, more reliable and more affordable power solution.</p>
    `
  },
  {
    id: 3,
    slug: "common-solar-myths-nigeria-debunked-2026-guide",
    title: "3 Common Solar Myths in Nigeria Debunked [2026 Guide]",
    date: "September 4, 2026",
    image: "/blogposttt.jpg",
    description: "Wondering whether solar is too expensive, unreliable in rain, or difficult to maintain? Here are three common solar myths in Nigeria, explained clearly.",
    metaDescription: "Are solar systems expensive or unreliable in rain? This 2026 guide debunks three common solar myths in Nigeria, including cost, weather and maintenance.",
    content: `
  <p>Thinking about <strong>solar in Nigeria</strong> but still hearing conflicting advice? You are not alone. From concerns about the solar cost in Nigeria to questions like "does solar work in rain?", many households and businesses delay a decision because of myths that no longer match today's technology.</p>
  <p>Modern solar systems are designed for the realities of Nigerian power: changing weather, unreliable grid supply, rising fuel prices and the everyday need for dependable electricity. In this guide, we separate the most common claims from the facts, so you can make a more confident decision for your home, office or business.</p>

  <h2 class="text-[#1E3A5F]">Myth 1: Solar costs too much</h2>
  
  <figure class="my-10 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#1E3A5F] to-[#000000] py-10 px-6 text-center shadow-xl">
    <div class="flex flex-col items-center justify-center gap-2">
      <span class="font-montserrat text-xs font-bold uppercase tracking-[0.3em] text-[#FFFFFF]">Myth 1</span>
      <strong class="font-anton text-3xl md:text-4xl uppercase text-[#FFFFFF]">Too expensive</strong>
    </div>
    <figcaption class="mx-auto mt-6 max-w-xl border-t border-white/20 pt-4 font-poppins text-sm text-[#FFFFFF]">
      <strong>Illustration:</strong> A solar investment is measured against years of generator fuel, repairs and unpredictable electricity bills.
    </figcaption>
  </figure>

  <h3 class="text-[#1E3A5F] font-bold mt-8 mb-4">Myth vs Fact</h3>
  <p><strong>Myth:</strong> Solar is only for wealthy homeowners and large companies because the initial price is too high.</p>
  <p><strong>Fact:</strong> Solar is an investment that can reduce your total energy cost over time. The upfront solar cost in Nigeria varies with system capacity, battery technology and installation requirements, but the calculation should include what you currently spend on diesel or petrol, generator servicing, repairs and NEPA bills.</p>
  <p>When NEPA supply is inconsistent, many Nigerians run a generator for work, refrigeration, water pumping, security and evening activities. Fuel prices can change without warning, and a generator continues to cost money every hour it runs. Solar has no fuel bill. Once installed, sunlight is free, and a well-designed battery system can provide quiet backup when the grid goes off.</p>
  
  <h3 class="text-[#1E3A5F] font-bold mt-8 mb-4">Look at lifetime value, not just the invoice</h3>
  <p>A good installer begins with your load profile and recommends only the capacity you need. You may choose a smaller system for essential appliances first, then expand later. Comparing the quote with your current monthly energy spend gives a more realistic payback picture than comparing solar with a single purchase price. There is also value in quieter nights, cleaner air and less dependence on NEPA.</p>

  <h2 class="text-[#1E3A5F]">Myth 2: Solar does not work in rain</h2>
  
  <figure class="my-10 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#1E3A5F] to-[#000000] py-10 px-6 text-center shadow-xl">
    <div class="flex flex-col items-center justify-center gap-2">
      <span class="font-montserrat text-xs font-bold uppercase tracking-[0.3em] text-[#FFFFFF]">Myth 2</span>
      <strong class="font-anton text-3xl md:text-4xl uppercase text-[#FFFFFF]">No power in rain</strong>
    </div>
    <figcaption class="mx-auto mt-6 max-w-xl border-t border-white/20 pt-4 font-poppins text-sm text-[#FFFFFF]">
      <strong>Illustration:</strong> Panels use daylight, not heat alone, so they continue producing energy through bright and overcast weather.
    </figcaption>
  </figure>

  <h3 class="text-[#1E3A5F] font-bold mt-8 mb-4">Myth vs Fact</h3>
  <p><strong>Myth:</strong> Solar panels stop working as soon as clouds gather or rain begins in Lagos.</p>
  <p><strong>Fact:</strong> Solar panels still generate electricity on cloudy days because daylight reaches them even when direct sunshine is reduced. The output can be lower during heavy cloud cover, but the system does not simply switch off. This is why asking "does solar work in rain?" needs a more useful answer: yes, with variable production.</p>
  <p>The battery is the other half of a dependable solar system. When the sun is stronger, excess energy can be stored for later. During rain or at night, your inverter draws from the battery to run selected appliances. A properly sized system therefore combines daytime generation, battery storage and smart energy use. Your installer should explain expected runtime rather than promise identical performance in every weather condition.</p>
  
  <h3 class="text-[#1E3A5F] font-bold mt-8 mb-4">Rain is not the same as system failure</h3>
  <p>Quality panels are built for outdoor conditions. The important considerations are correct mounting, safe cabling, drainage and an inverter with the right protection. Heavy rain may even help wash dust from a panel, although it does not replace periodic cleaning. For Nigerian homes and businesses, the goal is reliable power across changing conditions, not dependence on a single sunny hour.</p>

  <h2 class="text-[#1E3A5F]">Myth 3: Solar is hard to maintain</h2>
  
  <figure class="my-10 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#1E3A5F] to-[#000000] py-10 px-6 text-center shadow-xl">
    <div class="flex flex-col items-center justify-center gap-2">
      <span class="font-montserrat text-xs font-bold uppercase tracking-[0.3em] text-[#FFFFFF]">Myth 3</span>
      <strong class="font-anton text-3xl md:text-4xl uppercase text-[#FFFFFF]">Too difficult</strong>
    </div>
    <figcaption class="mx-auto mt-6 max-w-xl border-t border-white/20 pt-4 font-poppins text-sm text-[#FFFFFF]">
      <strong>Illustration:</strong> Routine solar care is simple: keep panels clean and let a technician inspect the system at sensible intervals.
    </figcaption>
  </figure>

  <h3 class="text-[#1E3A5F] font-bold mt-8 mb-4">Myth vs Fact</h3>
  <p><strong>Myth:</strong> Solar requires constant technical attention and expensive repairs.</p>
  <p><strong>Fact:</strong> Solar has fewer moving parts than a generator and needs relatively simple routine care. Most systems need panel cleaning, visual checks and periodic professional inspection. There is no engine oil to change, no exhaust to service and no fuel system to clog.</p>
  <p>For solar maintenance in Nigeria, dust and debris are the main everyday concerns. Panels should be cleaned with suitable tools and water when needed, while connections, mounting hardware, inverter alerts and battery performance should be checked by a qualified technician. Do not climb onto a roof without the right safety equipment. A maintenance visit can identify loose connections or unusual battery behaviour before they become a larger problem.</p>
  
  <h3 class="text-[#1E3A5F] font-bold mt-8 mb-4">Installation quality makes maintenance easier</h3>
  <p>Good workmanship protects your investment. Neat cable routing, ventilation around the inverter, secure battery placement and clear system documentation all make future inspections quicker. Ask about warranty coverage, response times and after-sales support before choosing a provider. The cheapest installation can become expensive if nobody is available when you need help.</p>

  <h2 class="text-[#1E3A5F]">State of Power: why these myths matter in 2026</h2>
  <p>For many Nigerians, power is not an abstract issue. It affects business hours, food storage, remote work, schoolwork, healthcare and security. The reality of frequent outages means households often pay twice: once for their electricity bill and again for fuel, generator repairs and the time spent managing interruptions.</p>
  <p>There is no single solar system for every property. A two-bedroom home, a salon, a cold-room operator and a multi-floor office have different energy patterns. The useful stat for your decision is your own daily load: what you power, for how long, and what must stay on during an outage. A professional assessment turns that information into the right panel, inverter and battery combination.</p>
  <p>The bigger picture is encouraging: solar technology is more accessible, battery options are improving and Nigerian installers have more experience designing systems for local conditions. Solar does not remove every energy decision, but it can replace a large share of fuel and NEPA dependence with predictable, quiet power.</p>

  <div id="solar-quote" class="my-8 py-4 text-center text-[#000000]">
    <p class="text-lg leading-relaxed">
      <a href="/contact" class="text-[#1E3A5F] font-bold hover:underline transition-colors duration-200">At Embrace Technologies Limited</a>, we’re powering a greener Nigeria. Our home solar systems deliver efficiency, durability, and real savings — for you and the planet.
    </p>
  </div>`
  },
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

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px; color: #0f172a;">1. Customer Service</h3>
<p>A good solar company should provide excellent customer service to prospective, new, and existing clients. From inquiry to installation and beyond, you deserve responsive and professional support.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px; color: #0f172a;">2. After-Sales Support</h3>
<p>There's nothing more frustrating than a solar company that becomes unresponsive after installation. Choose a solar company that remains available both online and physically throughout the lifetime of your system.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px; color: #0f172a;">3. System Durability</h3>
<p>The longevity of your solar system depends on the type of materials used. A good solar company should use rugged, durable and appropriate components such as cables, breakers, battery racks, mounting rails, and other accessories.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px; color: #0f172a;">4. Product Quality</h3>
<p>The performance and lifespan of your system are only as good as the quality of its components. Always choose a solar company that prioritizes premium, tested, and trusted products only.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px; color: #0f172a;">5. System Design Efficiency</h3>
<p>A well-designed system ensures optimal performance. A professional company will carefully consider factors like Amps, Volts, Watts, kWh, kWp, kVA, kVAR, AH, and your specific load profile. A poorly designed system will always perform below expectation.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px; color: #0f172a;">6. Quality of Installation</h3>
<p>Even the best products can fail if installed poorly. Choose a company with a highly trained technical team capable of delivering top-notch installations that guarantee efficiency, safety, and reliability.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px; color: #0f172a;">7. Warranty</h3>
<p>Though premium products rarely fail, it's important to work with a reputable company that provides genuine warranty coverage for both products and installation.</p>

<h3 style="font-family: 'Montserrat', sans-serif; font-weight: 600; letter-spacing: normal; font-size: 24px; color: #0f172a;">Conclusion</h3>
<p>At Embrace Technologies Limited, we check every box above. From premium products to expert installation and lifetime support, we're committed to powering your home and business the right way.</p>

<p>Ready to go solar? <a href="/contact" style="text-decoration: underline; color: #F97316;">Contact us</a> today</p>`,

  },
  {
    id: 2,
    slug: "why-solar-energy-is-the-future",
    title: "Why Solar Energy Is The Future",
    date: "August 28, 2026",
    image: "/why-solar.webp",
    description: "From cutting electricity bills to increasing property value. Here are 6 reasons why more Nigerians are switching to solar in 2026.",
    metaDescription: "Discover 6 key benefits of solar energy in Nigeria: save money, reliable power, eco-friendly, low maintenance, increase property value.",
    content: `
      <p>Solar power is no longer just an alternative. In Nigeria, it’s becoming the smartest way to power homes and businesses. Here are 6 reasons why:</p>
      <div class="grid gap-8 my-12">
        <div class="flex flex-col md:flex-row items-center gap-6"><img src="/elephant.webp" alt="Saves Money" class="rounded-t-3xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Saves Money</h2><p>Cut down on your electricity bills! With rising NEPA tariffs and fuel costs, solar pays for itself in 18-24 months.</p></div></div>
        <div class="flex flex-col md:flex-row-reverse items-center gap-6"><img src="/reliable-p.webp" alt="Reliable Power Supply" class="rounded-t-3xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Reliable Power Supply</h2><p>No more blackouts. Power your home 24/7 without depending on the grid or noisy generators.</p></div></div>
        <div class="flex flex-col md:flex-row items-center gap-6"><img src="/eco-frnd.webp" alt="Eco Friendly" class="rounded-t-3xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Eco-Friendly</h2><p>Reduce carbon footprint. Clean energy means cleaner air for your family and community.</p></div></div>
        <div class="flex flex-col md:flex-row-reverse items-center gap-6"><img src="/low-main.webp" alt="Low Maintenance" class="rounded-t-3xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Low Maintenance</h2><p>Set it and forget it! Solar systems need very little upkeep and come with 5-year warranties.</p></div></div>
        <div class="flex flex-col md:flex-row items-center gap-6"><img src="/money-value.webp" alt="Increases Property Value" class="rounded-t-3xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Increases Property Value</h2><p>Homes with solar sell for more! It’s an investment that adds value to your property.</p></div></div>
      </div>
      <div class="text-center bg-slate-100 rounded-2xl p-8 mt-12">
        <h2 class="text-3xl font-bold text-slate-800 mb-3">Be a part of this future</h2>
        <p class="text-slate-600 mb-6">Contact us now to get started</p>
        <a href="/contact" class="inline-block bg-[#EA6936] text-white font-bold px-8 py-4 rounded-full hover:bg-[#EA6936]/90 transition">Get Started</a>
      </div>
    `
  },
  // {
  //   id: 4,
  //   slug: "why-solar-energy-is-the-future",
  //   title: "Why Solar Energy Is The Future",
  //   date: "August 28, 2026",
  //   image: "/why-solar.jpg",
  //   description: "From cutting electricity bills to increasing property value. Here are 6 reasons why more Nigerians are switching to solar in 2026.",
  //   metaDescription: "Discover 6 key benefits of solar energy in Nigeria: save money, reliable power, eco-friendly, low maintenance, increase property value.",
  //   content: `
  //     <p>Solar power is no longer just an alternative. In Nigeria, it’s becoming the smartest way to power homes and businesses. Here are 6 reasons why:</p>
  //     <div class="grid gap-8 my-12">
  //       <div class="flex flex-col md:flex-row items-center gap-6"><img src="/elephant.jpg" alt="Saves Money" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Saves Money</h2><p>Cut down on your electricity bills! With rising NEPA tariffs and fuel costs, solar pays for itself in 18-24 months.</p></div></div>
  //       <div class="flex flex-col md:flex-row-reverse items-center gap-6"><img src="/solar1.jpg" alt="Reliable Power Supply" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Reliable Power Supply</h2><p>No more blackouts. Power your home 24/7 without depending on the grid or noisy generators.</p></div></div>
  //       <div class="flex flex-col md:flex-row items-center gap-6"><img src="/solar.jpg" alt="Eco Friendly" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Eco-Friendly</h2><p>Reduce carbon footprint. Clean energy means cleaner air for your family and community.</p></div></div>
  //       <div class="flex flex-col md:flex-row-reverse items-center gap-6"><img src="/solar2.jpg" alt="Low Maintenance" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Low Maintenance</h2><p>Set it and forget it! Solar systems need very little upkeep and come with 5-year warranties.</p></div></div>
  //       <div class="flex flex-col md:flex-row items-center gap-6"><img src="/money-value.jpg" alt="Increases Property Value" class="rounded-2xl w-full md:w-1/2 shadow-lg"/><div><h2 class="text-2xl font-bold text-slate-800 mb-2">Increases Property Value</h2><p>Homes with solar sell for more! It’s an investment that adds value to your property.</p></div></div>
  //     </div>
  //     <div class="text-center bg-slate-100 rounded-2xl p-8 mt-12">
  //       <h2 class="text-3xl font-bold text-slate-800 mb-3">Be a part of this future</h2>
  //       <p class="text-slate-600 mb-6">Contact us now to get started</p>
  //       <a href="/contact" class="inline-block bg-[#EA6936] text-white font-bold px-8 py-4 rounded-full hover:bg-[#EA6936]/90 transition">Get Started</a>
  //     </div>
  //   `
  // },
];