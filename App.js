import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView } from 'react-native';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');

  const DOLAR_COTACAO = 5.25;

  const converter = (operation) => { 
    const valorNumerico = parseFloat(inputValue.replace(',','.')); // pega o texto input, troca virgula por ponto
    if(isNaN(valorNumerico)){
      setResultValue('Entrada inválida!'); //se o valor nao for um numero mostra um aviso e para a função
      return;
    }
    let resultado; 

    switch(operation){  //escolhe a formula certa baseada no botao que foi clicado 
      case 'm-cm':
        resultado = valorNumerico * 100;
        setResultValue(resultado + ' cm');
        break;
        
      case 'km-m':
        resultado = valorNumerico * 1000;
        setResultValue(resultado + ' m');
        break;
      
      case 'c-f':
        resultado = (valorNumerico * 9/5) + 32;
        setResultValue(resultado.toFixed(2) + ' °F');
        break;

      case 'usd-brl':
        resultado = valorNumerico * DOLAR_COTACAO;
        setResultValue(resultado.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'}));
        break;
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={estilo.container}>
      <Text style={estilo.titulo}> Conversor de Unidade</Text>
      
      {/*input para digitar o valor */}
      <TextInput 
       placeholder='Digite o valor aqui'
       style={estilo.input}
       keyboardType='numeric'
       onChangeText={texto => setInputValue(texto)}
      />
      <View style={estilo.botoesContainer}> 
        <Button title="Metros -> Centímetros" onPress={()=> converter('m-cm')}/>
          <View style={{marginTop: 10}} />
        <Button title="Quilômetros -> Metros" onPress={()=> converter('km-m')}/>
          <View style={{marginTop: 10}} />
        <Button title="Celsius -> Fahrenheit" onPress={()=> converter('c-f')}/>
          <View style={{marginTop: 10}} />
        <Button title="Dólares -> Reais" onPress={()=> converter('usd-brl')}/>
      </View>
      <TextInput 
       placeholder='Resultado'
       style={[estilo.input, estilo.resultado]}
       editable={false}
       value={resultValue}
      />
    </KeyboardAvoidingView>    
  );
}

const estilo = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9', 
    alignItems: 'center',
    justifyContent: 'center',
  },
   titulo: {
    fontSize: 28, 
    color: '#1e293b', 
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  input: {
    backgroundColor: '#ffffff', 
    width: '80%', 
    padding: 10,
    marginTop: 15,
    borderColor: '#cbd5e1', 
    borderWidth: 1,
    borderRadius: 10, 
    fontSize: 18,
    textAlign: 'center',
  },
  botoesContainer: {
    width: '80%',
    marginTop: 30, 
  },
  resultado: {
    marginTop: 30,
    backgroundColor: '#e2e8f0', 
    color: '#0f172a', 
    fontWeight: 'bold',
  }
});
