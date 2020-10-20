import React, { useCallback, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useAuth } from '../../hooks/Auth';

const useStyles = makeStyles((theme) => ({

    erro: {
        fontSize: '12px',
        color: '#d64444',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    root: {
        marginTop: '8px',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface FormLogin {
    email: string;
    password: string;
}

interface MessageErros {
    email: string[];
    password: string[];
}

const LoginPage: React.FC = () => {

    const classes = useStyles();
    const { singnIn } = useAuth();
    const [form, setForm] = useState<FormLogin>({} as FormLogin);
    const [erros, setErros] = useState<MessageErros>({} as MessageErros);

    const [isLoading, setIsLoading] = useState<boolean>(false);



    const handleEmail = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setForm({ ...form, email: e.target.value })

    }, [form]);

    const handlePassword = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setForm({ ...form, password: e.target.value });

    }, [form]);

    const handleForm = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await singnIn(
            form.email,
            form.password
        );
        console.log(response);
        if (!!response) {
            const { email, password } = response;
            setErros({ email, password });
        }

        setIsLoading(false);
    }, [singnIn, form.email, form.password]);


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Area Restrita
                </Typography>
                {
                    isLoading ? (
                        <div className={classes.root}>
                            <LinearProgress />
                        </div>
                    ) : null
                }
                <form className={classes.form} onSubmit={handleForm} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        onChange={handleEmail}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    {
                        !!erros.email ? (
                            erros.email.map(item => (
                                <div className={classes.erro} key={item}>{item}</div>
                            ))
                        ) : null
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        onChange={handlePassword}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    {
                        !!erros.password ? (
                            erros.password.map(item => (
                                <div className={classes.erro} key={item}>{item}</div>
                            ))
                        ) : null
                    }


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Entra
                    </Button>

                </form>
            </div>

        </Container>
    );
}

export default LoginPage;