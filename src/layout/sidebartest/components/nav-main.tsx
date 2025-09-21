"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    isBlocked?: boolean;
    items?: {
      title: string;
      url: string;
      isBlocked?: boolean;
      roles?: Array<string>;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-white">Platform</SidebarGroupLabel>
      <SidebarMenu className="text-white">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible  "
            // className={`group/collapsible ${baseClasses} ${activeClass} ${blockedClass}`}
          >
            <SidebarMenuItem className="my-1">
              <CollapsibleTrigger asChild>
                {item.items?.length ? (
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight
                      className={cn(
                        "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
                        "visible"
                      )}
                    />
                  </SidebarMenuButton>
                ) : (
                  <NavLink to={item.url} end>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90",
                            "invisible"
                          )}
                        />
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                )}
              </CollapsibleTrigger>
              {item.items?.length && (
                <CollapsibleContent className="my-0.5">
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title} className="my-1">
                        <NavLink
                          to={subItem?.isBlocked ? "#" : subItem.url}
                          end
                          onClick={(e) => {
                            if (subItem?.isBlocked) {
                              e.preventDefault();
                              toast.error(
                                "Module not purchased. Please contact system admin!"
                              );
                            }
                          }}
                        >
                          {({ isActive }) => (
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive}
                              isBlocked={subItem?.isBlocked}
                            >
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          )}
                        </NavLink>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
