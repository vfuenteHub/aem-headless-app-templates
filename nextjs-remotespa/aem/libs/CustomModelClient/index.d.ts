import type { ModelClient } from '@adobe/aem-spa-page-model-manager';

export declare class CustomModelClient extends ModelClient {
  constructor(args: { host?: string; options?: RequestInit }): void;
}
