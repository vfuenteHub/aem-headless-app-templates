import type { EditableComponentProps } from '@adobe/aem-react-editable-components';

export const config: {
  resourceType: string;
} & EditableComponentProps['config'];

export default function (props: EditableComponentProps): JSX.Element;
