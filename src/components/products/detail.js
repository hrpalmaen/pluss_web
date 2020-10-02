import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    // backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function Detail(props) {
  const classes = useStyles();
  const data = props.selectDetail;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}> 
          <Typography className="text-center" variant="h5">
            {data.descripcion}
          </Typography>
          <span>Ref. {data.referencia}</span>
          <br/>
          <div>            
            <span>Color:</span> {data.color} <br/>
            <span>Material:</span> {data.material} <br/>
            <span>Medidas:</span> {data.medidas} <br/>
            <span>Marcas:</span> {data.areaImpresion} <br/>
          </div>
          <Divider />
          <br/>
          <div>
            {data.descLarga}
          </div>

          <br/>
          <div>
            {data.existencias} Unidades disponibles <br/>
            Valor unitario ${data.vlrUnitario}
          </div>

          <form className={classes.form} noValidate>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Seleccionar producto"
            />
          </form>
        </div>
      </Grid>
    </Grid>
  );
}