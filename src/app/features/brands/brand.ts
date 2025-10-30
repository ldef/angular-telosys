import { Company } from '../companies/company';

export interface Brand {
  id: number;
  code: string;
  name: string;
  company: Company;
}