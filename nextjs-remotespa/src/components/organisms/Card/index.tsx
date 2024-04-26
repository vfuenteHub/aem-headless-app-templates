import Image from '@/components/atoms/Image';
import InternalLink from '@/components/atoms/InternalLink';
import Typography from '~/ui/components/atoms/Typography';
import cn from '~/ui/utils/classNames';

type CardProps = {
  slug: string;
  title: string;
  price: number;
  duration: number;
  imageSrc: string;
} & React.HTMLAttributes<HTMLElement>;

const Card = ({
  className,
  slug,
  title,
  price,
  duration,
  imageSrc,
  ...restProp
}: CardProps) => (
  <div key={slug} className={cn('card', 'relative', className)} {...restProp}>
    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
      <Image
        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        src={imageSrc}
        alt={title}
      />
    </div>

    <Typography className="mt-4 flex justify-between">
      <p className="mt-1 text-sm text-gray-500">{duration}</p>
      <p className="text-sm font-medium text-gray-900">${price} USD</p>
    </Typography>

    <Typography className="font-semibold text-gray-700" component="h3">
      <InternalLink href={`adventures/${slug}`}>
        <div>
          <span aria-hidden="true" className="absolute inset-0" />
          {title}
        </div>
      </InternalLink>
    </Typography>
  </div>
);

export default Card;
