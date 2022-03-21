import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { IDespesa } from './service'
import { useStyles } from './Style';

export default function Detalhes(props: { despesaDetalhes: IDespesa[], show: boolean }) {

  const { despesaDetalhes } = props;
  const classes = useStyles();

  return (
    <TableContainer hidden={!props.show} className={classes.containerTable} component={'div'}>
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
          {despesaDetalhes.map((despesa) => (
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
