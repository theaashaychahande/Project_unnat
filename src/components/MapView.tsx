import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Complaint, Urgency } from '../AppContext';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, Clock, CheckCircle2, User, Calendar } from 'lucide-react';

// Fix for default marker icons in Leaflet
import 'leaflet/dist/leaflet.css';

const redDotIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

interface MapViewProps {
  complaints: Complaint[];
}

const getUrgencyColor = (urgency: Urgency) => {
  switch (urgency) {
    case 'Low': return 'text-green-600';
    case 'Medium': return 'text-yellow-600';
    case 'High': return 'text-orange-600';
    case 'Critical': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center);
    // Invalidate size after animation
    setTimeout(() => {
      map.invalidateSize();
    }, 400);
  }, [center, map]);
  return null;
};

const MapView: React.FC<MapViewProps> = ({ complaints }) => {
  const center: [number, number] = [21.1458, 79.0882]; // Nagpur center

  // Filter complaints that have valid coordinates
  const validComplaints = complaints.filter(
    c => typeof c.latitude === 'number' && typeof c.longitude === 'number'
  );

  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-gov-border shadow-sm relative z-0 bg-gov-background">
      <MapContainer 
        center={center} 
        zoom={11} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <RecenterMap center={center} />
        
        {validComplaints.map((complaint) => (
          <Marker 
            key={complaint.id} 
            position={[complaint.latitude, complaint.longitude]}
            icon={redDotIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px] font-noto">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${getUrgencyColor(complaint.urgency)}`}>
                    {complaint.urgency} Urgency
                  </span>
                  <span className="text-[10px] bg-gov-green-light text-gov-green-dark px-2 py-0.5 rounded-full font-bold">
                    {complaint.status}
                  </span>
                </div>
                
                <h3 className="font-baskerville font-bold text-gov-green-dark mb-1 leading-tight">
                  {complaint.title}
                </h3>
                
                <div className="space-y-1.5 mt-3 border-t border-gov-border pt-3">
                  <div className="flex items-center gap-2 text-[11px] text-gov-text-secondary">
                    <User size={12} className="text-gov-green-primary" />
                    <span>{complaint.userName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gov-text-secondary">
                    <MapPin size={12} className="text-gov-green-primary" />
                    <span>{complaint.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gov-text-secondary">
                    <Calendar size={12} className="text-gov-green-primary" />
                    <span>{new Date(complaint.date).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
                
                <div className="mt-3 text-[11px] text-gov-text-primary line-clamp-2 italic">
                  "{complaint.description}"
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {validComplaints.length === 0 && (
        <div className="absolute inset-0 z-[1001] bg-gov-white/80 backdrop-blur-sm flex items-center justify-center p-8 text-center">
          <div className="max-w-xs">
            <MapPin size={48} className="mx-auto text-gov-text-secondary mb-4 opacity-20" />
            <p className="text-gov-text-secondary font-bold uppercase tracking-widest text-xs">
              No geographical data found for current complaints.
            </p>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-6 right-6 z-[1000] bg-gov-white/90 backdrop-blur-sm p-4 rounded-xl border border-gov-border shadow-lg">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary mb-3">Map Legend</h4>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full border border-white"></div>
          <span className="text-[11px] font-bold text-gov-text-primary">Active Complaint</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
