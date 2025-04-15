export interface Offer {
    id?: number;
    title: string;
    description: string;
    code: string;
    validTill: string; // ISO string: e.g., "2025-04-30T00:00:00"
    image: string;
    percentageOff:number
  }
  