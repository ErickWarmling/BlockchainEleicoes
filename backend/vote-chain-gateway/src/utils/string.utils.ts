// Função para extrair o JSON interno
export const extractInnerJson = (
  response: Array<{ message: string }>,
): string | null => {
  try {
    const match = response[0].message.match(/\{.*\}/); // Procura por um JSON dentro da string
    if (match) {
      return JSON.parse(match[0]); // Retorna o JSON como string
    }
    return null; // Retorna null caso não encontre o JSON
  } catch (error) {
    console.error('Erro ao extrair JSON:', error);
    return null;
  }
};
