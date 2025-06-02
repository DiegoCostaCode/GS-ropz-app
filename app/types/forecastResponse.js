export default function forecastResponse(data) {
  if (
    !data ||
    typeof data !== 'object' ||
    typeof data.id !== 'number' ||
    typeof data.risco !== 'string' ||
    typeof data.mensagem !== 'string' ||
    typeof data.dataHora !== 'string' ||
    typeof data.dataCriacao !== 'string' ||
    !data.temperatura ||
    typeof data.temperatura !== 'object'
  ) {
    return null;
  }

  const temp = data.temperatura;
  if (
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
    typeof temp.localizacao !== 'object'
  ) {
    return null;
  }

  const loc = temp.localizacao;
  if (
    typeof loc.id !== 'number' ||
    typeof loc.cep !== 'string' ||
    typeof loc.bairro !== 'string' ||
    typeof loc.cidade !== 'string' ||
    typeof loc.estado !== 'string' ||
    typeof loc.latitude !== 'number' ||
    typeof loc.longitude !== 'number'
  ) {
    return null;
  }

  return data;
}