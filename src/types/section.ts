export interface Section {
  id?: string;
  name: string;
  brand: { id: string; name?: string };
  status: { id: string; name?: string };
  channels?: any[];
}

export interface Brand {
  id: string;
  abbreviatedName: string;
  name: string;
  status: { id: string; name: string };
}
