import { Box, Button, Container, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { IUser, signInUserEndpoint } from './service';
import { useStyles } from './Style';


export interface ILoginProps{
    onSignIn: (user: IUser) => void;
}

export default function Login(props: ILoginProps) {
    const design = useStyles();
    const [email, setEmail] = useState("usuario@email.com")
    const [senha, setSenha] = useState("1234")
    const [error, setError] = useState("");

    function signIn(e: React.FormEvent) {
        e.preventDefault();
        signInUserEndpoint(email, senha).then((user) => {
            setError("");
            props.onSignIn(user);
        }, (e) => {
            setError("Usuário ou senha incorretos!")
        })
    }

    return (
        <Container maxWidth="sm">
            <h1>Login</h1>
            <p>
                Digite e-mail e senha para entrar no sistema.
            </p>
            <form onSubmit={signIn}>
                <TextField
                    type="email"
                    fullWidth
                    margin="normal"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    type="password"
                    fullWidth
                    margin="normal"
                    label="Senha"
                    variant="outlined"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                { error && 
                <div className={design.error}>
                    {error}
                </div>}
                <Box textAlign="right" marginTop="16px">
                    <Button type="submit" color="primary" variant="contained">
                        Logar
                    </Button>
                </Box>
            </form>
        </Container>
    )
}
