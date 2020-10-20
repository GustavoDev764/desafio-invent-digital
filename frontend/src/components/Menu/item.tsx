import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import CategoryIcon from '@material-ui/icons/Category';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { RoutesWeb } from '../../routers/createrouter';
import { useAuth } from '../../hooks/Auth';

export const useStyles = makeStyles((theme) => ({
    item: {
        color: 'inherit',
        textDecoration: 'none'
    }
}));

const Items: React.FC = () => {
    const classes = useStyles();
    const { singnOut } = useAuth();
    return (
        <div>
            <Link className={classes.item} to={RoutesWeb.DASHBOARD}>
                <ListItem button>

                    <ListItemIcon>
                        <ShoppingBasketIcon />
                    </ListItemIcon>
                    <ListItemText primary="Produtos" />

                </ListItem>
            </Link>
            <Link className={classes.item} to={RoutesWeb.CATEGORY}>
                <ListItem button>

                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categorias" />

                </ListItem>
            </Link>
            <Link onClick={() => { singnOut() }} className={classes.item} to={'#'}>
                <ListItem button>
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </Link>
        </div >
    );
}

export default Items;