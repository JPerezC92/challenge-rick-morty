import React from 'react';

enum ColorGradientVariant {
  SPECIAL_1 = 'special1',
}

type HTMLTag = `${keyof Pick<
  JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a'
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
      colorGradient?: `${ColorGradientVariant}`;
    }
  : never;

export const Heading = React.forwardRef(function Heading<
  T extends HTMLTag,
  P extends HeadingProps<T>
>(
  {
    as = 'h1',
    card,
    children,
    className,
    colorGradient,
    dialog,
    l1,
    l2,
    l3,
    ...props
  }: P,
  ref: P['ref']
) {
  const HeadingTag = as as string;
  const _props = { ...props, ref } as typeof props;

  return (
    <HeadingTag
      {..._props}
      className={`font-nunito ${
        l1
          ? 'text-5xl font-black uppercase leading-[80%] md:text-7xl'
          : l2
          ? 'text-4xl font-black uppercase leading-[80%] md:text-5xl'
          : l3
          ? 'text-2xl font-black uppercase leading-[80%] md:text-4xl'
          : dialog
          ? 'text-2xl font-black leading-[150%] md:text-4xl '
          : card
          ? 'text-lg font-black uppercase leading-[150%] tracking-wide underline decoration-1 underline-offset-2 transition-all duration-100 hover:cursor-pointer hover:decoration-ct-secondary-400/80 hover:saturate-150 md:text-xl'
          : ''
      } ${
        colorGradient === ColorGradientVariant.SPECIAL_1
          ? 'bg-gradient-to-l from-ct-primary-400 to-ct-secondary-400 bg-clip-text text-transparent'
          : ''
      } ${className}`}
    >
      {children}
    </HeadingTag>
  );
}) as <T extends HTMLTag>(
  props: HeadingProps<T>
) => React.ReactElement<HeadingProps<T>, T>;
