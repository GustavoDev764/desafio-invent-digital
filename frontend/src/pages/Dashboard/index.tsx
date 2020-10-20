import React, { useEffect, useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Menu from '../../components/Menu';
import Produtos from '../../components/Produtos';
import { useStyles } from './styled';
import { useProduto } from '../../hooks/Produtos';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { ResponseList, Produto } from '../../interfaces';

import ModalProdutos from '../../components/Produtos/modal';

const DashboardPage: React.FC = () => {
    let timeOut: any = '';
    const classes = useStyles();
    const { list, deleted, handleModal, setProdutoNoModal } = useProduto();
    const [produtos, setProdutos] = useState<Produto[]>([]);


    const search = useCallback(async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const name: string = e.currentTarget.value;

        clearTimeout(timeOut);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        timeOut = setTimeout(async () => {
            const response = await list({ name });
            const data: any = response.data;
            if (data?.permision !== false) {
                if (data?.data) {
                    setProdutos(data.data);
                }
            }
        }, 2000);


    }, [list]);

    const loadProducts = useCallback(async () => {
        const response = await list({});
        const data: any = response.data;
        if (data?.permision !== false) {
            if (data?.data) {
                setProdutos(data.data);
            }
        }
    }, [list])


    const editProduto = useCallback(async (produto: Produto) => {
        setProdutoNoModal(produto);
        handleModal();
    }, [handleModal, setProdutoNoModal]);

    const deleteProduto = useCallback(async ({ id }: Produto) => {
        await deleted({ id });
        loadProducts();
    }, [deleted, loadProducts]);


    useEffect(() => {

        loadProducts();
    }, [loadProducts]);


    return (
        <div className={classes.root}>
            <Menu />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <ModalProdutos />
                    <Grid container spacing={3}>

                        {/* Recent Orders */}
                        <Grid item xs={12}>

                            <Paper className={classes.paper}>
                                <Grid item xs={12} direction={'row'} justify={'space-between'} alignItems={'center'}>
                                    <Input
                                        onChange={search}
                                        name="Busca por nome"
                                        placeholder="Busca por nome"
                                    />

                                    <Button onClick={() => {
                                        setProdutoNoModal({} as Produto);
                                        handleModal();
                                    }}>
                                        Adiciona
                                        <AddCircleIcon />
                                    </Button>
                                </Grid>



                                <Produtos
                                    edit={editProduto}
                                    deleted={deleteProduto}
                                    produtos={produtos}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>

                    </Box>
                </Container>
            </main>
        </div>
    )
}

export default DashboardPage;