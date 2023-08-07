interface IClinicBase {
  id: string;
  key: number;
}
export interface IClinic extends IClinicBase {
  location: string;
  short_address: string;
  open: string;
  closed: string;
  name: string;
  description: string;
}
