export const services = [
  {
    id: 'airport-transfer',
    name: 'Airport Transfer',
    icon: '✈️',
    description: 'Reliable, punctual airport pickup and drop-off service with meet and greet options.',
    features: ['Real-time flight tracking', 'Chauffeur meet & greet', 'Luggage assistance', '60 mins complimentary wait time'],
    price: 'From $80',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'wedding-limo',
    name: 'Wedding Limousine',
    icon: '💍',
    description: 'Make your special day perfect with our luxury wedding fleet and red-carpet service.',
    features: ['Red carpet rollout', 'Complimentary champagne', 'Just Married signage', 'Unlimited stops'],
    price: 'From $150/hr',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'corporate-travel',
    name: 'Corporate Travel',
    icon: '💼',
    description: 'Professional executive transportation acting as your mobile office on the go.',
    features: ['Strict confidentiality', 'On-board Wi-Fi', 'Corporate billing accounts', 'Last-minute adaptability'],
    price: 'Custom Rates',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'events-parties',
    name: 'Events & Parties',
    icon: '🎉',
    description: 'Arrive in style to galas, proms, sporting events, or a luxury night out in the city.',
    features: ['Premium audio systems', 'LED party lighting', 'Privacy partitions', 'Multiple vehicle options'],
    price: 'From $120/hr',
    image: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

export const fleet = [
  {
    id: 'cadillac-escalade',
    name: 'Cadillac Escalade',
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1582294246197-d86ce05cba27?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    seating: 6,
    features: ['Wi-Fi', 'Premium Bar', 'Leather Seats', 'Rear Climate Control'],
    priceHourly: '$150',
    priceTrip: '$250'
  },
  {
    id: 'mercedes-s-class',
    name: 'Mercedes S-Class',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    seating: 3,
    features: ['Massage Seats', 'Ambient Lighting', 'Privacy Blinds', 'Premium Audio'],
    priceHourly: '$130',
    priceTrip: '$200'
  },
  {
    id: 'lincoln-stretch',
    name: 'Lincoln Stretch Limo',
    category: 'Stretch Limousine',
    image: 'https://images.unsplash.com/photo-1563214545-c81bc638ef1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    seating: 10,
    features: ['Fiber Optic Lighting', 'Stocked Bar', 'Entertainment System', 'Privacy Divider'],
    priceHourly: '$200',
    priceTrip: '$350'
  }
];

export const testimonials = [
  {
    id: 1,
    name: "James Sterling",
    title: "CEO, Sterling Corp",
    image: "https://i.pravatar.cc/150?u=james",
    rating: 5,
    text: "Outstanding service. The chauffeur arrived 15 minutes early, the car was pristine, and the ride was exceptionally smooth. My absolute go-to for corporate travel."
  },
  {
    id: 2,
    name: "Olivia & Marcus",
    title: "Newlyweds",
    image: "https://i.pravatar.cc/150?u=olivia",
    rating: 5,
    text: "They made our wedding day flawless. The red carpet service and complimentary champagne were beautiful touches. The driver was so professional and accommodating."
  },
  {
    id: 3,
    name: "Eleanor Richards",
    title: "Frequent Traveler",
    image: "https://i.pravatar.cc/150?u=eleanor",
    rating: 5,
    text: "Finally, a reliable airport transfer service. Flight tracking takes all the stress out of delays. The driver was waiting exactly where promised."
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Top 5 Tips for Airport Transfers",
    slug: "airport-transfer-tips",
    author: "Sarah Johnson",
    date: "2024-03-20",
    category: "Travel Tips",
    excerpt: "Learn how to make your airport transfer smooth and hassle-free with our expert tips.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: 5
  },
  {
    id: 2,
    title: "Why Hire a Limousine for Your Corporate Event?",
    slug: "corporate-limousine-hire",
    author: "Michael Sterling",
    date: "2024-03-15",
    category: "Corporate",
    excerpt: "Discover the professional and logistical benefits of luxury transportation for your next corporate event.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: 4
  },
  {
    id: 3,
    title: "Planning the Perfect Wedding Transport",
    slug: "wedding-transport-planning",
    author: "Emma Davis",
    date: "2024-03-10",
    category: "Weddings",
    excerpt: "A comprehensive guide to ensuring your wedding day transportation is as perfect as the day itself.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: 6
  }
];
