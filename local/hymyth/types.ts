import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}