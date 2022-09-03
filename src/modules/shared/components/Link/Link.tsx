import React from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { Icon } from 'src/modules/shared/components/Icon';
import { Text } from 'src/modules/shared/components/Text';

enum LinkVariants {
  SOLID = 'solid',
  TEXT = 'text',
  OUTLINE = 'outline',
}

type LinkProps = React.ComponentPropsWithRef<'a'> & {
  primary?: boolean;
  secondary?: boolean;
  variant?: `${LinkVariants}`;
};

export const Link: React.FC<LinkProps> = React.forwardRef(function Link(
  { className = '', primary, secondary, children, variant = 'solid', ...props },
  ref
) {
  return (
    <Text
      {...props}
      ref={ref}
      as="a"
      className={`p-1 px-2 font-medium decoration-2 transition-all duration-100 ease-in-out hover:cursor-pointer  hover:italic hover:underline ${
        primary
          ? 'text-ct-primary-100 hover:text-ct-primary-400 hover:decoration-ct-primary-300'
          : secondary
          ? 'text-ct-secondary-100 hover:text-ct-secondary-300 hover:decoration-ct-secondary-300'
          : ''
      } ${
        variant === LinkVariants.SOLID
          ? 'bg-ct-neutral-medium-700/50 hover:bg-ct-neutral-medium-700'
          : variant === LinkVariants.OUTLINE
          ? 'border border-ct-neutral-medium-700/50 hover:border-ct-neutral-medium-600'
          : variant === LinkVariants.TEXT
          ? ''
          : ''
      } ${className}`}
    >
      <Icon as={BsLink45Deg} variant="xs" className="mr-2" />

      {children}
    </Text>
  );
});
