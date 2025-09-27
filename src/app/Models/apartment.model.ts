export interface Apartment {
    id?: number;
    name: string;
    sex: string;
    price: string;
    type: string;
    instructions: string;
    contact: string;
    schoolName: string; 
    postedAt?: Date;
    user:string;
    images?: string[];
  }