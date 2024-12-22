import React from "react";

interface Props {
  title: string;
}

const PageHeader = ({ title }: Props) => {
  return (
    <div className="pb-4">
      <h1 className="w-full text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default PageHeader;
