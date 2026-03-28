export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      fleet: "Fleet",
      pricing: "Pricing",
      blog: "Blog",
      contact: "Contact",
      bookNow: "Book Now"
    },
    hero: {
      badge: "✦ PREMIUM CHAUFFEUR SERVICE ✦",
      title: "Luxury Chauffeur & Premium Limo Experience in USA",
      subtitle: "Experience the pinnacle of sophisticated travel. From airport transfers to corporate events, we provide unparalleled luxury on every mile.",
      bookRide: "Book Your Ride",
      viewFleet: "View Our Fleet"
    },
    whyChooseUs: {
      title: "Why Choose Us",
      subtitle: "Unmatched excellence in every mile.",
      support: "24/7 VIP Support",
      supportDesc: "Always available concierge for your needs.",
      drivers: "Professional Drivers",
      driversDesc: "Certified and discreet expert chauffeurs.",
      punctuality: "99.9% Punctuality",
      punctualityDesc: "On-time arrival guarantee, every time.",
      fleet: "Premium Fleet",
      fleetDesc: "Meticulously maintained luxury vehicles."
    },
    fleet: {
      title: "Our Signature Fleet",
      subtitle: "Step into unparalleled comfort and prestige.",
      capacity: "Capacity",
      price: "Rates Starting",
      bookNow: "Book Now",
      details: "Details"
    },
    booking: {
      title: "Reservation Configuration",
      subtitle: "Configure your luxury journey securely and effortlessly.",
      steps: {
        trip: "Trip Info",
        vehicle: "Vehicle",
        details: "Details",
        review: "Review"
      },
      next: "Continue",
      back: "Back",
      submit: "Submit Reservation"
    },
    services: {
      title: "Signature Services",
      subtitle: "Unmatched excellence for every occasion.",
      learnMore: "Learn More",
      bookNow: "Book Now",
      whatIncluded: "What's Included",
      details: "Service Details"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      fleet: "Flota",
      pricing: "Precios",
      blog: "Blog",
      contact: "Contacto",
      bookNow: "Reservar"
    },
    hero: {
      badge: "✦ SERVICIO DE CHOFER PREMIUM ✦",
      title: "Experiencia de Chofer de Lujo y Limosina Premium en USA",
      subtitle: "Experimente la cima del viaje sofisticado. Desde traslados al aeropuerto hasta eventos corporativos, brindamos lujo incomparable en cada milla.",
      bookRide: "Reserva Tu Viaje",
      viewFleet: "Ver Nuestra Flota"
    },
    whyChooseUs: {
      title: "¿Por qué elegirnos?",
      subtitle: "Excelencia inigualable en cada milla.",
      support: "Soporte VIP 24/7",
      supportDesc: "Conserje siempre disponible para sus necesidades.",
      drivers: "Conductores Profesionales",
      driversDesc: "Choferes expertos certificados y discretos.",
      punctuality: "99.9% de Puntualidad",
      punctualityDesc: "Garantía de llegada a tiempo, siempre.",
      fleet: "Flota Premium",
      fleetDesc: "Vehículos de lujo meticulosamente mantenidos."
    },
    fleet: {
      title: "Nuestra Flota Exclusiva",
      subtitle: "Entre en un confort y prestigio inigualables.",
      capacity: "Capacidad",
      price: "Tarifas desde",
      bookNow: "Reservar Ahora",
      details: "Detalles"
    },
    booking: {
      title: "Configuración de Reserva",
      subtitle: "Configure su viaje de lujo de forma segura y sin esfuerzo.",
      steps: {
        trip: "Información del Viaje",
        vehicle: "Vehículo",
        details: "Detalles",
        review: "Revisión"
      },
      next: "Continuar",
      back: "Volver",
      submit: "Enviar Reserva"
    },
    services: {
      title: "Servicios Exclusivos",
      subtitle: "Excelencia incomparable para cada ocasión.",
      learnMore: "Saber más",
      bookNow: "Reservar ahora",
      whatIncluded: "Qué está incluido",
      details: "Detalles del servicio"
    }
  }
};

export type Language = 'en' | 'es';
export type TranslationKey = keyof typeof translations.en;
