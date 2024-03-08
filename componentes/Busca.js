import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';

export default function Busca({ pessoas, setPessoasFiltradas }) {
  const [textoBusca, setTextoBusca] = useState('');

  useEffect(() => {
    const filtro = pessoas.filter((pessoa) =>
      pessoa.nome.toLowerCase().includes(textoBusca.toLowerCase())
    );
    setPessoasFiltradas(filtro);
  }, [textoBusca, pessoas]);

  return (
    <TextInput
      style={{ padding: 10, backgroundColor: '#f5f5f5' }}
      placeholder="Digite para buscar..."
      value={textoBusca}
      onChangeText={(text) => setTextoBusca(text)}
    />
  );
}