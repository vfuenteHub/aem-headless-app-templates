import Link, { type LinkProps } from '~/ui/components/molecules/Link';
import cn from '~/ui/utils/classNames';

type ExternalLinkProps = {} & LinkProps;

const ExternalLink = ({
  className,
  target = '_blank',
  rel = 'noopener noreferrer nofollow',
  ...restProps
}: ExternalLinkProps) => (
  <Link
    className={cn('external-link', className)}
    target={target}
    rel={rel}
    {...restProps}
  />
);

export default ExternalLink;
