import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="primary" href="https://material-ui.com/">
          Kamehouse
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Copyright