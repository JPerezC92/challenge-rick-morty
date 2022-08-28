import React from 'react';

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

type TextProps<T> = T extends HTMLTag
  ?
      | (JSX.IntrinsicElements[T] & {
          as?: T;
          l1?: false;
          l2?: false;
          variant?: undefined;
        })
      | (JSX.IntrinsicElements[T] & {
          as?: T;
          l1: true;
          l2?: undefined;
          variant?: `${TextVariant}`;
        })
      | (JSX.IntrinsicElements[T] & {
          as?: T;
          l1?: undefined;
          l2: true;
          variant?: `${TextVariant.ALL_CAPS}`;
        })
  : never;

export const Text: <T extends HTMLTag>(
  props: TextProps<T>
) => React.ReactElement<TextProps<T>, T> = ({
  l1,
  l2,
  variant,
  as = '',
  className = '',
  ...props
}) => {
  const Tag = as || 'span';

  if (l1) {
    return (
      <Tag
        {...props}
        className={`font-nunito text-base leading-[150%] sm:text-lg ${
          variant && variant === TextVariant.LIGHT_WEIGTH
            ? 'font-medium tracking-[0%]'
            : variant === TextVariant.ALL_CAPS
            ? 'font-semibold uppercase tracking-[24%]'
            : 'font-semibold tracking-[0%]'
        } ${className}`}
      />
    );
  }

  if (l2) {
    return (
      <Tag
        {...props}
        className={`font-nunito text-xs font-semibold leading-[150%] sm:text-sm ${
          variant && variant === TextVariant.ALL_CAPS
            ? 'uppercase tracking-[5%] sm:tracking-[0%]'
            : 'tracking-[0%]'
        } ${className}`}
      />
    );
  }

  return <Tag className={`${className}`} {...props} />;
};
