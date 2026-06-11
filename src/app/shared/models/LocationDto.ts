import { CityEnum } from "../enums/CityEnum";
import { CountryEnum } from "../enums/CountryEnum";

export interface LocationDto {
  customerId: number;
  locationId?: number;
  addressTitle: string;

  country: CountryEnum;
  city: CityEnum;

  area: string;
  street: string;

  buildingNo?: string;
  apartmentNo?: string;

  latitude: number;
  longitude: number;

  description?: string;
}