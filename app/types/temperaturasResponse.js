export default function temperaturasResponse(data) {
  if (!Array.isArray(data)) return [];

  return data.filter(item => {

    if (!item ||
        typeof item.id !== 'number' ||
        typeof item.risco !== 'string' ||
        typeof item.mensagem !== 'string' ||
        typeof item.dataHora !== 'string' ||
        typeof item.dataCriacao !== 'string' ||
        !item.temperatura ||
        typeof item.temperatura !== 'object') {
      return false;
    }

    const temp = item.temperatura;
    if (!temp ||
        typeof temp.id !== 'number' ||
        typeof temp.icon !== 'string' ||
        typeof temp.tempo !== 'string' ||
        typeof temp.descricao !== 'string' ||
        typeof temp.temperatura !== 'number' ||
        typeof temp.temperaturaMaxima !== 'number' ||
        typeof temp.temperaturaMinima !== 'number' ||
        typeof temp.sensacaoTermica !== 'number' ||
        typeof temp.umidade !== 'number' ||
        typeof temp.dataHora !== 'string' ||
        !temp.localizacao ||
        typeof temp.localizacao !== 'object') {
      return false;
    }

    const loc = temp.localizacao;
    return loc &&
           typeof loc.id === 'number' &&
           typeof loc.cep === 'string' &&
           typeof loc.bairro === 'string' &&
           typeof loc.cidade === 'string' &&
           typeof loc.estado === 'string' &&
           typeof loc.latitude === 'number' &&
           typeof loc.longitude === 'number';
  });
}