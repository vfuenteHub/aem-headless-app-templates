/* eslint-disable @next/next/no-img-element */
import ExternalLink from '@/components/atoms/ExternalLink';
import InternalLink from '@/components/atoms/InternalLink';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import cn from '~/ui/utils/classNames';

type LayoutProps = {
  pages?: any[];
} & React.HTMLAttributes<HTMLElement>;

const URL = process.env.NEXT_PUBLIC_URL;

const Layout = ({ children, pages }: LayoutProps) => {
  const router = useRouter();

  const isCurrentPage = useCallback(
    (currPath: string) => {
      const path = router.asPath === '/' ? '/home' : router.asPath;

      return path.includes(currPath);
    },
    [router.asPath]
  );

  return (
    <>
      <Disclosure as="nav" className="bg-gray-100">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:text-gray-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="flex items-center flex-shrink-0">
                    <InternalLink href="/">
                      <img
                        className="w-auto h-8"
                        src={`${URL}/logo.svg`}
                        alt="WKND"
                        width="86"
                        height="32"
                      />
                    </InternalLink>
                  </div>

                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {pages?.map(item => (
                        <InternalLink
                          key={item.name}
                          className={cn(
                            isCurrentPage(item.href)
                              ? 'bg-yellow-300 text-gray-700'
                              : 'text-gray-800 hover:bg-yellow-200 hover:text-gray-700',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          href={item.href}
                          aria-current={isCurrentPage(item.href) && 'page'}
                        >
                          {item.name}
                        </InternalLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {pages?.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    className={cn(
                      isCurrentPage(item.href)
                        ? 'bg-yellow-300 text-gray-700'
                        : 'text-gray-800 hover:bg-yellow-200 hover:text-gray-700',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    as={InternalLink}
                    href={item.href}
                    aria-current={isCurrentPage(item.href) && 'page'}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main role="main">{children}</main>

      <footer className="text-center bg-gray-200 lg:text-left">
        <div className="p-4 text-center text-gray-700">
          © 2023 Copyright:
          <ExternalLink className="text-gray-800" href="https://wknd.site/">
            WKND Site
          </ExternalLink>
        </div>
      </footer>
    </>
  );
};

export default Layout;
