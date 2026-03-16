import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { jurosCompostosComImpostoAutomatico } from './calc';

export default function Entrada() {
  const [valorInicial, setValorInicial] = useState('0');
  const [taxaAnual, setTaxaAnual] = useState('');
  const [aporte, setAporte] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [unidade, setUnidade] = useState('anos');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const v0 = parseFloat(valorInicial);
    let i = parseFloat(taxaAnual);
    const p = parseFloat(aporte);
    const t = parseFloat(periodo);

    if (!isFinite(v0) || !isFinite(i) || !isFinite(p) || !isFinite(t)) {
      setResultado({ error: 'Por favor preencha todos os valores numéricos corretamente.' });
      return;
    }

    if (i > 1) i = i / 100; // aceita 12 ou 0.12

    const res = jurosCompostosComImpostoAutomatico(v0, p, i, t, unidade);
    setResultado(res);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juros Compostos</Text>
      <Text style={styles.subtitle}>Informe as variáveis abaixo</Text>

      <Text style={styles.label}>Valor inicial (VP)</Text>
      <TextInput style={styles.input} value={valorInicial} onChangeText={setValorInicial} keyboardType="numeric" placeholder="0" placeholderTextColor="#888" />

      <Text style={styles.label}>Taxa de juros a.a (ex: 12 ou 0.12)</Text>
      <TextInput style={styles.input} value={taxaAnual} onChangeText={setTaxaAnual} keyboardType="numeric" placeholder="12" placeholderTextColor="#888" />

      <Text style={styles.label}>Aporte mensal</Text>
      <TextInput style={styles.input} value={aporte} onChangeText={setAporte} keyboardType="numeric" placeholder="1000" placeholderTextColor="#888" />

      <Text style={styles.label}>Período</Text>
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.inputFlex]} value={periodo} onChangeText={setPeriodo} keyboardType="numeric" placeholder="12" placeholderTextColor="#888" />
        <Pressable style={[styles.unitButton, unidade === 'anos' && styles.unitSelected]} onPress={() => setUnidade('anos')}>
          <Text style={styles.unitText}>Anos</Text>
        </Pressable>
        <Pressable style={[styles.unitButton, unidade === 'meses' && styles.unitSelected]} onPress={() => setUnidade('meses')}>
          <Text style={styles.unitText}>Meses</Text>
        </Pressable>
      </View>

      <View style={styles.tableCard}>
        <Text style={styles.tableTitle}>Base de imposto de receita</Text>
        <Text style={styles.tableRow}>Até 180 dias: 22,5%</Text>
        <Text style={styles.tableRow}>De 181 a 360 dias: 20%</Text>
        <Text style={styles.tableRow}>De 361 a 720 dias: 17,5%</Text>
        <Text style={styles.tableRow}>Acima de 720 dias: 15%</Text>
      </View>

      <Pressable style={styles.button} onPress={calcular}>
        <Text style={styles.buttonText}>Calcular</Text>
      </Pressable>

      {resultado && resultado.error && <Text style={styles.error}>{resultado.error}</Text>}
      {resultado && !resultado.error && (
        <View style={styles.resultsContainer}>
              <Text style={styles.result}>Montante final: R$ {resultado.montante.toFixed(2)}</Text>
          <Text style={styles.result}>VP aplicado: R$ {parseFloat(valorInicial || 0).toFixed(2)}</Text>
          <Text style={styles.result}>Total aportado: R$ {resultado.totalAporte.toFixed(2)}</Text>
          <Text style={styles.result}>Rendimento: R$ {resultado.rendimento.toFixed(2)}</Text>
          <Text style={styles.result}>Dias: {resultado.dias.toFixed(0)}</Text>
          <Text style={styles.result}>Imposto ({(resultado.taxaImposto * 100).toFixed(1)}%): R$ {resultado.imposto.toFixed(2)}</Text>
          <Text style={[styles.result, styles.final]}>Rendimento líquido: R$ {resultado.liquido.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#CCCCCC',
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFlex: {
    flex: 1,
    marginRight: 8,
  },
  unitButton: {
    backgroundColor: '#222',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 6,
  },
  unitSelected: {
    backgroundColor: '#00BFFF',
    borderColor: '#00BFFF',
  },
  unitText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#00BFFF',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  error: {
    color: '#ff6666',
    marginTop: 12,
  },
  resultsContainer: {
    marginTop: 20,
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 12,
  },
  tableCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    marginTop: 12,
  },
  tableTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 6,
  },
  tableRow: {
    color: '#CCCCCC',
    marginBottom: 2,
  },
  result: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 6,
  },
  final: {
    color: '#7CFC00',
    marginTop: 8,
    fontWeight: 'bold',
  },
});