import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Modal, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar, Snackbar, Button } from 'react-native-paper'; // Importando Button e TextInput
import { AppProvider } from './componentes/provider';
import Lista from './componentes/lista';
import Formulario from './componentes/Formulario';

export default function App() {
  const [notificacaoVisivel, setNotificacaoVisivel] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onDismissNotificacao = () => setNotificacaoVisivel(false);
  const onAdicionarPessoa = () => setNotificacaoVisivel(true);

  return (
    <SafeAreaProvider>
      <AppProvider
        onAdicionarPessoa={onAdicionarPessoa}
        onSelecionarPessoa={(pessoa) => console.log('selecionado', pessoa)}
        onRemoverPessoa={(pessoa) => console.log('removido', pessoa)}
      >
        <SafeAreaView style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="Cadastro de pessoas" />
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
              <Appbar.Action icon="help-circle" size={32} />
            </TouchableOpacity>
          </Appbar.Header>
          <Formulario />
          <Lista />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>
                  App para cadastro de pessoas
                  {'\n'}
                  {'\n'}
                  O Formulário deve ser preenchido e assim que o botão de check for selecionado estará no nosso "banco de dados fake"
                  {'\n'}
                  {'\n'}
                  Em caso de edição, o botão com símbolo de lápis já está aparente. {'\n'}<Button icon="pencil" mode="contained" onPress={() => {}} style={styles.roundedIcon} />
                  {'\n'}
                  {'\n'}
                  Em caso de exclusão, o botão com símbolo de lixeira aparecerá assim que selecionar o nome. {'\n'}<Button icon="delete" mode="contained" onPress={() => {}} style={styles.roundedIcon} />
                  {'\n'}
                  {'\n'}
                  O botão com símbolo de marca de seleção será usado para confirmar a ação. {'\n'}<Button icon="check" mode="contained" onPress={() => {}} style={styles.roundedIcon} />
                  {'\n'}
                  {'\n'}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Snackbar
            visible={notificacaoVisivel}
            onDismiss={onDismissNotificacao}
            action={{
              label: 'OK',
            }}
          >
            Cadastro realizado com sucesso!
          </Snackbar>
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    padding: 8, // Ajuste o preenchimento conforme necessário
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignSelf: 'center',
  },
  roundedIcon: {
    borderRadius: 25, // Ajuste o valor conforme necessário para tornar o ícone redondo
    overflow: 'hidden', // Para garantir que o conteúdo dentro do botão seja cortado corretamente
  },
});
