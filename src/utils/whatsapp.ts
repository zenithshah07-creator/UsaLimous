export const OWNER_WHATSAPP = '9779805129944';

export const generateBookingWhatsAppLink = (data: any) => {
  const message = `
✦ NEW BOOKING REQUEST ✦
------------------------
Customer: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

Journey:
- Service: ${data.tripType.replace(/([A-Z])/g, ' $1').toUpperCase()}
- Vehicle: ${data.vehicleName}
- Date: ${data.date}
- Time: ${data.time}
- Pickup: ${data.pickup}
${data.dropoff ? `- Drop-off: ${data.dropoff}` : ''}
- Passengers: ${data.passengers} PAX

Est. Price: $${data.estimatedPrice}
------------------------
(USA LIMOS PREMIUM SERVICE)
  `.trim();

  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
};

export const generateContactWhatsAppLink = (data: any) => {
  const message = `
✦ NEW CONTACT INQUIRY ✦
------------------------
From: ${data.name}
Phone: ${data.phone || 'N/A'}
Subject: ${data.subject}

Message:
"${data.message}"
------------------------
(USA LIMOS PREMIUM SERVICE)
  `.trim();

  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
};
