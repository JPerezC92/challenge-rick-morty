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
      card?: boolean;
      dialog?: boolean;
    }
  : never;

export const Heading = React.forwardRef<
  HTMLHeadingElement,
  HeadingProps<HTMLTag>
>(
  (
    { className, children, as = 'h1', l1, l2, l3, dialog, card, ...props },
    ref
  ) => {
    const HeadingTag = as;

    if (l1) {
      return (
        <HeadingTag
          {...props}
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
          {...props}
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
          {...props}
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
          {...props}
          className={`text-2xl font-black leading-[150%] md:text-4xl ${className}`}
          ref={ref}
        >
          {children}
        </HeadingTag>
      );
    }

    if (card) {
      return (
        <HeadingTag
          {...props}
          className={`mb-1 bg-gradient-to-l from-ct-primary-400 to-ct-secondary-400 bg-clip-text text-lg font-black uppercase leading-[150%] tracking-wide text-transparent sm:mb-2 md:text-xl ${className}`}
          ref={ref}
        >
          {children}
        </HeadingTag>
      );
    }

    return (
      <HeadingTag {...props} className={className} ref={ref}>
        {children}
      </HeadingTag>
    );
  }
);

Heading.displayName = 'Heading';
