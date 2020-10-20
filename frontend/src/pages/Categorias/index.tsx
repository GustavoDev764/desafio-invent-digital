import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useStyles } from '../Dashboard/styled';
import Menu from '../../components/Menu';

const CategoriesPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Menu />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>

                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {/* <Produtos /> */}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>

                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default CategoriesPage;