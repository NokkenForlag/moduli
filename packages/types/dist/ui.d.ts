export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
}
export interface InputProps {
    type?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    label?: string;
    helperText?: string;
    required?: boolean;
}
export interface ToastProps {
    type?: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
    onClose?: () => void;
}
//# sourceMappingURL=ui.d.ts.map