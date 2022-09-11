import React from 'react';

enum ColorGradientVariant {
  SPECIAL_1 = 'special1',
}

const enum TextVariant {
  ALL_CAPS = 'ALL_CAPS',
  LIGHT_WEIGTH = 'LIGHT_WEIGTH',
}

type HTMLTag = `${keyof Pick<
  JSX.IntrinsicElements,
  | 'button'
  // Text content
  | 'blockquote'
  | 'dd'
  | 'div'
  | 'dl'
  | 'dt'
  | 'figcaption'
  | 'figure'
  | 'hr'
  | 'li'
  | 'menu'
  | 'ol'
  | 'p'
  | 'pre'
  | 'ul'
  // Inline text semantics
  | 'a'
  | 'abbr'
  | 'b'
  | 'bdi'
  | 'bdo'
  | 'br'
  | 'cite'
  | 'code'
  | 'data'
  | 'dfn'
  | 'em'
  | 'i'
  | 'kbd'
  | 'mark'
  | 'q'
  | 'rp'
  | 'rt'
  | 'ruby'
  | 's'
  | 'samp'
  | 'small'
  | 'span'
  | 'strong'
  | 'sub'
  | 'sup'
  | 'time'
  | 'u'
  | 'var'
  | 'wbr'
>}`;

type TextProps<T extends string> = T extends HTMLTag
  ?
      | (JSX.IntrinsicElements[T] & {
          as?: T;
          l1?: false;
          l2?: false;
          variant?: undefined;
          colorGradient?: `${ColorGradientVariant}`;
        })
      | (JSX.IntrinsicElements[T] & {
          as?: T;
          l1: true;
          l2?: undefined;
          variant?: `${TextVariant}`;
          colorGradient?: `${ColorGradientVariant}`;
        })
      | (JSX.IntrinsicElements[T] & {
          as?: T;
          l1?: undefined;
          l2: true;
          variant?: `${TextVariant.ALL_CAPS}`;
          colorGradient?: `${ColorGradientVariant}`;
        })
  : never;

export const Text = React.forwardRef(function Text<
  T extends HTMLTag,
  P extends TextProps<T>
>(
  { l1, l2, variant, colorGradient, as = 'span', className = '', ...props }: P,
  ref: P['ref']
) {
  const Tag = as as string;
  const _props = { ...props, ref } as typeof props;

  return (
    <Tag
      {..._props}
      className={`font-nunito ${
        l1
          ? 'text-base leading-[150%] sm:text-lg'
          : l2
          ? 'text-xs font-semibold leading-[150%] sm:text-sm'
          : ''
      } ${
        variant && variant === TextVariant.LIGHT_WEIGTH
          ? 'font-medium tracking-[0%]'
          : variant === TextVariant.ALL_CAPS
          ? 'font-semibold uppercase tracking-[24%]'
          : 'tracking-[0%]'
      } ${
        colorGradient === ColorGradientVariant.SPECIAL_1
          ? 'bg-gradient-to-l from-ct-primary-400 to-ct-secondary-400 bg-clip-text text-transparent'
          : ''
      } ${className}`}
    />
  );
}) as <T extends HTMLTag>(
  props: TextProps<T>
) => React.ReactElement<TextProps<T>, T>;
