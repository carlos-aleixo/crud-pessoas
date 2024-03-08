import { StyleSheet, SafeAreaView, Modal, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Appbar,
  Snackbar,
  Button,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useState } from 'react';

import { AppProvider } from './componentes/provider';
import Lista from './componentes/lista';
import Formulario from './componentes/Formulario';
import BotaoSobre from './componentes/Sobre'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  const [notificacaoVisivel, setNotificacaoVisivel] = useState(false);
  const onDismissNotificacao = () => setNotificacaoVisivel(false);
  const onAdicionarPessoa = () => setNotificacaoVisivel(true);
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <AppProvider
          onAdicionarPessoa={onAdicionarPessoa}
          onSelecionarPessoa={(pessoa) => console.log('selecionado', pessoa)}
          onRemoverPessoa={(pessoa) => console.log('removido', pessoa)}
        >
          <SafeAreaView style={styles.container}>
            <Appbar.Header>
              <Appbar.Content title="Cadastro de pessoas" />
              <BotaoSobre sobreConteudo={(setModalVisible) => {false}} />
            </Appbar.Header>
            <Formulario />
            <Lista />

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
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
