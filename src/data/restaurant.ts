export interface MenuItem {
  id: string;
  name: string;
  category: 'mains' | 'starters' | 'soups' | 'grills' | 'drinks' | 'pastries';
  price: number;
  description: string;
  image: string;
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
}

export const RESTAURANT_DATA = {
  defaultName: "Mama Tayo Kitchen",
  tagline: "Authentic Nigerian Culinary Excellence in the Heart of Lagos",
  locations: [
    { name: "Victoria Island Flagship", address: "14 Admiralty Way, Victoria Island, Lagos", phone: "+234 812 593 7596", hours: "Mon-Sun: 10:00 AM - 11:00 PM" },
    { name: "Ikeja GRA Branch", address: "28 Isaac John Street, Ikeja GRA, Lagos", phone: "+234 812 593 7596", hours: "Mon-Sun: 09:00 AM - 10:30 PM" }
  ],
  deliveryAreas: [
    { name: "Victoria Island / Ikoyi", fee: 1500 },
    { name: "Lekki Phase 1 / Oniru", fee: 2000 },
    { name: "Ajah / Sangotedo", fee: 3500 },
    { name: "Ikeja / Maryland / Anthony", fee: 2500 },
    { name: "Yaba / Surulere", fee: 2500 }
  ],
  menu: [
    {
      id: "rest-1",
      name: "Party Jollof Rice with Beef",
      category: "mains",
      price: 6500,
      description: "Smoky firewood-cooked Jollof rice served with tender fried beef, fried plantain, and coleslaw.",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "rest-2",
      name: "Jollof Rice and Grilled Chicken",
      category: "mains",
      price: 7000,
      description: "Richly seasoned tomato Jollof rice accompanied by quarter-grilled spicy chicken and dodo.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "rest-3",
      name: "Ofada Rice and Ayamase Stew",
      category: "mains",
      price: 8500,
      description: "Local unpolished Ofada rice served in banana leaves with green pepper bleached-palm oil stew, boiled eggs, and assorted meats.",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
      spicy: true,
      popular: true
    },
    {
      id: "rest-4",
      name: "Egusi Soup with Pounded Yam",
      category: "mains",
      price: 9000,
      description: "Rich melon seed soup cooked with stockfish, dry fish, fresh spinach, and soft smooth pounded yam.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "rest-5",
      name: "Efo Riro with Assorted Meat",
      category: "mains",
      price: 8500,
      description: "Traditional Yoruba spinach stew simmered with iru (locust beans), shaki, cow tripe, and fried croaker fish.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      spicy: true
    },
    {
      id: "rest-6",
      name: "Fried Rice and Crispy Turkey",
      category: "mains",
      price: 7500,
      description: "Savory fried rice loaded with diced carrots, sweet peas, liver chunks, and fried turkey wing.",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "rest-7",
      name: "Peppered Gizzard",
      category: "starters",
      price: 4500,
      description: "Deep-fried turkey gizzards tossed in hot bell pepper reduction and sliced onions.",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
      spicy: true,
      popular: true
    },
    {
      id: "rest-8",
      name: "Suya Platter",
      category: "starters",
      price: 6000,
      description: "Charbroiled beef skewers coated in Yaji peanut spice mix served with sliced red onions and cabbage.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      spicy: true,
      popular: true
    },
    {
      id: "rest-9",
      name: "Steamed Moi Moi Elegushi",
      category: "starters",
      price: 3000,
      description: "Steamed blended bean pudding stuffed with boiled egg, flaked fish, and red peppers.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      vegetarian: true
    },
    {
      id: "rest-10",
      name: "Spicy Asun (Sizzling Goat Meat)",
      category: "starters",
      price: 7000,
      description: "Flame-roasted habanero goat meat chunks tossed with scotch bonnet and green peppers.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      spicy: true,
      popular: true
    },
    {
      id: "rest-11",
      name: "Catfish Pepper Soup",
      category: "soups",
      price: 8000,
      description: "Fresh ocean catfish steeped in aromatic pepper soup spices, wild mint leaves, and chili broth.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
      spicy: true,
      popular: true
    },
    {
      id: "rest-12",
      name: "Goat Meat Pepper Soup",
      category: "soups",
      price: 7500,
      description: "Tender goat meat cubes boiled with traditional African herbs and spicy pepper soup broth.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      spicy: true
    },
    {
      id: "rest-13",
      name: "Whole Charcoal Grilled Tilapia",
      category: "grills",
      price: 12000,
      description: "Fresh tilapia fish marinated in chili garlic oil, charcoal grilled and served with fried yam fries and pepper sauce.",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: "rest-14",
      name: "BBQ Spicy Chicken Quarter",
      category: "grills",
      price: 5500,
      description: "Slow-roasted chicken quarter slathered in smoky scotch bonnet BBQ glaze.",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "rest-15",
      name: "Golden Fried Sweet Plantain (Dodo)",
      category: "starters",
      price: 2000,
      description: "Ripened sweet yellow plantain discs deep-fried to a golden caramel crust.",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      vegetarian: true
    },
    {
      id: "rest-16",
      name: "Chilled Zobo Drink (Hibiscus Mint)",
      category: "drinks",
      price: 2000,
      description: "Cold-infused dried hibiscus flowers steeped with ginger, pineapple slices, and fresh mint leaves.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      popular: true
    },
    {
      id: "rest-17",
      name: "Classic Lagos Chapman Mocktail",
      category: "drinks",
      price: 2500,
      description: "Refreshing mixture of Angostura bitters, Fanta, Sprite, cucumber slices, and lemon wedges over crushed ice.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      popular: true
    },
    {
      id: "rest-18",
      name: "Fresh Creamy Kunu Drink",
      category: "drinks",
      price: 1800,
      description: "Traditional spiced millet drink flavoured with sweet clove and tiger nut essence.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
      vegetarian: true
    },
    {
      id: "rest-19",
      name: "Crunchy Chin Chin Bag",
      category: "pastries",
      price: 2500,
      description: "Handmade sweet fried nutmeg pastry cubes packed fresh for crunchiness.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
      vegetarian: true
    },
    {
      id: "rest-20",
      name: "Hot Golden Puff Puff (6 Pieces)",
      category: "pastries",
      price: 2000,
      description: "Fluffy yeast dough balls deep-fried and dusted with a hint of cinnamon sugar.",
      image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      vegetarian: true,
      popular: true
    },
    {
      id: "rest-21",
      name: "Gizdodo Bowl",
      category: "mains",
      price: 6500,
      description: "Tasty combination of peppered chicken gizzard and sweet fried plantain cubes tossed in rich tomato gravy.",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
      spicy: true
    },
    {
      id: "rest-22",
      name: "Nkwobi (Spicy Cow Foot)",
      category: "starters",
      price: 7500,
      description: "Braised cow foot cooked in warm palm oil potash sauce garnished with utazi leaves.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      spicy: true
    },
    {
      id: "rest-23",
      name: "Seafood Okra Soup with Semovita",
      category: "mains",
      price: 11000,
      description: "Chopped fresh okra broth loaded with king prawns, crab legs, fresh fish, and soft semovita swallow.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "rest-24",
      name: "Cold Tiger Nut Milk (Kunun Aya)",
      category: "drinks",
      price: 2200,
      description: "Chilled blended tiger nuts, dates, and coconut milk served over ice.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      vegetarian: true
    }
  ] as MenuItem[]
};
