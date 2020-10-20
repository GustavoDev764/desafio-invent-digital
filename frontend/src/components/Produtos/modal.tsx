import React, { useCallback, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useProduto } from '../../hooks/Produtos';
import { useCategori } from '../../hooks/Categories';
import { Produto, Category } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            width: '80%',
            height: '40%',
        },

        row: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        input: {
            maxHeight: '50px',
        },
    }),
);


const ModalProdutos: React.FC = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState<Category[]>([]);
    const { list } = useCategori();
    //const [produto, setProduto] = useState<Produto>({} as Produto)

    const {
        getIsModal,
        handleModal,
        getProdutoNoModal,
        setName,
        setDescricao,
        setCategoria,
        setPrice
    } = useProduto();

    const produto = getProdutoNoModal();

    const handleSearch = useCallback(async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {


        const name = e.currentTarget.value;
        console.log("dispara: " + name);
        const response = await list({ name });
        const data: any = response.data;
        if (data?.permision !== false) {
            if (data?.data) {
                setCategories(data.data);
            }
        }
    }, [list])

    return (
        <div>

            <Modal

                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={getIsModal()}
                onClose={handleModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={getIsModal()}>
                    <div className={classes.paper}>



                        <Grid className={classes.row}>
                            <TextField
                                onChange={({ currentTarget }) => {
                                    setName(currentTarget.value);
                                }}
                                value={produto.name}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Nome"
                                autoFocus
                                style={{ marginRight: '10px' }}
                            />
                            <TextField
                                onChange={({ currentTarget }) => {
                                    setDescricao(currentTarget.value);
                                }}
                                value={produto.description}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Descrição"
                                autoFocus

                                style={{ marginLeft: '10px' }}
                            />

                        </Grid>
                        <Grid className={classes.row}>
                            <Autocomplete
                                onChange={({ currentTarget }) => {
                                    console.log(currentTarget);
                                }}
                                id="combo-box-demo"
                                options={categories}
                                getOptionLabel={(category: Category) => category.id + '-' + category.name}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}

                                        onChange={handleSearch}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Nome Categoria"
                                        autoFocus
                                        value={produto.category?.name}
                                        style={{ marginRight: '10px' }}
                                    />)
                                }
                            />

                            <TextField
                                onChange={({ currentTarget }) => {
                                    setPrice(parseFloat(currentTarget.value));
                                }}
                                type={'number'}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Preço"
                                autoFocus
                                value={produto.price}
                                style={{ marginLeft: '10px' }}
                            />

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '20px' }}
                        >
                            Salvar
                    </Button>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalProdutos;