

export interface SearchParams {
  [key: string]: string;
}

interface Params {
  [key: string]: string;
}
export interface PageProps<S = SearchParams, P = Params> {
  searchParams: Promise<S>
  params: Promise<P>
}


