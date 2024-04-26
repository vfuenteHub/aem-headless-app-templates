import AEMHeadless from '@adobe/aem-headless-client-js';

class HeadlessClient {
  #host;
  #client;

  constructor({ serviceURL, endpoint, auth, options = {} }) {
    const { headers = {}, fetch: fetchProp = fetch } = options;

    this.#host = serviceURL;

    this.#client = new AEMHeadless({
      serviceURL,
      endpoint,
      auth,
      headers,
      fetch: fetchProp,
    });
  }

  get host() {
    return this.#host;
  }

  get client() {
    return this.#client;
  }
}

export default HeadlessClient;
