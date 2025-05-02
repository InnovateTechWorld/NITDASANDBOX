"use client"
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from '../../types/components';
import { cn } from '../../lib/utils';

const Button: React.FC<ButtonProps> = ({
    children,
    to,
    onClick,
    variant = 'primary',
    size = 'default',
    className = '',
    isExternal = false,
    icon,
    iconPosition = 'left',
    disabled = false,
    reloadPage = false,
}) => {
    const sizeClasses = {
        default: "h-10 px-4 py-2 rounded-md",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    } as const;

    const variantClasses = {
        primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary)]/70',
        primaryLight: 'bg-white/20 text-white hover:bg-[#06A85D]/70 ',
        white: 'bg-white text-[var(--primary)] hover:bg-[#06A85D] hover:text-white ',
        secondary: 'bg-[var(--secondary2)] text-white  hover:bg-[#282828]/90',
        gradient: 'bg-gradient-to-r from-[#06A85D] to-[#006134] via-[#006134] via-90% text-white hover:bg-gradient-to-l',
        neutral: 'bg-[var(--neutral)] text-white  hover:bg-[var(--neutral)]/50',
        outlinePrimary: "border border-[var(--primary-light)] text-[var(--primary)] bg-[#E8F5E9] hover:bg-[var(--primary)]/70 hover:text-white",
        successLight: "text-[var(--primary)] bg-[#E8F5E9] hover:bg-[var(--primary)] hover:text-white",
        outlineSecondary: "border border-[var(--secondary)] text-[var(--secondary)] bg-white hover:bg-[var(--secondary)]/70 hover:text-white",
        noOutline: 'text-white hover:bg-[var(--primary)] rounded-full active:transform active:scale-95',
    } as const;

    const baseClasses = ` px-4 py-3 cursor-pointer inline-flex text-center items-center justify-center whitespace-nowrap rounded-full text-sm font-regular ring-offset-white transition-colors 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''} `;

    const buttonClass = cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className,
        'w-full h-full rounded-xl'
    );

    const content = (
        <div className='flex items-center flex-row text-center justify-center'>
            {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </div>
    );

    if (to) {
        if (isExternal) {
            return (
                <a href={to} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                    {content}
                </a>
            );
        }

        if (reloadPage) {
            return (
                <Link to={to}>
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            if (onClick) onClick();
                            window.location.href = to;
                        }}
                        className={buttonClass}
                    >
                        {content}
                    </a>
                </Link>
            );
        }

        return (
            <Link to={to} className={buttonClass}>
                {content}
            </Link>
        );
    }

    return (
        <div className=''>
            <button
                onClick={onClick}
                disabled={disabled}
                className={buttonClass}
            >
                {content}
            </button>
        </div>
    );
};

export default Button;