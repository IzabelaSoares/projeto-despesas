import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Detalhes from './Detalhes';
import Resumo from './Resumo';
import { getDespesas, IDespesa, IResumoDespesa } from './service';
import { useStyles } from './Style';
import User from './User';
import { anos, meses } from './utils';

export default function TableDespesas() {

    const params = useParams<{ anoMes: string }>();
    const navigate = useNavigate();

    const classes = useStyles();
    const [despesas, setDespesas] = useState<IDespesa[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [mes, setMes] = useState(params.anoMes?.slice(5, 7) || "01");
    const [ano, setAno] = useState(params.anoMes?.slice(0, 4) || "2020");
    const [despesaResumo, setDespesaResumo] = useState<IResumoDespesa[]>([]);
    const [show, setShow] = useState(false)

    useEffect(() => {
        Promise.resolve(getDespesas(ano, mes)).then((despesasPromise) => {
            setDespesas(despesasPromise);
            setTotal(calcularTotal(despesasPromise));
            setDespesaResumo(gerarResumoDespesa(despesasPromise));
        })
    }, [ano, mes, despesas])

    function calcularTotal(despesas: IDespesa[]) {
        const resultado = despesas.map(obj => obj.valor).reduce(function (a, b) {
            return a + b
        }, 0);
        return resultado;
    }

    function gerarResumoDespesa(despesas: IDespesa[]) {
        //pegar as categorias do mês
        let categorias: string[] = []
        despesas.forEach(objeto => {
            if (!categorias.includes(objeto.categoria)) {
                categorias.push(objeto.categoria)
            }
        })

        //gerar resumo por categoria
        let resumo: IResumoDespesa[] = [];
        categorias.forEach((cat) => {
            let total = 0
            despesas.forEach((objeto) => {
                if (objeto.categoria === cat) {
                    total += objeto.valor
                }
            })
            resumo.push({ categoria: cat, valorTotal: total })
        })
        return (resumo)
    }

    const handleChangeAno = (event: any) => {
        setAno(event.target.value);
        navigate(`/despesas/${ano}-${mes}`)
    };

    const handleChangeMes = (event: any) => {
        setMes(event.target.value);
        navigate(`/despesas/${ano}-${mes}`)
    };

    const detalhes = () => {
        return (
            <TableContainer className={classes.containerTable} component={'div'}>
                <Table className={classes.table} size="small" aria-label="tabela despesa">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>Despesa</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Dia</TableCell>
                            <TableCell style={{ textAlign: "end" }}>Valor(R$)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {despesas.map((despesa) => (
                            <TableRow key={despesa.id} >
                                <TableCell>{despesa.descricao}</TableCell>
                                <TableCell>{despesa.categoria}</TableCell>
                                <TableCell>{despesa.dia}</TableCell>
                                <TableCell style={{ textAlign: "end" }}>{despesa.valor.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <div className={classes.containerDiv}>
            <User />
            <div className={classes.containerForm}>
                <Box>
                    <FormControl variant="standard" style={{ minWidth: 120 }}>
                        <InputLabel id="ano">Ano</InputLabel>
                        <Select
                            labelId="ano"
                            id="ano"
                            value={ano}
                            onChange={handleChangeAno}
                            label="Ano"
                        >
                            {anos.map(anoLista => (
                                <MenuItem key={anoLista} value={anoLista}>{anoLista}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" style={{ minWidth: 120, marginLeft: 30 }}>
                        <InputLabel id="mes">Mês</InputLabel>
                        <Select
                            labelId="mes"
                            id="mes"
                            value={mes}
                            onChange={handleChangeMes}
                            label="Mês"
                        >
                            {meses.map((mesLista, index) => (
                                <MenuItem key={mesLista} value={(index + 1).toString().padStart(2, '0')}>{mesLista}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box marginTop={"20px"} display="justify-content">
                    <Button onClick={() =>  setShow(false)} className={classes.buttons} variant="contained" color="primary" >
                        Resumo
                    </Button>
                    <Button onClick={() => setShow(true)} className={classes.buttons} variant="contained" color="secondary">
                        Detalhes
                    </Button>
                    <span className={classes.span}>Despesa Total: R$ {total.toFixed(2).replace(".", ",")} </span>
                </Box>

            </div>
            <Resumo show={!show} despesaResumo={despesaResumo}/>
            <Detalhes show={show} despesaDetalhes={despesas}/>           
        </div>
    );
}

