export * from "./IHome";
interface IBase {
  id: string; // supabase id
  key: number; // key for react mapping table
}

export interface IDoctor extends IBase {
  image: string;
  name: string;
  experience: number;
  description: string;
  major: string;
}

export interface IServiceStep extends IBase {
  step: number;
  image: any;
  desc: string;
}

export interface IServiceDetails extends IBase {
  image: string;
  price: number;
  description: string;
  name: string;
  hasDoctors: boolean;
  doctors: string[];
  hasSteps: boolean;
  steps: {
    image: string;
    description: string;
  }[];
  service_id: string;
  others: IService[];
  service: IService;
}
export interface IService extends IBase {
  name: string;
  category_id: string;
  serviceDetails: IServiceDetails[];
  doctors: IDoctor[];
  others: IService[];
}

export interface IServiceCategory extends IBase {
  slug: string;
  name: string;
}

export interface IClinic extends IBase {
  location: string;
  background: string;
  short_address: string;
  open: string;
  closed: string;
  name: string;
  description: string;
  address: string;
}
