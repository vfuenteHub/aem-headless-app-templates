declare namespace Page {
  interface Props {
    pages: any[];
    data?: any;
    createUrl?: (value: string) => string;
  }
}
