import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';
import './textarea.form.scss';

type Props = {
  options: RegisterOptions;
  register: UseFormRegister<any>;
  name: string;
  title?: string;
  errors: FieldErrors<any>;
  customError?: string;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export default function TextareaForm({ options, name, title, register, errors, customError, ...rest }: Props) {
  return (
    <div className="textarea_form">
      {title && <label htmlFor={name}>{title}</label>}
      <textarea {...rest} id={name} {...register(name, options)} />
      {errors[name] && errors[name].type === 'required' && <p className="err">Required field</p>}
      {errors[name] && errors[name].type === 'minLength' && <p className="err">Field must have at least {options.minLength} characters</p>}
      {errors[name] && errors[name].type === 'maxLength' && <p className="err">Field can't have more than {options.maxLength} characters</p>}
      {errors[name] && errors[name].type === 'pattern' && <p className="err">Wrong format</p>}
      {!errors[name] && customError && <p>{customError}</p>}
    </div>
  );
}
