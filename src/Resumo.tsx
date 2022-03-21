import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { IResumoDespesa } from './service';
import { useStyles } from './Style';

export default function Resumo(props: { despesaResumo: IResumoDespesa[], show: boolean }) {

    const { despesaResumo } = props;
    const classes = useStyles();
   

    return (
        <TableContainer hidden={!props.show} className={classes.containerTable} component={'div'}>
            <Table className={classes.table} size="small" aria-label="tabela despesa">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: "bold" }}>Categoria</TableCell>
                        <TableCell style={{ textAlign: "end" }}>Valor Total(R$)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {despesaResumo.map((resumo) => (
                        <TableRow key={resumo.categoria} >
                            <TableCell>{resumo.categoria}</TableCell>
                            <TableCell style={{ textAlign: "end" }}>{resumo.valorTotal.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
