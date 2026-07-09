import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "promo"
  | "yellow"
  | "orchid"
  | "blue"
  | "ghost"
  | "ghostPromo";

export type ButtonType = {
  type?: ButtonVariant;
  darkBg?: boolean;
  iconLeft?: ReactNode | null;
  iconRight?: ReactNode | null;
};

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> &
  ButtonType & {
    children: ReactNode;
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    pressed?: boolean;
  };

const BUTTON_VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-button-bg-dark-primary text-text-body-light-primary",
  secondary: "bg-button-bg-light-secondary text-text-body-dark-primary",
  promo:
    "bg-gradient-to-r from-brand-primary to-brand-secondary text-text-body-light-primary",
  yellow: "bg-button-bg-light-yellow text-text-body-yellow-primary",
  orchid: "bg-button-bg-light-orchid text-text-body-orchid-primary",
  blue: "bg-button-bg-light-blue text-text-body-blue-primary",
  ghost: "bg-transparent",
  ghostPromo: "bg-transparent text-text-body-blue-secondary",
};

const DARK_BG_BUTTON_VARIANT_STYLES: Partial<Record<ButtonVariant, string>> = {
  primary: "bg-button-bg-light-primary text-text-body-dark-primary",
  secondary: "bg-button-bg-dark-secondary text-text-body-light-primary",
  ghost: "bg-transparent text-text-body-light-primary",
};

const LIGHT_BG_GHOST_STYLE = "text-text-body-dark-primary";

export function Button({
  children,
  className,
  darkBg = false,
  disabled,
  htmlType = "button",
  iconLeft = null,
  iconRight = null,
  pressed = false,
  type = "primary",
  ...props
}: ButtonProps) {
  const variantClassName = darkBg
    ? (DARK_BG_BUTTON_VARIANT_STYLES[type] ?? BUTTON_VARIANT_STYLES[type])
    : type === "ghost"
      ? LIGHT_BG_GHOST_STYLE
      : BUTTON_VARIANT_STYLES[type];

  return (
    <button
      {...props}
      type={htmlType}
      disabled={disabled}
      data-dark-bg={darkBg}
      data-pressed={pressed}
      data-variant={type}
      className={cn(
        "primitive-button type-body-lg-semi radius-default inline-flex h-[54px] items-center justify-center gap-[var(--spacing-h-gap-chips)] px-[var(--spacing-300)] py-[var(--spacing-200)] text-center whitespace-nowrap select-none",
        variantClassName,
        disabled && "opacity-36",
        className,
      )}
    >
      {iconLeft ? (
        <span className="primitive-button__icon" aria-hidden="true">
          {iconLeft}
        </span>
      ) : null}
      <span className="primitive-button__label">{children}</span>
      {iconRight ? (
        <span className="primitive-button__icon" aria-hidden="true">
          {iconRight}
        </span>
      ) : null}
    </button>
  );
}
