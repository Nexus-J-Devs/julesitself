export const BAKERY_DATA = {
  defaultName: "Maison Crumb",
  tagline: "Artisanal French Pastries & Custom Celebration Cakes in Victoria Island",
  locations: [
    { name: "Victoria Island Bakery", address: "12 Akin Adesola Street, Victoria Island, Lagos", phone: "+234 812 593 7596" },
    { name: "Lekki Phase 1 Bistro", address: "8 Admiralty Way, Lekki Phase 1, Lagos", phone: "+234 812 593 7596" }
  ],
  cakeSizes: [
    { name: "6-Inch Mini (6-8 Slices)", price: 22000 },
    { name: "8-Inch Classic (12-16 Slices)", price: 35000 },
    { name: "10-Inch Party (20-25 Slices)", price: 52000 },
    { name: "2-Tier Celebration (40+ Slices)", price: 85000 }
  ],
  flavors: [
    "Red Velvet & Cream Cheese",
    "Rich Belgian Chocolate Fudge",
    "Madagascar Vanilla & Strawberry",
    "Caramel Biscoff Crunch",
    "Lemon Raspberry Chiffon"
  ],
  products: [
    { id: "bak-1", name: "Classic Butter Croissant (4 Pack)", price: 6500, category: "pastries", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80" },
    { id: "bak-2", name: "Pain au Chocolat (Box of 4)", price: 7500, category: "pastries", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80" },
    { id: "bak-3", name: "Artisanal Sourdough Loaf", price: 4500, category: "bread", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80" },
    { id: "bak-4", name: "Assorted French Macarons (12 Pcs)", price: 14000, category: "confections", image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80" },
    { id: "bak-5", name: "Fruit Tartlet with Vanilla Custard", price: 4000, category: "pastries", image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80" }
  ]
};

export const SPA_DATA = {
  defaultName: "Lumé Wellness",
  tagline: "Holistic Thermal Sanctuary & Rejuvenation Spa in Ikoyi",
  locations: [
    { name: "Ikoyi Sanctuary", address: "5 Bourdillon Road, Ikoyi, Lagos", phone: "+234 812 593 7596" },
    { name: "Banana Island Pavilion", address: "Ocean View Drive, Banana Island, Lagos", phone: "+234 812 593 7596" }
  ],
  services: [
    { id: "spa-1", name: "Deep Tissue Muscle Restoration", duration: "75 mins", price: 35000, category: "massage", description: "Targeted deep pressure massage using organic essential oils to release muscular knots." },
    { id: "spa-2", name: "Radiance Hydro-Gel Facial", duration: "60 mins", price: 30000, category: "facial", description: "Cellular rejuvenation facial featuring hyaluronic acid infusion and micro-current lifting." },
    { id: "spa-3", name: "Hot Volcanic Stone Massage", duration: "90 mins", price: 45000, category: "massage", description: "Warm basalt stones placed along energy points to promote circulation and deep calm." },
    { id: "spa-4", name: "Detoxifying Body Scrub & Polish", duration: "60 mins", price: 28000, category: "body", description: "Exfoliating Dead Sea salt scrub followed by hydrating shea butter massage." }
  ]
};
