import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Maximize } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Fix for default Leaflet icon issue in Vite/React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icon creator (Location Pin Style)
const createCustomIcon = (status) => {
  const color = status === 'Yes' ? '#10b981' : (status === 'In Progress' ? '#f59e0b' : '#ef4444');
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative flex items-center justify-center transform -translate-y-1/2">
        <svg class="animate-pin-bounce" width="24" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
          <path d="M12 0C7.58172 0 4 3.58172 4 8C4 13.5 12 24 12 24C12 24 20 13.5 20 8C20 3.58172 16.4183 0 12 0ZM12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z" fill="${color}"/>
        </svg>
      </div>
    `,
    iconSize: [24, 30],
    iconAnchor: [12, 30], // Point of the pin
    popupAnchor: [0, -30] // Popup above the pin
  });
};

const ResetViewButton = ({ center, zoom }) => {
  const map = useMap();
  
  const handleReset = () => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1
    });
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <button
        onClick={handleReset}
        className="flex items-center justify-center w-10 h-10 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 rounded-lg shadow-lg border border-slate-200 transition-all group"
        title="Reset to India View"
      >
        <Maximize size={20} className="group-active:scale-90 transition-transform" />
      </button>
    </div>
  );
};

const MapView = ({ data }) => {
  const [geoData, setGeoData] = useState(null);
  const center = [20.5937, 78.9629]; // India center
  const initialZoom = 5;

  useEffect(() => {
    // Fetch official India boundary GeoJSON
    fetch('https://raw.githubusercontent.com/datameet/maps/master/Country/india-land-simplified.geojson')
      .then(res => res.json())
      .then(json => setGeoData(json))
      .catch(err => console.error("Error loading boundary GeoJSON:", err));
  }, []);

  const markers = React.useMemo(() => {
    return data.map((supplier, index) => (
      <Marker 
        key={`${supplier.name}-${index}`} 
        position={[supplier.lat, supplier.lng]}
        icon={createCustomIcon(supplier.regulatoryStatus)}
      >
        <Popup className="custom-popup">
          <div className="p-0.5 min-w-[200px] font-sans leading-tight">
            <h3 className="text-sm font-bold text-blue-900 mb-1.5 border-b border-slate-100 pb-1">
              {supplier.name}
            </h3>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold uppercase tracking-tighter">Category</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded font-medium text-slate-700">{supplier.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold uppercase tracking-tighter">Cluster</span>
                <span className="text-slate-700 font-medium">{supplier.cluster}</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-slate-500 font-semibold uppercase tracking-tighter">Status</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  supplier.regulatoryStatus === 'Yes' ? 'bg-emerald-100 text-emerald-700' :
                  supplier.regulatoryStatus === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {supplier.regulatoryStatus}
                </span>
              </div>
              {supplier.keyProducts && (
                <div className="mt-1 pt-1 border-t border-slate-50">
                  <p className="text-slate-600 italic line-clamp-2">{supplier.keyProducts}</p>
                </div>
              )}
            </div>
          </div>
        </Popup>
      </Marker>
    ));
  }, [data]);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={5} 
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={{
              color: "#3b82f6", // Blue-500 to match theme
              weight: 2,
              opacity: 0.8,
              fillColor: "#3b82f6",
              fillOpacity: 0.05
            }} 
          />
        )}
        <MarkerClusterGroup chunkedLoading={true}>
          {markers}
        </MarkerClusterGroup>
        <ResetViewButton center={center} zoom={initialZoom} />
      </MapContainer>
    </div>
  );
};

export default MapView;
