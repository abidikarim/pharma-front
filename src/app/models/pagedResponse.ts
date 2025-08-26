import { BaseOut } from "./baseOut";

export interface PagedResponse<T> extends BaseOut {
  data: T[];
  page_number?: number;
  page_size?: number;
  total_pages?: number;
  total_records?: number;
}