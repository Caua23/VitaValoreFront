import React from "react";

export interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  path: string;
}

export interface SidebarProps {
  id: string;
  nameEmpresa: string;
  emailEmpresa: string;
  apiUrl: string;
  children?: React.ReactNode;
}
