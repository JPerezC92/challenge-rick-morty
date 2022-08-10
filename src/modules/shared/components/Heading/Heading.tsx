import React from 'react';

type HeadingProps = {
  className?: string;
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  l1?: boolean;
  l2?: boolean;
  l3?: boolean;
};

export const Heading: React.FC<HeadingProps> = ({
  className,
  children,
  as = 'h1',
  l1 = false,
  l2 = false,
  l3 = false,
}) => {
  const HeadingTag = as;

  if (l1) {
    return (
      <HeadingTag
        className={`text-5xl font-black uppercase leading-[80%] md:text-7xl ${className}`}
      >
        {children}
      </HeadingTag>
    );
  }

  if (l2) {
    return (
      <HeadingTag
        className={`text-4xl font-black uppercase leading-[80%] md:text-5xl ${className}`}
      >
        {children}
      </HeadingTag>
    );
  }

  if (l3) {
    return (
      <HeadingTag
        className={`text-2xl font-black uppercase leading-[80%] md:text-4xl ${className}`}
      >
        {children}
      </HeadingTag>
    );
  }

  return <HeadingTag className={className}>{children}</HeadingTag>;
};
