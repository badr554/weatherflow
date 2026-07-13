import { httpClient } from '@/api/client';
import type { GeoLocation } from '@/types/weather';

/** BigDataCloud's client-side reverse geocoding is free and requires no API key. */
const REVERSE_GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

interface ReverseGeocodeResponse {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
}

export class GeolocationDeniedError extends Error {
  constructor() {
    super('Location access was denied.');
    this.name = 'GeolocationDeniedError';
  }
}

function getBrowserPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      resolve,
      (err) => {
        reject(err.code === err.PERMISSION_DENIED ? new GeolocationDeniedError() : new Error(err.message));
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 10 * 60 * 1000 },
    );
  });
}

async function reverseGeocode(lat: number, lon: number): Promise<GeoLocation> {
  try {
    const { data } = await httpClient.get<ReverseGeocodeResponse>(REVERSE_GEOCODE_URL, {
      params: { latitude: lat, longitude: lon, localityLanguage: 'en' },
    });
    const name = data.city || data.locality || data.principalSubdivision || 'My Location';
    return { name, country: data.countryName ?? '', lat, lon };
  } catch {
    // Weather still works from raw coordinates even if naming the place fails.
    return { name: 'My Location', country: '', lat, lon };
  }
}

export async function detectCurrentLocation(): Promise<GeoLocation> {
  const position = await getBrowserPosition();
  return reverseGeocode(position.coords.latitude, position.coords.longitude);
}
