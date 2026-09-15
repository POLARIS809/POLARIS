import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, ShieldAlert, Navigation, Compass, Radio, Wind, AlertTriangle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Fix Leaflet's default icon paths (broken by bundlers like Vite)
// ---------------------------------------------------------------------------
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ---------------------------------------------------------------------------
// Custom SVG-based DivIcons so markers match the POLARIS dark theme
// ---------------------------------------------------------------------------
const stationIcon = L.divIcon({
  className: '',
  html: `<div style="width:18px;height:18px;border-radius:50%;background:rgba(0,242,254,0.2);border:2px solid #00f2fe;box-shadow:0 0 10px #00f2fe;display:flex;align-items:center;justify-content:center;">
           <div style="width:6px;height:6px;border-radius:50%;background:#00f2fe;"></div>
         </div>`,
  iconSize:   [18, 18],
  iconAnchor: [9, 9],
});

const emergencyIcon = L.divIcon({
  className: '',
  html: `<div style="width:28px;height:28px;border-radius:50%;background:rgba(255,56,92,0.3);border:2px solid #ff385c;box-shadow:0 0 14px #ff385c;display:flex;align-items:center;justify-content:center;animation:pulse 1.5s infinite;">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff385c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
             <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
           </svg>
         </div>`,
  iconSize:   [28, 28],
  iconAnchor: [14, 14],
});

