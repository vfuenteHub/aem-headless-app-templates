declare namespace Page {
  type Props = {
    pages: any[];
    data?: any;
    createUrl?: (value: string) => string;
  };
}
