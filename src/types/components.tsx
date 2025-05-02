export type ButtonProps = {
    children: React.ReactNode;
    to?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outlinePrimary' | 'outlineSecondary' | 'noOutline' | 'white' | 'primaryLight' | 'gradient' | 'neutral' | 'successLight';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
    isExternal?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
    reloadPage?: boolean;
  };