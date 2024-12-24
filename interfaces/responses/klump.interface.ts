import { Category } from "@/interfaces/responses/category.interface";

export interface IsKlumpActiveResponse {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  value: string;
  createdDate: string;
  updatedDate: string;
}

export interface KlumpPublicKeyResponse {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  value: string;
  createdDate: string;
  updatedDate: string;
}
