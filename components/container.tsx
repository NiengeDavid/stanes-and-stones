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
      className={`container px-5 w-full max-w-420 mx-auto ${className ? className : ""}`}
    >
      {children}
    </div>
  );
}
