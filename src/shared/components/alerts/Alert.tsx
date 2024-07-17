import React from 'react';

export interface AlertProps {
  text: string;
  alertType?: 'alert-success' | 'alert-error' | 'alert-warning' | 'alert-info';
  className?: string;
}

/**
 * `Alert` Component
 *
 * The `Alert` component displays a notification message to the user with an icon indicating the type of the message. It is used to communicate important information, warnings, errors, or other messages.
 *
 * ## Key Features:
 * - **Type-Specific Styling**: Based on the `alertType`, the alert will visually indicate whether the message is an informational, success, warning, or error message.
 * - **Customizability**: Allows for additional styling through a custom CSS class.
 * - **Accessibility**: Includes roles and visual cues for accessibility compliance.
 *
 * ## Props:
 * - `text`: The message text to be displayed within the alert.
 * - `alertType`: A string that specifies the type of alert (`success`, `error`, `warning`, `info`).
 * - `className`: Optional string for additional custom CSS classes.
 *
 * ## Usage:
 *
 * ```jsx
 * <Alert
 *   alertType="warning"
 *   text="Note* to reduce slippage costs from Dexes, recommend splitting larger deposits into multiple smaller deposits!"
 *   className="custom-class"
 * />
 * ```
 *
 * This renders an alert with a custom class and a warning icon, providing a user-friendly message about splitting deposits.
 *
 * @param props Props for the `Alert` component.
 * @returns The `Alert` component.
 */

export const Alert: React.FC<AlertProps> = ({ text, alertType = 'alert-warning', className = '' }) => {
  const alertClass = `alert ${alertType} ${className}`;
  return (
    <div role="alert" className={alertClass}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{text}</span>
    </div>
  );
};
