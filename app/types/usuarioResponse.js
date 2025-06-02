
export function usuarioResponse(data) {
  const localizacaoValida =
    data.localizacao &&
    typeof data.localizacao === 'object' &&
    typeof data.localizacao.cep === 'string' &&
    typeof data.localizacao.bairro === 'string' &&
    typeof data.localizacao.cidade === 'string' &&
    typeof data.localizacao.estado === 'string' &&
    typeof data.localizacao.latitude === 'number' &&
    typeof data.localizacao.longitude === 'number';

  if (
    typeof data === 'object' &&
    typeof data.nome === 'string' &&
    typeof data.telefone === 'string' &&
    typeof data.email === 'string' &&
    localizacaoValida
  ) {
    return data;
  }

  console.warn('Dados de usuário inválidos:', data);
  return null;
}

export function usuarioRequest(data) {
  if (
    typeof data === 'object' &&
    typeof data.nome === 'string' &&
    typeof data.telefone === 'string' &&
    typeof data.email === 'string' &&
    typeof data.senha === 'string' &&
    typeof data.cep === 'string'
  ) {
    return data;
  }
  
  console.warn('Dados de usuário inválidos:', data);
  return null;
}

export function usuarioAuth(data) {
  if (
    typeof data === 'object' &&
    typeof data.email === 'string' && data.email != '' &&
    typeof data.senha === 'string'&& data.senha != ''
  ) {
    return data;
  }
  
  return null;
}
