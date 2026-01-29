import React from 'react';

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  //const lastName = name.split(' ').pop()?.toUpperCase() || name.toUpperCase();
  const year = new Date().getFullYear();

  return (
    <footer className="text-center text-slate-600 text-xs font-mono pb-8">
      <p>SYSTEM VERSION 2.4.0 // UI BY DevBD1</p>
      <p className="mt-2">ALL RIGHTS RESERVED © {year}</p>
    </footer>
  );
};

export default Footer;
