import { getResponsivegridModelByPagePath } from '@/apis/models';
import type { ResponsiveGridProps } from '@adobe/aem-react-editable-components';

export type ResponsiveGridModelProps = {
  title?: string;
} & ResponsiveGridProps;

export const getResponsivegridModel = async (pagePath: string) => {
  let data = {} as ResponsiveGridModelProps;

  try {
    data = (await getResponsivegridModelByPagePath(
      pagePath
    )) as ResponsiveGridModelProps;
  } catch (e) {
    console.error(e);
  }

  return data;
};