const personnelIcon = L.divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;border-radius:50%;background:rgba(0,245,212,0.3);border:2px solid #00f5d4;box-shadow:0 0 8px #00f5d4;display:flex;align-items:center;justify-content:center;">
           <div style="width:5px;height:5px;border-radius:50%;background:#00f5d4;"></div>
         </div>`,
  iconSize:   [14, 14],
  iconAnchor: [7, 7],
});

const personnelEmergencyIcon = L.divIcon({
  className: '',
  html: `<div style="width:16px;height:16px;border-radius:50%;background:rgba(255,179,3,0.4);border:2px solid #ffb703;box-shadow:0 0 10px #ffb703;display:flex;align-items:center;justify-content:center;animation:pulse 1.5s infinite;">
           <div style="width:6px;height:6px;border-radius:50%;background:#ffb703;"></div>
         </div>`,
  iconSize:   [16, 16],
  iconAnchor: [8, 8],
});

const waypointIcon = L.divIcon({
  className: '',
  html: `<div style="width:12px;height:12px;border-radius:50%;background:rgba(147,51,234,0.3);border:2px solid #9333ea;box-shadow:0 0 8px #9333ea;display:flex;align-items:center;justify-content:center;">
           <div style="width:4px;height:4px;border-radius:50%;background:#9333ea;"></div>
         </div>`,
  iconSize:   [12, 12],
  iconAnchor: [6, 6],
});

const demoLocationIcon = L.divIcon({
  className: '',
  html: `<div style="width:15px;height:15px;border-radius:50%;background:rgba(251,191,36,0.3);border:2px solid #fbbf24;box-shadow:0 0 9px #fbbf24;display:flex;align-items:center;justify-content:center;">
           <div style="width:5px;height:5px;border-radius:50%;background:#fbbf24;"></div>
         </div>`,
  iconSize:   [15, 15],
  iconAnchor: [7.5, 7.5],
});

// ---------------------------------------------------------------------------
// Existing station data — real decimal coordinates from polarMockData
// ---------------------------------------------------------------------------
const stations = [
  { id: 'bharathi',  name: 'Bharathi Station (Base Hub)', type: 'Station',    lat: -69.408, lng:  76.185, temp: '-24°C', latStr: "69°24'S", lngStr: "76°11'E" },
  { id: 'maitri',    name: 'Maitri Station',               type: 'Station',    lat: -70.750, lng:  11.733, temp: '-28°C', latStr: "70°45'S", lngStr: "11°44'E" },
  { id: 'camp-beta', name: 'Ridge Field Camp Beta',        type: 'Field Camp', lat: -69.520, lng:  76.310, temp: '-36°C', latStr: "69°52'S", lngStr: "76°31'E" },
];

// Route A (high crevasse risk) and Route B (recommended glacier rim)
// Both start at Bharathi and end at Ridge Camp Beta
const routeA = [[-69.408, 76.185], [-69.450, 76.220], [-69.520, 76.310]];
const routeB = [[-69.408, 76.185], [-69.460, 76.260], [-69.520, 76.310]];

// Demo: Shipping route from Goa, India → Cape Town, South Africa → Bharathi Station, Antarctica
const shippingRoute = [
  [15.2993, 74.1240],   // Goa Port, India (Mormugao Port Trust)
  [-33.9249, 18.4241],  // Cape Town, South Africa (Refueling Stop)
  [-69.408, 76.185]     // Bharathi Station, Antarctica (Final Destination)
];

// Additional 5 cargo shipping routes with container names
const cargoRoutes = [
  {
    id: 'route-crg-10452',
    name: 'CRG-10452 Deep Core Drill',
    color: '#ef4444',
    path: [
      [15.2993, 74.1240],   // Goa
      [-33.9249, 18.4241],  // Cape Town
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'In Transit - 84% Delay Risk',
    vessel: 'MV Polar Star'
  },
  {
    id: 'route-crg-10453',
    name: 'CRG-10453 Medical Supplies',
    color: '#10b981',
    path: [
      [-33.9249, 18.4241],  // Cape Town
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'Loaded - On Schedule',
    vessel: 'SA Agulhas II'
  },
  {
    id: 'route-crg-10454',
    name: 'CRG-10454 Diesel Fuel',
    color: '#f59e0b',
    path: [
      [-33.9249, 18.4241],  // Cape Town
      [-69.408, 76.185]     // Bharathi Fuel Depot
    ],
    status: 'Packed - 45% Delay Risk',
    vessel: 'MV Polar Star'
  },
  {
    id: 'route-crg-10455',
    name: 'CRG-10455 Satellite Comms',
    color: '#06b6d4',
    path: [
      [15.2993, 74.1240],   // Goa
      [-33.9249, 18.4241],  // Cape Town
      [-70.750, 11.733]     // Maitri Station
    ],
    status: 'Delivered',
    vessel: 'SA Agulhas II'
  },
  {
    id: 'route-crg-10456',
    name: 'CRG-10456 Food Rations',
    color: '#8b5cf6',
    path: [
      [15.2993, 74.1240],   // Goa
      [-48.5125, 44.6250],  // Halfway point (Indian Ocean)
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'In Transit - 28% Delay Risk',
    vessel: 'INS Airavat'
  },
  {
    id: 'route-crg-10457',
    name: 'CRG-10457 Solar Panel Kit',
    color: '#ec4899',
    path: [
      [15.2993, 74.1240],   // Goa
      [-33.9249, 18.4241],  // Cape Town
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'In Transit - 35% Delay Risk',
    vessel: 'MV Polar Star'
  },
  {
    id: 'route-crg-10458',
    name: 'CRG-10458 Weather Balloons',
    color: '#14b8a6',
    path: [
      [15.2993, 74.1240],   // Goa
      [-70.750, 11.733]     // Maitri Station
    ],
    status: 'Loaded - On Schedule',
    vessel: 'SA Agulhas II'
  },
  {
    id: 'route-crg-10459',
    name: 'CRG-10459 Snow Vehicles',
    color: '#f97316',
    path: [
      [-33.9249, 18.4241],  // Cape Town
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'In Transit - 52% Delay Risk',
    vessel: 'RV Kronprins Haakon'
  },
  {
    id: 'route-crg-10460',
    name: 'CRG-10460 Lab Equipment',
    color: '#a855f7',
    path: [
      [15.2993, 74.1240],   // Goa
      [-48.5125, 44.6250],  // Indian Ocean
      [-70.750, 11.733]     // Maitri
    ],
    status: 'In Transit - 22% Delay Risk',
    vessel: 'INS Airavat'
  },
  {
    id: 'route-crg-10461',
    name: 'CRG-10461 Emergency Rations',
    color: '#84cc16',
    path: [
      [-33.9249, 18.4241],  // Cape Town
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'Delivered',
    vessel: 'MV Polar Star'
  },
  {
    id: 'route-crg-10462',
    name: 'CRG-10462 Communication Array',
    color: '#06b6d4',
    path: [
      [15.2993, 74.1240],   // Goa
      [-33.9249, 18.4241],  // Cape Town
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'Packed - 18% Delay Risk',
    vessel: 'SA Agulhas II'
  },
  {
    id: 'route-crg-10463',
    name: 'CRG-10463 Oxygen Cylinders',
    color: '#f43f5e',
    path: [
      [15.2993, 74.1240],   // Goa
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'In Transit - 64% Delay Risk',
    vessel: 'INS Airavat'
  },
  {
    id: 'route-crg-10464',
    name: 'CRG-10464 Thermal Clothing',
    color: '#8b5cf6',
    path: [
      [-33.9249, 18.4241],  // Cape Town
      [-70.750, 11.733]     // Maitri
    ],
    status: 'Loaded - On Schedule',
    vessel: 'SA Agulhas II'
  },
  {
    id: 'route-crg-10465',
    name: 'CRG-10465 Water Purification',
    color: '#0ea5e9',
    path: [
      [15.2993, 74.1240],   // Goa
      [-48.5125, 44.6250],  // Indian Ocean
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'In Transit - 38% Delay Risk',
    vessel: 'MV Polar Star'
  },
  {
    id: 'route-crg-10466',
    name: 'CRG-10466 Seismic Sensors',
    color: '#facc15',
    path: [
      [15.2993, 74.1240],   // Goa
      [-33.9249, 18.4241],  // Cape Town
      [-70.750, 11.733]     // Maitri
    ],
    status: 'Delivered',
    vessel: 'RV Kronprins Haakon'
  },
  {
    id: 'route-crg-10467',
    name: 'CRG-10467 Spare Parts Kit',
    color: '#22c55e',
    path: [
      [-33.9249, 18.4241],  // Cape Town
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'In Transit - 41% Delay Risk',
    vessel: 'SA Agulhas II'
  },
  {
    id: 'route-crg-10468',
    name: 'CRG-10468 Satellite Dish',
    color: '#06b6d4',
    path: [
      [15.2993, 74.1240],   // Goa
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'Packed - 26% Delay Risk',
    vessel: 'INS Airavat'
  },
  {
    id: 'route-crg-10469',
    name: 'CRG-10469 Generators (3x)',
    color: '#fb923c',
    path: [
      [15.2993, 74.1240],   // Goa
      [-33.9249, 18.4241],  // Cape Town
      [-69.408, 76.185]     // Bharathi
    ],
    status: 'In Transit - 76% Delay Risk',
    vessel: 'MV Polar Star'
  },
  {
    id: 'route-crg-10470',
    name: 'CRG-10470 Scientific Books',
    color: '#c084fc',
    path: [
      [-33.9249, 18.4241],  // Cape Town
      [-70.750, 11.733]     // Maitri
    ],
    status: 'Loaded - On Schedule',
    vessel: 'SA Agulhas II'
  },
  {
    id: 'route-crg-10471',
    name: 'CRG-10471 Biochem Lab Kit',
    color: '#10b981',
    path: [
      [15.2993, 74.1240],   // Goa
      [-48.5125, 44.6250],  // Indian Ocean
      [-70.750, 11.733]     // Maitri
    ],
    status: 'In Transit - 19% Delay Risk',
    vessel: 'RV Kronprins Haakon'
  }
];

// Waypoint markers for the shipping route
const shippingWaypoints = [
  { name: 'Goa Port (India)', lat: 15.2993, lng: 74.1240, desc: 'Origin: NCPOR HQ Cargo Departure Point' },
  { name: 'Cape Town (South Africa)', lat: -33.9249, lng: 18.4241, desc: 'Refueling & Supply Stop' },
  { name: 'Bharathi Station', lat: -69.408, lng: 76.185, desc: 'Final Destination: Antarctica' }
];

// Additional demo locations: Research vessels and field stations
const demoLocations = [
  { 
    id: 'vessel-1',
    name: 'MV Polar Star (Icebreaker)',
    type: 'Research Vessel',
    lat: -55.850,
    lng: 50.200,
    status: 'En Route to Bharathi',
    desc: 'Class A1 Icebreaker carrying Deep Core Drill Rig CRG-10452',
    icon: '🚢'
  },
  { 
    id: 'station-himadri',
    name: 'Himadri Station (Arctic)',
    type: 'Arctic Research Station',
    lat: 78.9250,
    lng: 11.9300,
    status: 'Operational',
    desc: 'India\'s Arctic research base in Svalbard, Norway',
    icon: '🏔️'
  },
  { 
    id: 'field-alpha',
    name: 'Glacier Survey Camp Alpha',
    type: 'Temporary Field Camp',
    lat: -69.650,
    lng: 76.450,
    status: 'Active - 12 Personnel',
    desc: 'Temporary drilling site for ice core sampling',
    icon: '⛺'
  }
];

// Dark OSM tile style that best matches the POLARIS #030917 background
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Map is centred on Indian Ocean (between India and Antarctica) to show full shipping route
const MAP_CENTER = [-25, 60];
const MAP_ZOOM   = 3;

export default function PolarMap({ personnelList, incidents, activeRoute }) {
  const [selectedPin, setSelectedPin] = useState(null);

  const hasActiveEmergency = incidents.some(
    i => i.status === 'ACTIVE' && i.severity === 'CRITICAL'
  );

  return (
    <div className="glass-card p-4 relative overflow-hidden flex flex-col h-full min-h-[420px]">

      {/* ── Header & Controls (unchanged) ── */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#00f2fe] animate-spin-slow" />
          <h3 className="text-sm font-bold text-[#f0f6fc] uppercase tracking-wider">
            Antarctic Operational Sector GPS Radar (Bharathi / Maitri)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            <Radio className="w-3 h-3 animate-pulse" /> Live Telemetry
          </span>
          <span className="text-[#8b949e] bg-white/5 px-2 py-0.5 rounded">Grid: 69°S - 76°E</span>
        </div>
      </div>

      {/* ── Leaflet Map Canvas ── */}
      <div className="relative flex-1 w-full rounded-xl border border-[#00f2fe]/20 overflow-hidden shadow-inner" style={{ minHeight: 340 }}>

        <MapContainer
          center={MAP_CENTER}
          zoom={MAP_ZOOM}
          style={{ width: '100%', height: '100%', minHeight: 340, background: '#030917' }}
          scrollWheelZoom={true}
          zoomControl={true}
        >
          {/* OpenStreetMap tiles */}
          <TileLayer url={TILE_URL} attribution={ATTRIBUTION} />

          {/* Original shipping route: Goa → Cape Town → Bharathi (purple dashed line) */}
          <Polyline
            positions={shippingRoute}
            pathOptions={{ color: '#9333ea', weight: 2.5, dashArray: '8 5', opacity: 0.8 }}
          />

          {/* 5 Cargo container routes with different colors */}
          {cargoRoutes.map((route) => (
            <Polyline
              key={route.id}
              positions={route.path}
              pathOptions={{ 
                color: route.color, 
                weight: 2.5, 
                dashArray: route.status.includes('Delivered') ? '2 8' : '6 4',
                opacity: route.status.includes('Delivered') ? 0.4 : 0.75
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'monospace', fontSize: 11, minWidth: 240 }}>
                  <strong style={{ color: route.color, fontSize: 12 }}>{route.name}</strong>
                  <div style={{ marginTop: 4, color: '#444', lineHeight: 1.5 }}>
                    <div><strong>Status:</strong> {route.status}</div>
                    <div><strong>Vessel:</strong> {route.vessel}</div>
                    <div style={{ marginTop: 4, fontSize: 10, color: '#666' }}>
                      🚢 Click route line to view cargo tracking details
                    </div>
                  </div>
                </div>
              </Popup>
            </Polyline>
          ))}

          {/* Shipping waypoint markers */}
          {shippingWaypoints.map((wp, idx) => (
            <Marker
              key={`waypoint-${idx}`}
              position={[wp.lat, wp.lng]}
              icon={waypointIcon}
            >
              <Popup>
                <div style={{ fontFamily: 'monospace', fontSize: 11, minWidth: 200 }}>
                  <strong style={{ color: '#9333ea', fontSize: 12 }}>{wp.name}</strong>
                  <div style={{ marginTop: 4, color: '#444' }}>
                    {wp.desc}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 10, color: '#666' }}>
                    {idx === 0 && '🚢 Cargo Origin Point'}
                    {idx === 1 && '⛽ Refueling & Resupply Hub'}
                    {idx === 2 && '🏁 Final Antarctic Destination'}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Additional demo locations: vessels, stations, field camps */}
          {demoLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={demoLocationIcon}
            >
              <Popup>
                <div style={{ fontFamily: 'monospace', fontSize: 11, minWidth: 220 }}>
                  <strong style={{ color: '#fbbf24', fontSize: 12 }}>
                    {loc.icon} {loc.name}
                  </strong>
                  <div style={{ marginTop: 4, color: '#444', lineHeight: 1.5 }}>
                    <div><strong>Type:</strong> {loc.type}</div>
                    <div><strong>Status:</strong> <span style={{ color: '#16a34a', fontWeight: 700 }}>{loc.status}</span></div>
                    <div style={{ marginTop: 4, fontSize: 10, color: '#666' }}>
                      {loc.desc}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Route A — red dashed */}
          <Polyline
            positions={routeA}
            pathOptions={{ color: '#ff385c', weight: 3, dashArray: '6 4' }}
          />

          {/* Route B — cyan solid (AI recommended) */}
          <Polyline
            positions={routeB}
            pathOptions={{ color: '#00f2fe', weight: 3 }}
          />

          {/* Station markers */}
          {stations.map(st => (
            <Marker
              key={st.id}
              position={[st.lat, st.lng]}
              icon={stationIcon}
              eventHandlers={{ click: () => setSelectedPin(st) }}
            >
              <Popup>
                <div style={{ fontFamily: 'monospace', fontSize: 12, minWidth: 180 }}>
                  <strong style={{ color: '#00f2fe' }}>{st.name}</strong>
                  <div style={{ marginTop: 4, color: '#444' }}>
                    <div>Lat: {st.latStr} &nbsp; Lng: {st.lngStr}</div>
                    <div>Temp: <strong>{st.temp}</strong></div>
                    <div>Status: <span style={{ color: '#16a34a' }}>Operational</span></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Emergency beacon marker at Ridge Camp Beta */}
          {hasActiveEmergency && (
            <Marker
              position={[-69.520, 76.310]}
              icon={emergencyIcon}
            >
              <Popup>
                <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#dc2626', fontWeight: 700 }}>
                  ⚠ CRITICAL MEDICAL EMERGENCY<br />
                  <span style={{ fontWeight: 400, color: '#555' }}>Ridge Field Camp Beta</span>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Personnel location markers */}
          {personnelList && personnelList.map(person => {
            if (!person.coordinates || !person.coordinates.lat || !person.coordinates.lng) return null;
            
            const isEmergency = person.status === 'Emergency';
            const icon = isEmergency ? personnelEmergencyIcon : personnelIcon;
            
            return (
              <Marker
                key={person.id}
                position={[person.coordinates.lat, person.coordinates.lng]}
                icon={icon}
              >
                <Popup>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, minWidth: 200 }}>
                    <strong style={{ color: isEmergency ? '#ffb703' : '#00f5d4', fontSize: 12 }}>
                      {person.name}
                    </strong>
                    <div style={{ marginTop: 4, color: '#444', lineHeight: 1.4 }}>
                      <div><strong>Role:</strong> {person.role}</div>
                      <div><strong>Team:</strong> {person.team}</div>
                      <div><strong>Location:</strong> {person.currentLocation}</div>
                      <div><strong>Status:</strong> <span style={{ 
                        color: isEmergency ? '#dc2626' : '#16a34a',
                        fontWeight: 700
                      }}>{person.status}</span></div>
                      <div style={{ marginTop: 4, fontSize: 10, color: '#666' }}>
                        Contact: {person.contact}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* ── Map Legend overlay (unchanged position/style) ── */}
        <div className="absolute bottom-3 left-3 bg-[#040914]/85 border border-white/10 p-2.5 rounded-lg text-[10px] font-mono flex flex-col gap-1.5 z-[1000] backdrop-blur pointer-events-none max-h-[85%] overflow-y-auto">
          <div className="font-bold text-[#f0f6fc] border-b border-white/10 pb-1 sticky top-0 bg-[#040914]">MAP LEGEND</div>
          
          {/* Locations */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
            <span className="text-[#8b949e]">NCPOR Station Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24] shadow-[0_0_6px_#fbbf24]" />
            <span className="text-[#8b949e]">Vessels / Field Camps</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9333ea] shadow-[0_0_6px_#9333ea]" />
            <span className="text-[#8b949e]">Shipping Waypoint</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f5d4] shadow-[0_0_6px_#00f5d4]" />
            <span className="text-[#8b949e]">Personnel (Active)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffb703] shadow-[0_0_6px_#ffb703]" />
            <span className="text-amber-300 font-bold">Personnel (Emergency)</span>
          </div>
          
          {/* Divider */}
          <div className="border-t border-white/10 my-0.5"></div>
          
          {/* Routes */}
          <div className="text-[9px] font-bold text-white/60 uppercase">Cargo Routes (20):</div>
          <div className="grid grid-cols-1 gap-0.5 max-h-32 overflow-y-auto text-[9px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#ef4444] shrink-0" />
              <span className="text-red-300 truncate">CRG-10452 Drill</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#10b981] shrink-0" />
              <span className="text-emerald-300 truncate">CRG-10453 Medical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#f59e0b] shrink-0" />
              <span className="text-amber-300 truncate">CRG-10454 Fuel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#06b6d4] shrink-0" />
              <span className="text-cyan-300 truncate">CRG-10455 Comms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#8b5cf6] shrink-0" />
              <span className="text-purple-300 truncate">CRG-10456 Food</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#ec4899] shrink-0" />
              <span className="text-pink-300 truncate">CRG-10457 Solar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#14b8a6] shrink-0" />
              <span className="text-teal-300 truncate">CRG-10458 Balloons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#f97316] shrink-0" />
              <span className="text-orange-300 truncate">CRG-10459 Vehicles</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#a855f7] shrink-0" />
              <span className="text-purple-400 truncate">CRG-10460 Lab Eq</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#84cc16] shrink-0" />
              <span className="text-lime-300 truncate">CRG-10461 E.Rations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#06b6d4] shrink-0" />
              <span className="text-cyan-300 truncate">CRG-10462 Array</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#f43f5e] shrink-0" />
              <span className="text-rose-300 truncate">CRG-10463 Oxygen</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#8b5cf6] shrink-0" />
              <span className="text-purple-300 truncate">CRG-10464 Clothing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#0ea5e9] shrink-0" />
              <span className="text-sky-300 truncate">CRG-10465 Water</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#facc15] shrink-0" />
              <span className="text-yellow-300 truncate">CRG-10466 Sensors</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#22c55e] shrink-0" />
              <span className="text-green-300 truncate">CRG-10467 Parts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#06b6d4] shrink-0" />
              <span className="text-cyan-300 truncate">CRG-10468 Dish</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#fb923c] shrink-0" />
              <span className="text-orange-400 truncate">CRG-10469 Generator</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#c084fc] shrink-0" />
              <span className="text-purple-400 truncate">CRG-10470 Books</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#10b981] shrink-0" />
              <span className="text-emerald-300 truncate">CRG-10471 Bio Kit</span>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-white/10 my-0.5"></div>
          
          {/* Antarctic Routes */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#00f2fe]" />
            <span className="text-[#8b949e]">Route B (Recommended)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-red-500" />
            <span className="text-[#8b949e]">Route A (Crevasse Risk)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold">Medical Emergency</span>
          </div>
        </div>

      </div>
    </div>
  );
}
