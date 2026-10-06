import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const projectLocations = [
  { city: "Lagos", state: "Lagos State", position: [6.5244, 3.3792] as [number, number] },
  { city: "Ibadan", state: "Oyo State", position: [7.3775, 3.947] as [number, number] },
  { city: "Osogbo", state: "Osun State", position: [7.7827, 4.5418] as [number, number] },
  { city: "Abeokuta", state: "Ogun State", position: [7.1475, 3.3619] as [number, number] },
  { city: "Makurdi", state: "Benue State", position: [7.7322, 8.5391] as [number, number] },
];

export function ProjectsMap() {
  return (
    <figure className="w-full">
      <div className="mb-4 px-1 text-center">
        <h4 className="font-montserrat text-base font-bold text-slate-900 sm:text-lg">
          Project locations across Nigeria
        </h4>
      </div>

      <div className="relative z-0 isolate mx-auto aspect-square w-full max-w-[440px] overflow-hidden rounded-full border-4 border-white shadow-xl ring-1 ring-slate-200">
        <MapContainer
          center={[7.8, 5.8]}
          zoom={5}
          minZoom={5}
          maxZoom={10}
          attributionControl={false}
          scrollWheelZoom={false}
          className="h-full w-full"
          aria-label="Circular map of Nigeria showing project locations by state"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {projectLocations.map(({ city, state, position }) => (
            <CircleMarker
              key={city}
              center={position}
              radius={8}
              pathOptions={{
                color: "#ffffff",
                weight: 3,
                fillColor: "#0057D9",
                fillOpacity: 1,
              }}
            >
              <Tooltip>
                <span className="font-semibold">{city}</span>
                <br />
                {state}
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </figure>
  );
}
