import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

type Point = {
  name: string | null;
  latitude: number;
  longitude: number;
};

type MapProps = {
  data: (value: Point[]) => void;
};

export default function Map(props: MapProps) {
  const [points, setPoints] = useState<Point[]>([]);
  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        const newPoint: Point = {
          name: null,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        };
        for (let i = 0; i < points.length; i++) {
          if (
            Math.abs(points[i].latitude - newPoint.latitude) < 0.5 &&
            Math.abs(points[i].longitude - newPoint.longitude) < 0.5
          ) {
            const index = points.indexOf(points[i]);
            points.splice(index, 1);
          }
        }
        const newPoints: Point[] = points.slice();
        newPoints.push(newPoint);
        setPoints(newPoints);
        props.data(newPoints);
      },
    });
    return null;
  };
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      className="min-w-80 h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => {
        return (
          <Marker
            position={[point.latitude, point.longitude]}
            key={point.latitude}
          ></Marker>
        );
      })}
      <LocationFinderDummy />
    </MapContainer>
  );
}
