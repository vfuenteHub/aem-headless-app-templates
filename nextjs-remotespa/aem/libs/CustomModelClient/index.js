import { ModelClient } from '@adobe/aem-spa-page-model-manager';

export class CustomModelClient extends ModelClient {
  #options;

  constructor({ host, options = {} }) {
    super(host);
    this.#options = options;
  }

  fetch(modelPath) {
    if (!modelPath) {
      return Promise.reject(
        new Error(`Fetching model rejected for path: ${modelPath}`)
      );
    }

    const url = `${this.apiHost}${modelPath}`;

    console.debug(`custom model client is called ${url}`);

    return fetch(url, {
      credentials: 'same-origin',
      ...this.#options,
    })
      .then(res => {
        if (200 <= res.status && res.status < 300) {
          return res.json();
        }

        return Promise.reject(res);
      })
      .catch(Promise.reject);
  }
}
