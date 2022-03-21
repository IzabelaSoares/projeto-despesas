const url = 'http://localhost:3001';

export interface IDespesa {
    id: number,
    descricao: string,
    categoria: string,
    valor: number,
    mes: string,
    dia: string
}

export interface IResumoDespesa {
    categoria: string,
    valorTotal: number
}

export interface IUser{
    email: string,
    name: string
}

export function getDespesas(ano: string = '2021', mes: string = '01'): Promise<IDespesa[]> {
    return fetch(`${url}/despesas?mes=${ano}-${mes}&_sort=dia`, {
        credentials: "include",
    }).then(handleResponseStatus)
}

export function getUserEndpoint(): Promise<IUser> {
    return fetch(`${url}/sessao/usuario`,{
        credentials: "include",
    }).then(handleResponseStatus)
}

export function signInUserEndpoint(email: string, senha: string): Promise<IUser> {
    return fetch(`${url}/sessao/criar`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, senha}),
    }).then(handleResponseStatus)
}

export function signOutUserEndpoint(): Promise<IUser> {
    return fetch(`${url}/sessao/finalizar`, {
        credentials: "include",
        method: "POST",
    }).then(handleResponseStatus)
}

function handleResponseStatus(resp: Response) {
    if (resp.ok) {
        return resp.json();
    }
    throw new Error(resp.statusText);
}