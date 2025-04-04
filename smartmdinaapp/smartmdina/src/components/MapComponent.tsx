import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';  // Import LatLngExpression correctly

// Coordinates for Casablanca, Morocco
const casablancaCoordinates: LatLngExpression = [33.5731, -7.5898];

const MapComponent = () => {
  return (
    <div style={{ width: '100%', height: '300px', alignItems: 'center'}}>
      <MapContainer
        center={casablancaCoordinates}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Correct TileLayer URL for OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={casablancaCoordinates}>
          <Popup>
            Casablanca, Morocco
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;


