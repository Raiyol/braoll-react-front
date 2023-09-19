import { Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeToast } from '../../store/actions/toast.action';
import './success.toast.scss';

export default function SuccessToast() {
  const open = useSelector((state: State) => state.successToast);
  const dispatch = useDispatch();

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeToast());
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <div className="toast">Confirmation mail has been sent!</div>
      </Snackbar>
    </>
  );
}
