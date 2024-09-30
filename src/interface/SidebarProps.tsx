import React from "react";

export interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;  
  alert?: boolean;  
  path: string;
}