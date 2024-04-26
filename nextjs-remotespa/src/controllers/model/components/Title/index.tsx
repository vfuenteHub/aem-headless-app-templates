import {
  EditableComponent,
  type MappedComponentProperties,
  type EditableComponentProps,
} from '@adobe/aem-react-editable-components';
import { memo } from 'react';
import Typography, {
  type TypographyProps,
} from '~/ui/components/atoms/Typography';

type TitleProps = { text?: string } & TypographyProps;

export const config = {
  emptyLabel: 'Title',
  isEmpty: (props: TitleProps & MappedComponentProperties) =>
    props?.text?.trim().length === 0,
  resourceType: 'components/title',
};

export const Title = memo(function Title({ className, text }: TitleProps) {
  return (
    <Typography className={className} component="h1">
      {text}
    </Typography>
  );
});

const AEMComponent = (props: EditableComponentProps) => (
  <EditableComponent config={config} {...props}>
    <Title {...props} />
  </EditableComponent>
);

export default AEMComponent;
