export function formatCep(value) {

    value = value.replace(/\D/g, '');

    if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }
    return value.slice(0, 9);
}

export function formatTel (telefone) {
    let numeros = telefone.replace(/\D/g, '');

    numeros = numeros.slice(0, 11);

    if (numeros.length <= 2) {
        return `(${numeros}`;
    } else if (numeros.length <= 7) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else if (numeros.length <= 11) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    }
    return telefone;
};