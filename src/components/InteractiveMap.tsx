import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '../types';

interface InteractiveMapProps {
  events: Event[];
  hoveredEventId: string | null;
  onEventClick: (eventId: string) => void;
  currency?: string;
}

export function InteractiveMap({
  events,
  hoveredEventId,
  onEventClick,
  currency = 'SEK',
}: InteractiveMapProps) {
  const stockholm: [number, number] = [59.3293, 18.0686];

  const createMapPinIcon = (color: string) =>
    L.divIcon({
      className: '',
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="${color}" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin drop-shadow-md">
          <path d="M12 10a4 4 0 1 1 8 0c0 4-4 7-4 7s-4-3-4-7Z"></path>
          <circle cx="16" cy="10" r="2"></circle>
        </svg>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -25],
    });

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={stockholm}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg z-0"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {events.map((event) => {
          const isHovered = hoveredEventId === event.id;

          const color = isHovered
            ? 'rgb(234,88,12)'
            : event.isSponsored
            ? 'rgb(249,115,22)'
            : 'rgb(217,119,6)';

          const markerIcon = createMapPinIcon(color);

          return (
            <Marker
              key={event.id}
              position={[event.coordinates.lat, event.coordinates.lng]}
              icon={markerIcon}
              eventHandlers={{
                click: () => onEventClick(event.id),

                // 👍 Hover popup logic
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                },
              }}
            >
              <Popup autoPan={false}>
                <div className="p-1 text-sm">
                  <p className="font-medium mb-1">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                  <p className="text-xs text-orange-600 mt-1">
                    {event.price === 0 ? 'Gratis' : `${event.price} ${currency}`}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
