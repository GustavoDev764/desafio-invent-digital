import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Produto } from '../../interfaces';



const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface Props {
    produtos?: Produto[],
    edit(produto: any): void;
    deleted(produto: any): void;
}


const Produtos: React.FC<Props> = ({ produtos, edit, deleted }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Produtos
                </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell>Preço</TableCell>
                        <TableCell>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !!produtos ? (
                            produtos.map((produto) => (
                                <TableRow key={produto.id}>
                                    <TableCell>{produto.name}</TableCell>
                                    <TableCell>{produto.description}</TableCell>
                                    <TableCell>{produto.category?.name}</TableCell>
                                    <TableCell>{produto.price}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => {
                                                deleted(produto);
                                            }}
                                        ><DeleteIcon /></Button>
                                        <Button
                                            onClick={(e) => {
                                                edit(produto);
                                            }}><EditIcon /></Button>
                                    </TableCell>

                                </TableRow>
                            ))
                        ) : null
                    }

                </TableBody>
            </Table>

            <div className={classes.root}>
                <Button>Prev</Button>
                <Button>Next</Button>
            </div>


        </React.Fragment>
    );
}

export default Produtos;