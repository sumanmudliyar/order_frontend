import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "antd";
import { useUpdateOrder } from "../../logic/mutation/updateOrder";
import { useFetchOrder } from "../../logic/query/getOrder";

// Fix missing marker icon issue in Leaflet
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const OrderLocation = () => {
  const orderid = localStorage.getItem("orderid");
  const role = localStorage.getItem("role");

  const [position, setPosition] = useState<[number, number] | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        console.log("Clicked coordinates:", lat, lng);
      },
    });

    return position ? (
      <Marker position={position} icon={markerIcon}>
        <Popup>
          <b>Latitude:</b> {position[0]} <br />
          <b>Longitude:</b> {position[1]}
        </Popup>
      </Marker>
    ) : null;
  };

  const [defaultCenter, setDefaultCenter] = useState<[number, number]>([
    18.979, -286.944,
  ]);

  const { data: orderData } = useFetchOrder(orderid);

  useEffect(() => {
    if (orderData) {
      if (orderData.northLatitude) {
        setPosition([orderData.northLatitude, orderData.eastLatitude]);

        setDefaultCenter([orderData.northLatitude, orderData.eastLatitude]);
      }
    }
  }, [orderData]);

  const updateOrderMutate = useUpdateOrder();

  const handleUpdateLocation = async () => {
    const body = {
      northLatitude: position?.[0],
      eastLatitude: position?.[1],
    };

    const response = await updateOrderMutate.mutateAsync([orderid, body]);

    console.log("response", response);
  };

  return (
    <>
      <MapContainer
        center={defaultCenter} // Default center
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        {/* Map Tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Clickable Marker */}
        <LocationMarker />
      </MapContainer>

      {role == "delivery" && (
        <Button type="primary" onClick={() => handleUpdateLocation()}>
          Update location
        </Button>
      )}
    </>
  );
};

export default OrderLocation;
