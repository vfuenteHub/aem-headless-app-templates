import { MapTo } from '@adobe/aem-react-editable-components';

import AEMResponsiveGrid, {
  config as responsiveGridEditConfig,
} from './ResponsiveGrid';

MapTo(responsiveGridEditConfig.resourceType)(AEMResponsiveGrid);
