// TODO
type AEMHeadless = any;

class HeadlessClient {
  constructor(args: {
    serviceURL?: string;
    endpoint?: string;
    auth: string | string[];
    options?: Partial<{
      [key: string]: unknown;
    }>;
  }) {}

  get host(): string;
  get client(): AEMHeadless;
}

export default HeadlessClient;
