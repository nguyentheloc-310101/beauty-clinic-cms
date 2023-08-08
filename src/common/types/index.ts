export * from "./IHome";
interface IBase {
  id: string; // supabase id
  key: number; // key for react mapping table
}

export interface IDoctor extends IBase {
  image: string;
  name: string;
  experience_year: number;
  desc_doctor: string;
  major: string;
  service_id: string;
}

export interface IServiceStep extends IBase {
  step: number;
  image: any;
  desc: string;
}

export interface IService extends IBase {
  image: string;
  price: number;
  description: string;
  name: string;
  hasDoctors: boolean;
  hasSteps: boolean;
  service_id: string;
}

export interface IServiceCategory extends IBase {
  slug: string;
  name: string;
}

export interface IClinic extends IBase {
  location: string;
  short_address: string;
  open: string;
  closed: string;
  name: string;
  description: string;
}