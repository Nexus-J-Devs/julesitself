export const SERVICES_AND_EDU_DATA = {
  salon: {
    defaultName: "Verve Hair",
    tagline: "Luxury Hair Styling, Braiding & Barbering Lounge in Victoria Island",
    services: [
      { id: "sal-1", name: "Knotless Braids (Medium Back-Length)", duration: "3 hrs", price: 30000, category: "braids" },
      { id: "sal-2", name: "Silk Press & Deep Conditioning", duration: "1.5 hrs", price: 25000, category: "styling" },
      { id: "sal-3", name: "Wig Installation & Customization", duration: "2 hrs", price: 35000, category: "wigs" },
      { id: "sal-4", name: "Executive Gentleman Cut & Beard Trim", duration: "45 mins", price: 15000, category: "barber" }
    ]
  },
  fitness: {
    defaultName: "Forme Studio",
    tagline: "High-Performance Reformer Pilates & Conditioning Studio in Lekki Phase 1",
    classes: [
      { id: "fit-1", name: "Reformer Athletic Sculpt", day: "Monday", time: "07:00 AM", instructor: "Amina", capacity: "10 Reformers" },
      { id: "fit-2", name: "Full Body Core & Mobility", day: "Wednesday", time: "09:00 AM", instructor: "Kenshiro", capacity: "10 Reformers" },
      { id: "fit-3", name: "High-Intensity Pilates Interval", day: "Friday", time: "05:30 PM", instructor: "Amina", capacity: "10 Reformers" },
      { id: "fit-4", name: "Weekend Reformer & Stretch", day: "Saturday", time: "08:30 AM", instructor: "Tobi", capacity: "10 Reformers" }
    ],
    memberships: [
      { name: "Starter (4 Classes/Mo)", price: 45000 },
      { name: "Pro Reformer (10 Classes/Mo)", price: 95000 },
      { name: "Unlimited Executive", price: 160000 }
    ]
  },
  homeServices: {
    defaultName: "Prime Fix",
    tagline: "24/7 Professional Electrical, Plumbing & HVAC Maintenance in Lagos",
    services: [
      { id: "hs-1", name: "AC Inverter Servicing & Gas Top-Up", price: 18000, time: "Same Day" },
      { id: "hs-2", name: "Inverter & Solar Panel Installation", price: 120000, time: "1-2 Days" },
      { id: "hs-3", name: "Plumbing Leak Repair & Unclogging", price: 15000, time: "Emergency 2h" },
      { id: "hs-4", name: "Full House Re-Wiring Inspection", price: 45000, time: "Scheduled" }
    ]
  },
  education: {
    defaultName: "Apex Academy",
    tagline: "Practical Tech, Product Design & Digital Skills Bootcamp in Yaba",
    courses: [
      { id: "edu-1", name: "Full-Stack Web Development BootCamp", duration: "12 Weeks", price: 350000, schedule: "Mon & Wed (Hybrid)", level: "Beginner to Pro" },
      { id: "edu-2", name: "UI/UX Product Design Intensive", duration: "8 Weeks", price: 250000, schedule: "Tue & Thu (Online)", level: "All Levels" },
      { id: "edu-3", name: "Data Analytics with Python & SQL", duration: "10 Weeks", price: 300000, schedule: "Saturdays (In-Person)", level: "Intermediate" }
    ]
  }
};
