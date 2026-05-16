import { forwardRef, useRef } from 'react';
import styles from './otp-input.module.css';

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  ({ length = 6, value = '', onChange, disabled, error, className }, ref) => {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const digits = Array.from({ length }, (_, i) => value[i] ?? '');

    const update = (index: number, char: string) => {
      const next = [...digits];
      next[index] = char;
      onChange?.(next.join(''));
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const char = e.target.value.replace(/\D/g, '').slice(-1);
      update(index, char);
      if (char && index < length - 1) inputs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !digits[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      onChange?.(pasted);
      inputs.current[Math.min(pasted.length, length - 1)]?.focus();
    };

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(' ')}
        onPaste={handlePaste}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            data-error={error || undefined}
            className={styles.input}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>
    );
  },
);
OtpInput.displayName = 'OtpInput';
