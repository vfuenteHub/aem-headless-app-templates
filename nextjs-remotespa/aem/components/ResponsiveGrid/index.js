import {
  EditableComponent,
  ResponsiveGrid,
} from '@adobe/aem-react-editable-components';
import * as React from 'react';

const RESOURCE_TYPE = 'wcm/foundation/components/responsivegrid';

export const config = {
  emptyLabel: 'Layout Container',
  isEmpty: props =>
    props?.cqItemsOrder === null || props?.cqItemsOrder?.length === 0,
  resourceType: RESOURCE_TYPE,
};

const AEMComponent = props => (
  <EditableComponent config={config} {...props}>
    <ResponsiveGrid customClassName="aemContainer" {...props} />
  </EditableComponent>
);

export default AEMComponent;
