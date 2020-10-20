import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useStyles } from '../../pages/Dashboard/styled';

import Items from './item';
import { useMenu } from '../../hooks/Menu';


const Menu: React.FC = () => {
    const classes = useStyles();
    const { getIsOpen, handleMenu } = useMenu();

    return (
        <>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, getIsOpen() && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => { handleMenu() }}
                        className={clsx(classes.menuButton, getIsOpen() && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !getIsOpen() && classes.drawerPaperClose),
                }}
                open={getIsOpen()}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => { handleMenu() }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Items />
            </Drawer>
        </>
    );
}

export default Menu;