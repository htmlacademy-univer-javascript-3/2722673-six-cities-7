import {useEffect, useRef} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '@/hooks/use-map';
import type {BaseOffer, City, Offer} from '@/types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  currentOffer?: BaseOffer;
  variant?: 'cities' | 'offer';
};

const OFFER_ICON = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const CURRENT_OFFER_ICON = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({city, offers, currentOffer, variant = 'cities'}: MapProps) {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markersLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      new Marker([offer.location.latitude, offer.location.longitude], {
        icon: OFFER_ICON,
        title: offer.title,
      }).addTo(markersLayer);
    });

    if (currentOffer) {
      new Marker([currentOffer.location.latitude, currentOffer.location.longitude], {
        icon: CURRENT_OFFER_ICON,
        title: currentOffer.title,
      }).addTo(markersLayer);
    }

    return () => {
      map.removeLayer(markersLayer);
    };
  }, [map, offers, currentOffer]);

  return <section className={`${variant}__map map`} ref={mapRef} aria-label={`Rental offers in ${city.name}`} />;
}

export default Map;
