import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: "spa-wellness",
    slug: "spa",
    name: "Spa & Wellness",
    shortDescription: "Serene, high-end digital experiences designed for day spas, wellness sanctuaries, and holistic health centers.",
    suitableBusinesses: ["Day Spas", "Wellness Resorts", "Holistic Health Clinics", "Massage Therapy Studios", "Aromatherapy Hubs"],
    previewImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Treatment Menu & Pricing", description: "Structured treatment categories with durations, benefits, and instant pricing." },
      { title: "Direct Booking Request", description: "Seamless appointment request form integrated with WhatsApp or calendar." },
      { title: "Practitioner Profiles", description: "Introduce therapist credentials and specialist wellness certifications." },
      { title: "Ambiance Gallery", description: "High-resolution showcase of treatment rooms, hydrotherapy suites, and relaxation lounges." }
    ]
  },
  {
    id: "beauty-salon",
    slug: "beauty",
    name: "Beauty & Salon",
    shortDescription: "Elegant, trend-forward websites tailored for hair salons, nail studios, lash bars, and aesthetic clinics.",
    suitableBusinesses: ["Hair Salons", "Nail Boutiques", "Aesthetic Clinics", "Lash & Brow Bars", "Makeup Studios"],
    previewImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Service Menu & Add-ons", description: "Categorized haircut, coloring, styling, and nail treatments." },
      { title: "Stylist Lookbooks", description: "Filtered visual showcase of client transformations and lookbooks." },
      { title: "Instant Booking", description: "Choose stylist, service tier, and preferred time slot." },
      { title: "Pre-appointment Care Guides", description: "Client guidelines for hair prep and post-treatment longevity." }
    ]
  },
  {
    id: "restaurant-cafe",
    slug: "restaurant",
    name: "Restaurant & Café",
    shortDescription: "Atmospheric, taste-bud inspiring websites built for fine dining restaurants, artisanal cafés, and cocktail lounges.",
    suitableBusinesses: ["Fine Dining", "Artisanal Cafés", "Cocktail Lounges", "Bistros & Grills", "Specialty Coffee Roasters"],
    previewImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Digital Food & Beverage Menu", description: "Categorized interactive menu with dietary tags (vegan, gluten-free, chef signatures)." },
      { title: "Table Reservation Request", description: "Instant table reservation form with party size and special requests." },
      { title: "Culinary & Atmosphere Showcase", description: "Rich food photography highlighting signature dishes and dining rooms." },
      { title: "Opening Hours & Location", description: "Google Map directions, parking notes, and holiday opening hours." }
    ]
  },
  {
    id: "fashion-store",
    slug: "fashion",
    name: "Fashion Store",
    shortDescription: "Editorial, high-fashion web layouts designed for boutique clothing brands, designer ateliers, and apparel labels.",
    suitableBusinesses: ["Boutique Apparel", "Luxury Ateliers", "Streetwear Brands", "Sustainable Fashion Houses"],
    previewImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Seasonal Lookbooks", description: "High-impact editorial hero galleries with curated lookbook collections." },
      { title: "Product Catalog & Filters", description: "Filter items by category, color, size, material, and collection." },
      { title: "WhatsApp Direct Order", description: "Direct order inquiry button that auto-populates product name and size in WhatsApp." },
      { title: "Size Guide & Fabric Details", description: "Interactive sizing charts and garment care instructions." }
    ]
  },
  {
    id: "sneaker-footwear",
    slug: "footwear",
    name: "Sneaker & Footwear",
    shortDescription: "Bold, modern e-commerce showcases engineered for sneaker boutiques, custom shoemakers, and footwear stockists.",
    suitableBusinesses: ["Sneaker Boutiques", "Custom Shoe Creators", "Leather Footwear Brands", "Athletic Shoe Retailers"],
    previewImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Release Drop Highlights", description: "Countdown timer and drop notifications for limited edition releases." },
      { title: "360-Degree Product Views", description: "Multi-angle photo carousels showcasing materials, stitching, and sole detail." },
      { title: "Stock & Size Availability", description: "Real-time stock indicators across standard EU/US sizing." },
      { title: "Authentication Guarantee", description: "Verified authenticity highlights for rare and deadstock sneakers." }
    ]
  },
  {
    id: "accessories",
    slug: "accessories",
    name: "Accessories",
    shortDescription: "Tactile, refined product showcases crafted for watchmakers, leather crafters, eyewear brands, and jewelry ateliers.",
    suitableBusinesses: ["Jewelry Ateliers", "Watch Stockists", "Leather Goods Crafters", "Eyewear Brands"],
    previewImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Craftsmanship Spotlights", description: "Detailed breakdowns of metal purity, gemstone origin, and hand-stitching." },
      { title: "Gift Finder & Customization", description: "Monogramming preview and curated gift recommendations by occasion." },
      { title: "Interactive Product Zoom", description: "Crystal-clear macros for gemstone facets and precision watch movements." },
      { title: "Inquire / Reserve Piece", description: "Direct inquiry for high-value bespoke creations." }
    ]
  },
  {
    id: "interior-furniture",
    slug: "interior",
    name: "Interior & Furniture",
    shortDescription: "Architectural, tactile web presentations for interior designers, furniture studios, and architectural decor shops.",
    suitableBusinesses: ["Interior Design Studios", "Custom Furniture Makers", "Architectural Decor", "Lighting Showrooms"],
    previewImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Project Portfolio Showcase", description: "Filterable case studies showing before/after transformations and material boards." },
      { title: "Furniture Specs & Materials", description: "Downloadable spec sheets, dimensions, wood finishes, and upholstery options." },
      { title: "Consultation Request", description: "Design brief submission form for residential and commercial spaces." },
      { title: "3D Space Preview Integration", description: "Showcase architectural layouts and custom furniture placement." }
    ]
  },
  {
    id: "real-estate",
    slug: "real-estate",
    name: "Real Estate",
    shortDescription: "Sophisticated, property-first layouts designed for luxury real estate agencies, property developers, and brokerages.",
    suitableBusinesses: ["Luxury Brokerages", "Property Developers", "Commercial Agencies", "Short-let Management"],
    previewImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Interactive Property Listings", description: "Filter by location, price range, bedrooms, bathrooms, and property type." },
      { title: "Virtual Tour & Floor Plan", description: "High-res gallery, architectural floor plans, and video tour embeds." },
      { title: "Schedule Private Viewing", description: "Direct viewing request form with date picker and preferred agent selection." },
      { title: "Neighborhood Insights", description: "Key amenities, school distances, and location advantages." }
    ]
  },
  {
    id: "creative-portfolio",
    slug: "creative",
    name: "Creative / Portfolio",
    shortDescription: "Minimalist, high-impact portfolio layouts for photographers, art directors, architects, and creative studios.",
    suitableBusinesses: ["Photographers", "Art Directors", "Brand Designers", "Architectural Firms", "Video Directors"],
    previewImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Editorial Case Studies", description: "Deep-dive project breakdowns detailing project briefs, approach, and final deliverables." },
      { title: "Visual Gallery Grid", description: "Clean masonry and full-screen lightboxes with minimal clutter." },
      { title: "Client & Brand Roster", description: "Selected agency collaborators and brand partners." },
      { title: "Direct Commission Contact", description: "Streamlined project inquiry form with budget range selection." }
    ]
  },
  {
    id: "fitness",
    slug: "fitness",
    name: "Fitness",
    shortDescription: "Dynamic, energetic web experiences for boutique fitness studios, personal trainers, and wellness clubs.",
    suitableBusinesses: ["Boutique Gyms", "Pilates & Yoga Studios", "Personal Training Studios", "CrossFit Boxes"],
    previewImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Interactive Class Schedule", description: "Weekly timetable filtered by class type, instructor, and intensity." },
      { title: "Membership Tiers", description: "Transparent comparison of drop-in rates, monthly passes, and personal coaching." },
      { title: "Trainer Profiles", description: "Highlight coach backgrounds, specialties, and client milestones." },
      { title: "Free Trial Pass Request", description: "Simple claim form for first-time visitors." }
    ]
  },
  {
    id: "events-services",
    slug: "events",
    name: "Events & Services",
    shortDescription: "Polished, trust-building websites for event planners, wedding venues, corporate caterers, and AV production teams.",
    suitableBusinesses: ["Event Planners", "Wedding Venues", "Corporate Caterers", "AV & Stage Rental"],
    previewImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Event Gallery Showcase", description: "Categorized portfolios for weddings, corporate galas, and private dinners." },
      { title: "Service Packages & Inclusions", description: "Clear breakdown of styling, coordination, vendor management, and decor." },
      { title: "Availability & Consultation", description: "Event date inquiry checker and initial discovery call request." },
      { title: "Venue Specs & Capacities", description: "Guest capacity options, layout options, and catering facilities." }
    ]
  },
  {
    id: "bakery-cakes",
    slug: "bakery",
    name: "Bakery & Cakes",
    shortDescription: "Warm, mouth-watering digital storefronts for artisan bakeries, bespoke cake studios, and pastry shops.",
    suitableBusinesses: ["Bespoke Cake Designers", "Artisan Sourdough Bakeries", "Pastry Shops", "Cupcake Boutiques"],
    previewImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Custom Cake Builder Guide", description: "Step-by-step guidance on choosing sponge flavors, fillings, sizes, and decorative themes." },
      { title: "Daily Fresh Menu", description: "Real-time list of daily baked goods, pastries, and artisanal breads." },
      { title: "Event Cake Orders", description: "Wedding and milestone celebration cake inquiry system with reference photo uploads." },
      { title: "Pre-order & Collection Times", description: "Store pickup slots and local delivery radius options." }
    ]
  },
  {
    id: "beauty-products",
    slug: "beauty-products",
    name: "Beauty Products",
    shortDescription: "Clean, science-backed e-commerce layouts for skincare formulations, organic cosmetics, and haircare ranges.",
    suitableBusinesses: ["Skincare Brands", "Organic Cosmetics", "Haircare Formulations", "Fragrance Houses"],
    previewImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Ingredient Breakdown", description: "Transparent active ingredient highlights with skin benefit explanations." },
      { title: "Skin Type Quiz Integration", description: "Guide customers to customized skincare routines for their specific needs." },
      { title: "Routine Bundles", description: "Curated 3-step skincare sets with savings incentives." },
      { title: "Direct Order Inquiry", description: "Fast purchasing via WhatsApp order helper or standard checkout." }
    ]
  },
  {
    id: "general-store",
    slug: "general-store",
    name: "General Product Store",
    shortDescription: "Versatile, highly organized e-commerce interfaces designed for multi-category retail shops, lifestyle stores, and gift hubs.",
    suitableBusinesses: ["Lifestyle Concept Stores", "Gift Boutiques", "Department Goods", "Artisan Marketplaces"],
    previewImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Multi-Category Navigation", description: "Streamlined navigation through curated departments and seasonal highlights." },
      { title: "Best-seller Grid", description: "Featured product showcases with quick add and quick view overlays." },
      { title: "Customer Care & Shipping Info", description: "Clear delivery estimates, returns policy, and gift packaging options." },
      { title: "WhatsApp Direct Buy", description: "Instant product purchase confirmation through WhatsApp." }
    ]
  },
  {
    id: "home-services",
    slug: "home-services",
    name: "Home Services",
    shortDescription: "Trustworthy, conversion-oriented layouts tailored for solar installers, HVAC specialists, plumbers, and renovators.",
    suitableBusinesses: ["Solar & Energy Systems", "HVAC & AC Technicians", "Plumbing & Electrical", "Home Renovators"],
    previewImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Instant Quote Calculator", description: "Interactive estimate form based on property size, service type, and urgency." },
      { title: "Service Radius & Coverage", description: "Interactive map and list of serviced zip codes and neighborhoods." },
      { title: "Emergency Service CTA", description: "Prominent 24/7 call and WhatsApp direct line for urgent repair requests." },
      { title: "Guarantees & Certifications", description: "Licensed technician badges, warranties, and safety standards." }
    ]
  },
  {
    id: "education-training",
    slug: "education",
    name: "Education & Training",
    shortDescription: "Structured, inspiring academic and vocational portals for academies, professional institutes, coding bootcamps, and tutors.",
    suitableBusinesses: ["Professional Academies", "Vocational Institutes", "Coding Bootcamps", "Music & Arts Schools"],
    previewImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    relevantFeatures: [
      { title: "Course Curriculum Breakdown", description: "Module-by-module course overview, learning outcomes, and duration." },
      { title: "Instructor Credentials", description: "Industry expert bio highlights and professional achievements." },
      { title: "Enrollment & Scholarship Form", description: "Direct course application with cohort intake dates and payment plans." },
      { title: "Student Alumni Outcomes", description: "Authentic career transition paths and graduate skill portfolios." }
    ]
  }
];
