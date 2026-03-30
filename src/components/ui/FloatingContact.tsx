'use client';

const PHONE_NUMBER = '+9779851249747'; // E.164 format for tel: links
const WHATSAPP_NUMBER = '9779851249747'; // digits only for wa.me

export default function FloatingContact() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        zIndex: 9999,
      }}
    >
      {/* ── Phone Button ── */}
      <div style={{ position: 'relative', width: '52px', height: '52px' }}>
        {/* Ring 1 – gold */}
        <span
          className="call-ring-1"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'rgba(212,175,55,0.35)',
            pointerEvents: 'none',
          }}
        />
        {/* Ring 2 – gold, delayed */}
        <span
          className="call-ring-2"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'rgba(212,175,55,0.20)',
            pointerEvents: 'none',
          }}
        />

        <a
          href={`tel:${PHONE_NUMBER}`}
          aria-label="Call Us"
          title="Call Us"
          style={{
            position: 'relative',
            zIndex: 1,
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(212,175,55,0.45)',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8962e')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#D4AF37')}
        >
          {/* Wiggling phone icon */}
          <span className="phone-wiggle" style={{ display: 'flex' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"
                fill="#0F1419"
              />
            </svg>
          </span>
        </a>
      </div>

      {/* ── WhatsApp Button ── */}
      <div style={{ position: 'relative', width: '52px', height: '52px' }}>
        {/* Ring 1 – green */}
        <span
          className="call-ring-1"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'rgba(37,211,102,0.35)',
            pointerEvents: 'none',
          }}
        />
        {/* Ring 2 – green, delayed */}
        <span
          className="call-ring-2"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'rgba(37,211,102,0.20)',
            pointerEvents: 'none',
          }}
        />

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          style={{
            position: 'relative',
            zIndex: 1,
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: '#25D366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1ebe5a')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#25D366')}
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 3C8.82 3 3 8.82 3 16c0 2.36.63 4.58 1.73 6.5L3 29l6.72-1.7A13 13 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm-4.37 7.33c.2 0 .42.01.6.01.24 0 .5.02.74.56.3.65.93 2.27.99 2.44.07.17.11.37.02.6-.09.22-.14.36-.28.55-.14.2-.3.44-.43.59-.14.15-.28.32-.12.62.16.3.72 1.19 1.55 1.93 1.07.95 1.97 1.24 2.25 1.38.29.14.46.12.63-.07.17-.19.73-.85.93-1.14.19-.29.38-.24.64-.14.26.1 1.67.79 1.96.93.29.14.48.21.55.33.07.12.07.68-.15 1.34-.22.65-1.3 1.28-1.79 1.32-.46.04-.9.2-3.05-.64-2.57-1.01-4.19-3.66-4.32-3.83-.13-.17-1.05-1.4-1.05-2.67 0-1.27.67-1.9.9-2.15.24-.25.52-.31.69-.31z"
              fill="white"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

