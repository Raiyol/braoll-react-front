import { UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<any>;
  name: string;
  title?: string;
  customError?: string;
};

export default function CheckboxForm({ name, register, customError, title }: Props) {
  return (
    <div>
      <input type="checkbox" id={name} {...register(name)} />
      {title && <label htmlFor={name}> {title} </label>}
      {customError && <p className="err">{customError}</p>}
    </div>
  );
}
