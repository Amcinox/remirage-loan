import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Converts a query object to a query string.
 * @param queryObj - The query object to convert.
 * @returns The query string representation of the query object.
 */
export function toQuery(queryObj?: QueryParams) {
  if (!queryObj || !Object.keys(queryObj).length) return '';
  const queries: string[] = [];
  Object.keys(queryObj).forEach((key) => {
    if (queryObj[key]) {
      queries.push(`${key}=${queryObj[key]}`);
    }
  });
  return `?${queries.join('&')}`;
}


