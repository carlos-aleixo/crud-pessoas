import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { useState, useRef } from 'react';
import { useAppContext } from './provider';

/**
 * Este componente representa o formulário que permite ao 
 * usuário fornecer um nome para cadastrar uma pessoa na
 * lista de pessoas.
 */
export default function Formulario() {
  const [nome, setNome] = useState();
  const { adicionarPessoa } = useAppContext();

  /**
   * Uma referência para acessar o input e definir
   * o foco de forma programática
   */
  const nomeRef = useRef();

  /**
   * Esta função utiliza o nome fornecido como entrada no input
   * e chama o método `adicionarPessoa()` para cadastrar uma pessoa.
   * Além disso, ao adicionar, limpa o input e mantém o foco nele.
   */
  const onPressSalvar = () => {
    if (nome.length != 0) {
      adicionarPessoa(nome.trim());
      setNome('');
      if (Platform.OS == "web") {
        nomeRef.focus();
      }
    }
  };

  return (
    <View>
      <Card mode="contained">
        <Card.Content>
          <SafeAreaView style={{height:55}}>
          <TextInput
            ref={nomeRef}
            label="Nome"
            style={styles.input_nome}
            value={nome}
            onChangeText={(text) => setNome(text)}
            onSubmitEditing={onPressSalvar}
            mode="outlined"
            right={
              <TextInput.Icon icon="check-circle" onPress={onPressSalvar} />
            }
          />
          </SafeAreaView>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  input_nome: {
    flex: 1,
    flexGrow: 1,
    borderTopEndRadius: 0,
    borderEndEndRadius: 0,
    borderRadius: 0,
  },
});