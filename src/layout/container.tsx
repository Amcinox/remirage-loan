"use client"
import { usePathname, useParams } from 'next/navigation';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Fragment } from 'react';
import { BREADCRUMB_CONFIGS, BreadcrumbConfig } from './breadcrumb-config';

interface ContainerProps {
  children: React.ReactNode;
  customBreadcrumb?: BreadcrumbConfig;
}

const DEFAULT_CONFIG: BreadcrumbConfig = {
  items: [
    { label: 'Dashboard', href: '/' }
  ]
};

export default function Container({ children, customBreadcrumb }: ContainerProps) {
  const pathname = usePathname();
  const params = useParams();
  const getBaseConfig = (): BreadcrumbConfig => {
    try {
      const configKey = Object.keys(BREADCRUMB_CONFIGS).find(key => {
        const pattern = key.replace(/\[.*?\]/g, '[^/]+');
        return new RegExp(`^${pattern}$`).test(pathname);
      });

      return configKey && BREADCRUMB_CONFIGS[configKey] ? BREADCRUMB_CONFIGS[configKey] : DEFAULT_CONFIG;
    } catch (error) {
      console.error('Error getting breadcrumb config:', error);
      return DEFAULT_CONFIG;
    }
  };

  // Ensure we always have a valid config
  const breadcrumbConfig = customBreadcrumb || getBaseConfig();

  const renderBreadcrumbItems = () => {
    return breadcrumbConfig.items.map((item, index) => {
      let label = item.label;
      let href = item.href;
      if (item.dynamic && params) {
        href = pathname;
      }

      return (
        <Fragment key={index}>
          <BreadcrumbItem className="hidden md:block">
            {href ? (
              <BreadcrumbLink href={href}>
                {label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {index < breadcrumbConfig.items.length - 1 && (
            <BreadcrumbSeparator className="hidden md:block" />
          )}
        </Fragment>
      );
    });
  };

  return (
    <div className='container bg-red-300'>
      <header className="flex h-16 shrink-0 items-center gap-2  ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              {renderBreadcrumbItems()}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {children}
      </div>
    </div>
  );
}
