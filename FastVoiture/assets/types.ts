export interface Driver {
    userName:string;
    nom:string;
    password:string;
    email:string;
    phone:string;
    license_plate:string;
    driver_license:string;
  }

  interface Location {
    latitude: number;
    longitude: number;
  }
  interface Info {
    distance: {
      text: string;
      value: number;
    };
    temps: {
      text: string;
      value: number;
    };
   
  }
  
  export interface LocationState {
    username:string
    origin: Location;
    destination: Location;
    info: Info;
    prix: number;
  }

  export interface Course{
    chauffeur: string|undefined;
    passager: string;
    origin : string|undefined;
    destination: string|undefined;
    immatriculation: string|undefined;
    prix: number

  }