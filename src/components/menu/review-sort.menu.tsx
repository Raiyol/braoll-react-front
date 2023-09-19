import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  options: string[];
  defaultValue?: string;
  onSelected: (value: string) => void;
};

export default function ReviewSortMenu({ options, defaultValue, onSelected }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState('');
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setValue = (value: string) => {
    setSelected(value);
    onSelected(value);
  };

  useEffect(() => {
    setSelected(defaultValue ?? options[0]);
  }, [options, defaultValue]);

  return (
    <div>
      <span>Sort: </span>
      <Button aria-controls="simple-menu" aria-haspopup="true" size="small" onClick={handleClick}>
        {selected}
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              handleClose();
              setValue(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
