import { MapTo } from '@adobe/aem-react-editable-components';

import '~/aem/components';

import AEMImage, { config as imageConfig } from './Image';
import AEMText, { config as textConfig } from './Text';
import AEMTitle, { config as titleConfig } from './Title';

const AEM_SITE = process.env.NEXT_PUBLIC_AEM_SITE;

MapTo(`${AEM_SITE}/${imageConfig.resourceType}`)(AEMImage);
MapTo(`${AEM_SITE}/${textConfig.resourceType}`)(AEMText);
MapTo(`${AEM_SITE}/${titleConfig.resourceType}`)(AEMTitle);
