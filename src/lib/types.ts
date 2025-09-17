export interface FormData {
  // Location fields
  state?: string;
  city?: string;

  // Soil fields
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  ph?: number;

  // Weather fields
  temperature?: number;
  humidity?: number;

  // Crop History fields (add these)
  previousCrop?: string;
  previousSeason?: string;
  previousYield?: number;
}