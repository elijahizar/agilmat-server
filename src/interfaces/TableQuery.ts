import { ParsedQs } from "qs";

export interface TableQuery extends ParsedQs {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}
