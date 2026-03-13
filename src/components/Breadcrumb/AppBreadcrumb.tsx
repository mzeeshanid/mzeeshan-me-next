import { Breadcrumb } from "@chakra-ui/react";
import { BreadcrumbJsonLd } from "next-seo";
import React from "react";
import { LuHouse } from "react-icons/lu";

export type AppBreadcrumbProps = {
  items: AppBreadcrumbItem[];
};

export type AppBreadcrumbItem = {
  label: string;
  href?: string;
};

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({ items }) => {
  return (
    <>
      <BreadcrumbJsonLd
        items={items.map((item) => {
          return {
            name: item.label,
            item: item.href,
          };
        })}
      />
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
