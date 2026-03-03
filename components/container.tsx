import React from "react";

interface Props {
  className?: string;
}

export default function Container({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={`px-5 w-full max-w-9xl mx-auto ${className ? className : ""}`}
    >
      {children}
    </div>
  );
}
