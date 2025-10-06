import { Company } from '../companies/company';

export interface Brand {
  code: string;
  name: string;
  company: Company;
}