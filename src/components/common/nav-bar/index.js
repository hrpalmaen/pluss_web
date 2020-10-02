import React, { useState, Fragment } from 'react';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FaceIcon from '@material-ui/icons/Face';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {Redirect} from "react-router-dom";

import AlertDialog from "../confirm"
import PageNotFound from "../page-not-found";
import { User } from "../../../pages/users/index";
import { CreateQuotation } from "../../make-rates/create";
import { MakeRate } from "../../make-rates/list/index";
import { GeneratePDF } from '../pdf'
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 210;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 50,
    // theme.spacing(7) + 1,
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(9) + 1
    // }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export const Menu = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState({open:false, option:null});
  const [confirm, setConfirm] = useState(false);
  const [userSession, setUserSession] = useState(localStorage.getItem('name'))

  // if (localStorage) {
  //   console.log('localStorage: ', localStorage);
  //   let aaa = localStorage.getItem('name')
  //   setUserSession(localStorage.getItem('name'))
  // }

  const handleDrawerClose = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const logOut = (eeee) => {
    localStorage.clear()
    setConfirm(true)
    
  }

  const closeConfirmation = () => {
    setShowAlert(!showAlert)
  }

  return (
    <div className="flex" id="nav-var-pluss">
      <div className="">
        <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className="popo">
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          Hola {userSession}
        </div>
        <Divider />
        <List >
          {[
            {
              text: "Usuarios",
              icon: <PeopleIcon />,
              path: "/usuarios"
            },
            {
              text: "Crear cotización",
              icon: <AssignmentIcon />,
              path: "/cotizaciones/crear"
            },
            {
              text: "Lista de cotizaciones",
              icon: <AssignmentTurnedInIcon />,
              path: "/cotizaciones"
            },
            {
              text: "Productos",
              icon: <AddShoppingCartIcon />,
              path: "/productos"
            },
            {
              text: "Clientes",
              icon: <FaceIcon />,
              path: "/clientes"
            }
          ].map((section, index) => (
            <ListItem button key={section.text} className='nav-bar-items'>
              <Tooltip title={section.text} placement="right-start" variant="regular" className='row nav-bar-text'>
                <Link to={section.path} >
                  <ListItemIcon>{section.icon}</ListItemIcon>
                  {open && <p>{section.text}</p>}
                </Link>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Divider />
        <div >
          <Tooltip title="Cerrar sesión" placement="right-start" variant="regular">
            <IconButton onClick={() => setShowAlert({open:true, option:'logout'})}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>            
        </div>
      </Drawer>
      </div>

      <main className="view">
        <div className={classes.toolbar} />
        {children}
      </main>

      {/* <AlertDialog open={showAlert.open} option={showAlert.option} close={closeConfirmation} confirm={logOut} /> */}
      {confirm && <Redirect to='/'/>}
    </div>
  );
}
