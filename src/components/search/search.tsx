import { Tooltip, withStyles } from '@material-ui/core';
import { ReactNode, useState } from 'react';
import './search.scss';

type Props = {
  children?: ReactNode;
  placeholder?: string;
  getInput?: (input: string) => void;
  classes?: string;
};

const SearchTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'black',
    width: '20rem',
    maxHeight: '20rem',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.175)',
  },
}))(Tooltip);

export default function Search({ children, placeholder, getInput, classes }: Props) {
  const [isFocused, setFocus] = useState(false);
  const [input, setInput] = useState('');
  const handleChange = (input: string) => {
    setInput(input);
    if (getInput) getInput(input);
  };

  return (
    <SearchTooltip classes={{ tooltip: classes }} interactive open={isFocused && input.length > 0} placement="bottom-start" title={<>{children}</>}>
      <input className="search" type="text" onFocus={() => setFocus(true)} placeholder={placeholder} onBlur={() => setFocus(false)} onChange={(e) => handleChange(e.target.value)} />
    </SearchTooltip>
  );
}
