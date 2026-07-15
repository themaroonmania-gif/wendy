import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MapPin, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LOCATIONS = [
  {
    id: 'addison',
    name: 'Addison Office',
    address: '16970 Dallas Parkway, Building 300',
    city: 'Dallas, TX 75248',
    note: 'Building 300 is not seen from the parking lot; it is located in the mid-center of the complex.',
    image: 'https://addisontherapy.com/__l5e/assets-v1/24a3d76d-583a-4ccd-9123-d20ddadbcf1a/addison-therapy-office-exterior.jpg',
    coords: [32.987, -96.829]
  },
  {
    id: 'fortworth',
    name: 'Fort Worth Office',
    address: '4700 Bryant Irvin Court, Suite 303',
    city: 'Fort Worth, TX 76107',
    note: 'Free surface parking on-site, directly in front of the building.',
    image: 'https://addisontherapy.com/__l5e/assets-v1/f7e1b18d-2164-4416-9af1-9c962f820a64/fort-worth-therapy-office-exterior.jpg',
    coords: [32.7115, -97.4198]
  },
  {
    id: 'dallas',
    name: 'Dallas Office',
    address: '8350 North Central Expy STE 1275',
    city: 'Dallas, TX 75206',
    note: 'Office relocation coming in August 2026. Free surface parking on-site.',
    image: null,
    coords: [32.8718, -96.7699]
  },
  {
    id: 'prosper',
    name: 'Prosper Office',
    address: '212 E. Broadway',
    city: 'Prosper, TX 75078',
    note: 'Free surface parking on-site, directly in front of the building.',
    image: null,
    coords: [33.2362, -96.7886]
  }
];

// Helper to recenter map when clicking a location in the grid
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 12, { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function Locations() {
  const cardsRef = useRef([]);
  const [activeCenter, setActiveCenter] = useState([32.95, -97.0]); // DFW general center

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px' }}>
            <div>
              <p className="hero-eyebrow">Office Locations</p>
              <h1 style={{ marginBottom: '1rem' }}>In-person care in DFW.</h1>
              <p className="hero-desc">
                Find our four office locations across the Dallas-Fort Worth metroplex. Click any marker on the map for address and turn-by-turn directions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary" style={{ paddingTop: '1rem' }}>
        <div className="container">
          
          {/* Interactive Map */}
          <div style={{ width: '100%', height: '500px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '4rem', zIndex: 1, position: 'relative' }}>
            <MapContainer center={activeCenter} zoom={10} style={{ width: '100%', height: '100%', zIndex: 1 }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <MapController center={activeCenter} />
              
              {LOCATIONS.map((loc) => (
                <Marker key={loc.id} position={loc.coords}>
                  <Popup className="custom-popup">
                    <div style={{ margin: '-14px -20px -14px -20px', borderRadius: '8px', overflow: 'hidden', minWidth: '220px' }}>
                      {loc.image && (
                        <img src={loc.image} alt={loc.name} style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
                      )}
                      <div style={{ padding: '1rem' }}>
                        <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>{loc.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{loc.address}</span>
                        <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{loc.city}</span>
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(loc.address + ', ' + loc.city)}`} 
                           target="_blank" rel="noopener noreferrer"
                           style={{ display: 'inline-block', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>
                          Get Directions →
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="concern-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {LOCATIONS.map((loc, i) => (
              <div 
                key={loc.id} 
                className="concern-card" 
                ref={el => cardsRef.current[i] = el}
                onClick={() => setActiveCenter(loc.coords)}
                style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
              >
                {loc.image ? (
                  <img src={loc.image} alt={loc.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '200px', background: 'var(--bg-section-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin color="var(--accent)" size={48} opacity={0.3} />
                  </div>
                )}
                
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} color="var(--accent)" />
                    {loc.name}
                  </h3>
                  <p style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{loc.address}</p>
                  <p style={{ marginBottom: '1.5rem' }}>{loc.city}</p>
                  
                  <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    {loc.note}
                  </p>
                  
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(loc.address + ', ' + loc.city)}`} 
                     target="_blank" rel="noopener noreferrer"
                     onClick={e => e.stopPropagation()}
                     style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                    Get Directions <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', padding: '4rem', background: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <p className="hero-eyebrow">Telehealth</p>
            <h2 style={{ marginBottom: '1rem' }}>Virtual services throughout Texas.</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              For clients located anywhere in Texas, many of our clinicians offer secure telehealth appointments. Telehealth provides the same depth of care with greater flexibility for busy schedules.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
