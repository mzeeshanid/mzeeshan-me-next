import { absoluteUrl } from "@/baseUrl/absoluteUrl";
import { Breadcrumb } from "@chakra-ui/react";
import { BreadcrumbJsonLd } from "next-seo";
import React from "react";
import { LuHouse } from "react-icons/lu";

export type AppBreadcrumbItem = {
  label: string;
  href?: string;
};

export type AppBreadcrumbProps = {
  items: AppBreadcrumbItem[];
  /** URL of the current page — added to the last breadcrumb item in JSON-LD only (no visual link). */
  currentHref?: string;
  /** Emit BreadcrumbJsonLd structured data. Defaults to true. Set false to suppress when the parent already handles it. */
  withJsonLd?: boolean;
};

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({
  items,
  currentHref,
  withJsonLd = true,
}) => {
  const jsonLdItems = items.map((item, index) => {
    const isLast = index === items.length - 1;
    const resolvedHref = item.href ?? (isLast && currentHref ? currentHref : undefined);
    return {
      name: item.label,
      item: resolvedHref ? absoluteUrl(resolvedHref) : undefined,
    };
  });

  return (
    <>
      {withJsonLd && <BreadcrumbJsonLd items={jsonLdItems} />}
      <Breadcrumb.Root size={{ base: "md", md: "lg" }}>
        <Breadcrumb.List>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <Breadcrumb.Item>
                {item.href ? (
                  <Breadcrumb.Link href={item.href}>
                    {index === 0 && <LuHouse />}
                    {item.label}
                  </Breadcrumb.Link>
                ) : (
                  <Breadcrumb.CurrentLink>{item.label}</Breadcrumb.CurrentLink>
                )}
              </Breadcrumb.Item>
              {index < items.length - 1 && <Breadcrumb.Separator />}
            </React.Fragment>
          ))}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </>
  );
};

export default AppBreadcrumb;
