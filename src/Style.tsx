import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({

    table: {
        "& td": {
            padding: "10px",
        },
        "& th": {
            fontWeight: "bold",
            padding: "10px",
        },
    },
    containerTable: {
        marginTop: "30px",
        width: "900px",
    },
    containerDiv: {
        marginLeft: "5%",
    },
    containerForm: {
        margin: "10px", 
        textAlign: "start",
    },
    span: {
        marginLeft: "25%",
        padding: "30px",
        verticalAlign: " bottom",
        fontWeight: "bold",
    },
    error: {
        backgroundColor: "#FF4C4C",
        borderRadius: "4px",
        padding: "16px",
        margin: "16px 0",
    },
    menu:{
        display: "flex",
        flexDirection: "column",
        marginBottom: "8px",
        padding: "16px",
        alignItems: "center",
        borderBottom: "1px solid rgb(224, 224, 224)",
        "& > *": {
            marginBottom: "8px"
        },
    },
    buttons: {
        marginRight: "20px"
    }
});