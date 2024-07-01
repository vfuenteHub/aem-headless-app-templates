import Image from '@/components/atoms/Image';
import Layout from '@/components/templates/Layout';
import { setTitle } from '@/utils/helpers';
import Head from 'next/head';
import { useMemo } from 'react';

const Adventure = ({ data, pages, createUrl }: Page.Props) => {
  const {
    title: titleProp,
    activity,
    adventureType,
    price,
    tripLength,
    groupSize,
    difficulty,
    primaryImage: { _dynamicUrl, _path },
    description,
    itinerary,
  } = data;

  const title = useMemo(() => setTitle(titleProp), [titleProp]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout pages={pages}>
        <article>
          <div className="bg-white">
            <div className="pt-6">
              <div className="relative">
                <div className="w-full overflow-hidden bg-gray-200 min-h-80 aspect-w-1 aspect-h-1 lg:h-80 lg:aspect-none">
                  <Image
                    className="object-cover object-center w-full h-full lg:w-full lg:h-full"
                    src={createUrl?.call(this, _dynamicUrl || _path)!}
                    alt={title}
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {title}
                  </h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:mt-0 lg:row-span-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="mb-10 text-3xl text-gray-900">${price} USD</p>
                  <dl>
                    <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Activity
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {activity}
                      </dd>
                    </div>
                    <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Type
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {adventureType}
                      </dd>
                    </div>
                    <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Trip Length
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {tripLength}
                      </dd>
                    </div>
                    <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Group Size
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {groupSize}
                      </dd>
                    </div>
                    <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        Difficulty
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {difficulty}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  {/* Description and Itinerary */}
                  <div>
                    <h3 className="sr-only">Description</h3>
                    <div className="space-y-6">
                      <div
                        className="text-base text-gray-900"
                        dangerouslySetInnerHTML={{
                          __html: description.html,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-base font-bold text-gray-900">
                      Itinerary
                    </h2>

                    <div className="mt-4 space-y-6">
                      <div
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: itinerary.html,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};

export default Adventure;
