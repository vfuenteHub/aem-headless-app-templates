import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import cn from '~/ui/utils/classNames';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & NextImageProps;

const Image = ({
  className,
  alt,
  title = alt,
  width,
  height,
  ...restProps
}: ImageProps) => (
  <NextImage
    className={cn('image', className)}
    alt={alt}
    title={title}
    width={width}
    height={height}
    fill={!width || !height}
    sizes={
      !width || !height
        ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        : ''
    }
    {...restProps}
  />
);

export default Image;
