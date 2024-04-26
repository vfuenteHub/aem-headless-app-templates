import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import Link, { type LinkProps } from '~/ui/components/molecules/Link';
import cn from '~/ui/utils/classNames';

type InternalLinkProps = {} & LinkProps & NextLinkProps;

const InternalLink = ({
  className,
  href,
  as,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  legacyBehavior,
  ...restProps
}: InternalLinkProps) => (
  <NextLink
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    passHref
    prefetch={prefetch}
    locale={locale}
    legacyBehavior
  >
    <Link
      className={cn('internal-link', className)}
      href={href}
      {...restProps}
    />
  </NextLink>
);

export default InternalLink;
