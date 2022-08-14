import React from 'react';

type HTMLTag = `${keyof Pick<
  JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>}`;

type HeadingProps<T> = T extends HTMLTag
  ? JSX.IntrinsicElements[T] & {
      className?: string;
      children?: React.ReactNode;
      as?: T;
      l1?: boolean;
      l2?: boolean;
      l3?: boolean;
      dialog?: boolean;
    }
  : never;

export const Heading = React.forwardRef<
  HTMLHeadingElement,
  HeadingProps<HTMLTag>
>(({ className, children, as = 'h1', l1, l2, l3, dialog }, ref) => {
  const HeadingTag = as;

  if (l1) {
    return (
      <HeadingTag
        className={`text-5xl font-black uppercase leading-[80%] md:text-7xl ${className}`}
        ref={ref}
      >
        {children}
      </HeadingTag>
    );
  }

  if (l2) {
    return (
      <HeadingTag
        className={`text-4xl font-black uppercase leading-[80%] md:text-5xl ${className}`}
        ref={ref}
      >
        {children}
      </HeadingTag>
    );
  }

  if (l3) {
    return (
      <HeadingTag
        className={`text-2xl font-black uppercase leading-[80%] md:text-4xl ${className}`}
        ref={ref}
      >
        {children}
      </HeadingTag>
    );
  }

  if (dialog) {
    return (
      <HeadingTag
        className={`text-2xl font-black leading-[150%] md:text-4xl ${className}`}
        ref={ref}
      >
        {children}
      </HeadingTag>
    );
  }

  return (
    <HeadingTag className={className} ref={ref}>
      {children}
    </HeadingTag>
  );
});

Heading.displayName = 'Heading';
