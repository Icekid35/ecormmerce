import React from "react";

type CardHolderProps = {
  children: React.ReactNode;
};

export const CardHolder: React.FC<CardHolderProps> = ({ children }) => {
  return <div className="grid md:gap-4 md:p-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] ">{children}</div>;
};

export const ListCardHolder: React.FC<CardHolderProps> = ({ children }) => {
  return (
    <div className="grid gap-4 p-[10vmin] px-[3vmin] grid-cols-[repeat(auto-fit,minmax(420px,1fr))] md:px-[3vmin] sm:grid-cols-[repeat(auto-fit,minmax(95vw,1fr))] sm:px-0">
      {children}
    </div>
  );
};
