import { cloneElement, isValidElement } from "react";

const variantClasses = {
  default: "ui-button ui-button-default",
  secondary: "ui-button ui-button-secondary",
  ghost: "ui-button ui-button-ghost",
  destructive: "ui-button ui-button-destructive"
};

export function Button({ asChild = false, className = "", variant = "default", children, ...props }) {
  const classes = `${variantClasses[variant] || variantClasses.default} ${className}`.trim();

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      className: `${classes} ${children.props.className || ""}`.trim()
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
