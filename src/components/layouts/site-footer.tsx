import { FC } from "react";

interface SiteFooterProps {
  children?: React.ReactNode;
}

const SiteFooter = ({ children }: SiteFooterProps) => {
  return (
    <footer className="flex h-24 w-full flex-col items-center justify-center border-t">
      {children}
    </footer>
  );
};

export default SiteFooter;
