import { ToggleButtonGroup, ToggleButton, ToggleButtonGroupProps } from '@material-ui/lab';
import { useEffect, useState } from 'react';

type Props = {
  options: string[];
  callback?: (value: string) => void;
  className?: string;
  defaultValue?: string;
} & ToggleButtonGroupProps;

export default function ToggleButtons({ options, callback, className, defaultValue, ...rest }: Props) {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected(defaultValue ?? options[0]);
  }, [options, defaultValue]);

  const handleSelected = (event: React.MouseEvent<HTMLElement, MouseEvent>, newSelected: string) => {
    if (newSelected !== null) {
      setSelected(newSelected);
      if (callback) callback(newSelected);
    }
  };

  return (
    <ToggleButtonGroup className={className} value={selected} {...rest} onChange={handleSelected} aria-label="text alignment">
      {options.map((option, i) => (
        <ToggleButton key={i} value={option} aria-label={option}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
