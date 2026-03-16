// Juros simples: J = P * i * t
export function jurosSimples(principal, taxa, tempo) {
  return principal * taxa * tempo;
}

// Juros compostos: M = P * (1 + i)^t
export function jurosCompostos(principal, taxa, tempo) {
  return principal * Math.pow(1 + taxa, tempo);
}

export function getImpostoPorDias(dias) {
  if (dias <= 180) return 0.225;
  if (dias <= 360) return 0.20;
  if (dias <= 720) return 0.175;
  return 0.15;
}

export function jurosCompostosFixosComImposto(valorInicial, aporteMensal, taxaAnual, periodo, unidade) {
  const meses = unidade === 'meses' ? periodo : periodo * 12;
  const dias = unidade === 'meses' ? periodo * 30 : periodo * 365;
  const taxaMensal = taxaAnual / 12;
  const montantePrincipal = valorInicial * Math.pow(1 + taxaMensal, meses);
  const montanteAportes = taxaMensal === 0
    ? aporteMensal * meses
    : aporteMensal * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal);
  const montante = montantePrincipal + montanteAportes;
  const totalAporte = valorInicial + aporteMensal * meses;
  const rendimento = montante - totalAporte;
  const taxaImposto = getImpostoPorDias(dias);
  const imposto = rendimento * taxaImposto;
  const liquido = rendimento - imposto;
  return {
    montante,
    totalAporte,
    rendimento,
    taxaImposto,
    imposto,
    liquido,
    meses,
    dias,
    taxaMensal,
    montantePrincipal,
    montanteAportes,
  };
}

export function jurosCompostosComImpostoAutomatico(valorInicial, aporteMensal, taxaAnual, periodo, unidade) {
  return jurosCompostosFixosComImposto(valorInicial, aporteMensal, taxaAnual, periodo, unidade);
}

// Fluxo de caixa: soma entradas - soma saídas
export function fluxoCaixa(entradas, saidas) {
  const totalEntradas = entradas.reduce((acc, val) => acc + val, 0);
  const totalSaidas = saidas.reduce((acc, val) => acc + val, 0);
  return totalEntradas - totalSaidas;
}