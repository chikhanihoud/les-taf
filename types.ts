import React from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  image: string;
}

export interface TestimonialItem {
  quoteFr: string;
  quoteAr?: string;
  author: string;
  location: string;
  image?: string;
}
