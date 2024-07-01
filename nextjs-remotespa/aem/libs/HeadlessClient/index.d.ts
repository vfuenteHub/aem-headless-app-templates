// TODO
type AEMHeadless = any;

export declare class HeadlessClient {
  constructor(args: {
    serviceURL?: string;
    endpoint?: string;
    auth?: string | string[];
    options?: Partial<{
      [key: string]: unknown;
    }>;
  }): void;

  get host(): string;
  get client(): AEMHeadless;
}

export default HeadlessClient;
