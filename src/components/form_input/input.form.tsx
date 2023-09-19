import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import './input.form.scss';

type Props = {
  options: RegisterOptions;
  register: UseFormRegister<any>;
  name: string;
  title?: string;
  errors: FieldErrors<any>;
  customError?: string;
  autoComplete?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function InputForm({ options, name, title, register, errors, customError, autoComplete, ...rest }: Props) {
  return (
    <div className="input_form">
      {title && <label htmlFor={name}>{title}</label>}
      <input {...rest} id={name} {...register(name, options)} autoComplete={autoComplete ?? ''} />
      {errors[name] && errors[name].type === 'required' && <p className="err">Required field</p>}
      {errors[name] && errors[name].type === 'minLength' && <p className="err">Field must have at least {options.minLength} characters</p>}
      {errors[name] && errors[name].type === 'maxLength' && <p className="err">Field can't have more than {options.maxLength} characters</p>}
      {errors[name] && errors[name].type === 'pattern' && <p className="err">Wrong format</p>}
      {!errors[name] && customError && <p className="err">{customError}</p>}
    </div>
  );
}
