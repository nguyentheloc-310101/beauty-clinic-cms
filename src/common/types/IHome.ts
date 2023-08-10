export interface ICustomFeedback {
  image: string;
  signature: string;
  name: string;
  clinic: string;
  content: string;
}
export interface ICelebFeedback {
  image: string;
  tagline: string;
  name: string;
  job: string;
  content: string;
}

export interface INews {
  image: string;
  url: string;
}

export interface IAuraInfo {
  image: string;
  mainText: string;
  subText: string;
}
export interface IHomeService {
  name: string;
  image: string;
  tagline: string;
}
export interface IHome {
  background: string;
  videoLink: string;
  service_id: string;
  clinic_ids: string[];
  services: IHomeService[];
  celebFeedback: ICelebFeedback;
  customFeedbacks: ICustomFeedback[];
  news: INews[];
  auraInfos: IAuraInfo[];
}
