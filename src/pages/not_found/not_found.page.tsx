import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './not_found.page.scss';

export default function NotFound() {
  document.title = '404 Page Not Found';
  return (
    <div className="notfound">
      <h1>404</h1>
      <h3>Oops! This Page Could Not Be Found</h3>
      <Button component={Link} to="/" size="large" variant="contained" color="primary">
        Homepage
      </Button>
    </div>
  );
}
