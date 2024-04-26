import {
  EditableComponent,
  type EditableComponentProps,
  type MappedComponentProperties,
} from '@adobe/aem-react-editable-components';
import { sanitize } from 'isomorphic-dompurify';
import { memo } from 'react';
import Typography, {
  type TypographyProps,
} from '~/ui/components/atoms/Typography';

type TextProps = {
  richText?: string;
  text?: string;
} & TypographyProps;

export const config = {
  emptyLabel: 'Text',
  isEmpty: (props: TextProps & MappedComponentProperties) =>
    props?.text?.trim().length === 0,
  resourceType: 'components/text',
};

export const Text = memo(function Text({
  className,
  richText,
  text,
}: TextProps) {
  return richText ? (
    <Typography
      className={className}
      data-rte-editelement
      dangerouslySetInnerHTML={{ __html: sanitize(`${text}`) }}
    />
  ) : (
    <Typography className={className}>{text}</Typography>
  );
});

const AEMComponent = (props: EditableComponentProps) => (
  <EditableComponent config={config} {...props}>
    <Text {...props} />
  </EditableComponent>
);

export default AEMComponent;
