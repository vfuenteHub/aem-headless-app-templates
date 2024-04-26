import modelClient from '@/controllers/model';
import { Constants } from '@adobe/aem-spa-page-model-manager';

const AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST;
const TITLE = process.env.NEXT_PUBLIC_AEM_TITLE;

/**
 * @name _
 * @description tiny pseudo-lodash library in es6
 * @see {@link https://underscorejs.org}
 */
export class _ {
  static noop(..._: unknown[]): unknown {
    return;
  }

  static isEmpty(obj: any): boolean {
    return obj
      ? [Object, Array].includes(obj.constructor) && !Object.entries(obj).length
      : true;
  }

  static isObject(obj: any): boolean {
    return obj != null && typeof obj === 'object';
  }

  static isString(str: any) {
    if (str != null && typeof str.valueOf() === 'string') {
      return true;
    }
    return false;
  }

  static get(obj: any, path: any, defaultValue?: any): any {
    const travel = (regexp: RegExp) =>
      String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce(
          (res: any, key: string) =>
            res !== null && res !== undefined ? res[key] : res,
          obj
        );

    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

    return result === undefined || result === obj ? defaultValue : result;
  }
}

/**
 * @name createUrl
 * @param {string} url
 * @returns {string}
 */
export const createUrl = (url: string): string =>
  url.startsWith('/') ? new URL(url, AEM_HOST).toString() : url;

/**
 * @name getPages
 * @param {string} rootPath
 * @returns {{href: string; name: string;}[]}
 */
export const getPages = async (rootPath: string) => {
  const filteredPages = [];
  const pattern = new RegExp(`^${rootPath}/(\\w+)$`, 'i');

  try {
    const getRootPageModel = await modelClient.fetch(`${rootPath}.model.json`);
    const pages = getRootPageModel[Constants.CHILDREN_PROP];

    for (const page in pages) {
      const match = page.match(pattern);

      if (match) {
        filteredPages.push({
          href: `/${match[1]}`,
          name: pages[page]['title'],
        });
      }
    }
  } catch (e) {
    console.error(e);
  }

  return filteredPages;
};

/**
 * @name setTitle
 * @param {string} value
 * @returns {string}
 */
export const setTitle = (value?: string): string =>
  value ? `${value} | ${TITLE}` : String(TITLE);
