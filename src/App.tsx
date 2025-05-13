import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Globe } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import FetchData from "./utilities/FetchData";
import Map from "./components/Map";

import "leaflet/dist/leaflet.css";

type Point = {
  name: string | null;
  latitude: number;
  longitude: number;
};

function App() {
  const [state, setState] = useState<boolean>(false);
  const [points, setPoints] = useState<Point[]>([]);
  const clickHandler = () => {
    setState(!state);
  };
  const changePoints = (value: Point[]) => {
    setPoints(value);
  };
  const fetchLocation = async (point: Point) => {
    try {
      const response = await fetch(
        `https://eu1.locationiq.com/v1/reverse?key=${
          import.meta.env.VITE_REVERSE_GEO
        }&lat=${point.latitude}&lon=${point.longitude}&format=json&`
      );
      if (!response.ok) {
        console.error(response.status);
      }
      const data = await response.json();
      console.log(data);
      const addName = points.slice();
      const index = points.indexOf(point);
      addName[index].name = data.display_name;
      setPoints(addName);
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    for (let i = 0; i < points.length; i++) {
      if (points[i].name == null) {
        fetchLocation(points[i]);
      }
    }
  }, [points]);
  return (
    <ThemeProvider>
      <div className="grid grid-cols-4 gap-4 left-0 right-0 m-5 h-[calc(100vh-50px)] ">
        <div className="bg-primary-foreground p-4 rounded-lg">
          <button
            className="text-black bg-secondary-foreground rounded-lg p-4 m-4 "
            onClick={clickHandler}
          >
            <Globe />
          </button>
          <div className="border-b" />
          {points.map((point, index) => {
            return (
              <div
                className="text-black bg-secondary-foreground p-2 rounded-sm m-4"
                onClick={() => {
                  console.log(index);
                }}
                key={point.name}
              >
                {point.name}
              </div>
            );
          })}
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg col-span-3">
          {state ? <div>lol</div> : <Map data={changePoints} />}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
