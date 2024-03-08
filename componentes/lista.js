import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import {
  List,
  Text,
  IconButton,
  Divider,
  useTheme,
  Modal,
  Portal,
  Button,
  TextInput,
  Avatar
} from 'react-native-paper';
import { useAppContext } from './provider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

/**
 * Este componente apresenta a lista de pessoas cadastradas.
 *
 * Cada item da lista, ao ser selecionado, apresenta um retorno
 * visual, para indicar que o item está selecionado, e
 * um botão que permite excluir o item da lista de pessoas.
 */
export default function Lista() {
  const { pessoas, pessoaSelecionada, selecionarPessoa, removerPessoa, editarPessoa } =
    useAppContext();

  const { colors, isV3 } = useTheme();
  const safeArea = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const confirmarExclusao = () => {
    removerPessoa(pessoaSelecionada);
    setModalVisible(false);
  };

  const cancelarExclusao = () => {
    setModalVisible(false);
  };

  const confirmarEdicao = () => {
    editarPessoa(pessoaSelecionada, editingName);
    setEditModalVisible(false);
  };

  const cancelarEdicao = () => {
    setEditModalVisible(false);
  };

  /**
   * Esta função é utilizada para renderizar um item da lista.
   * Se o item da lista estiver selecionado, então adota
   * uma cor de fundo diferente. Além disso, se o item
   * estiver selecionado, apresenta um botão que permite
   * excluir da lista de pessoas.
   */
  const renderItem = ({ item }) => {

    const selecionado = item.id == pessoaSelecionada?.id;

    const BotaoRemover = () => (
      <IconButton
        icon="trash-can-outline"
        mode="contained"
        onPress={() => setModalVisible(true)}
      />
    );

    const BotaoEditar = () => (
      <IconButton
        icon="pencil-outline"
        mode="contained"
        onPress={() => { setEditingName(item.nome); setEditModalVisible(true); }}
      />
    );

    const nomeParts = item.nome.split(' ');
    const primeiroNome = nomeParts[0];
    const ultimoSobrenome = nomeParts[nomeParts.length - 1];
    const avatarLabel = (primeiroNome[0] + (nomeParts.length > 1 ? ultimoSobrenome[0] : '')).toUpperCase();

    return (
      <List.Item
        title={item.nome}
        style={selecionado && styles.item_selecionado}
        onPress={() => selecionarPessoa(item)}
        left={() => (
          <View style={styles.avatarRow}>
            <Avatar.Text size={40} label={avatarLabel}/>
          </View>
        )}
        right={(props) => (
          <View style={styles.buttonsRow}>
            {selecionado && <BotaoRemover {...props} />}
            {selecionado && <BotaoEditar {...props} />}
          </View>
        )}
      ></List.Item>
    );
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>
          <View style={styles.cabecalho}>
            <Text style={styles.cabecalho_titulo} variant="bodyLarge">
              Pessoas cadastradas
            </Text>
            {pessoas?.length > 0 && (
              <Text variant="bodySmall">
                Pressione um item da lista para selecionar e outra vez para
                remover a seleção ou editar a seleção
              </Text>
            )}
          </View>
        </List.Subheader>
      </List.Section>
      <FlatList
        data={pessoas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={() => (
          <Text variant="bodyMedium" style={styles.lista_mensagem_vazio}>
            Nenhuma pessoa cadastrada até o momento
          </Text>
        )}
      />

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <View>
            <Text>Deseja realmente excluir?</Text>
            <Button onPress={confirmarExclusao}>Sim</Button>
            <Button onPress={cancelarExclusao}>Cancelar</Button>
          </View>
        </Modal>
        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <View>
            <TextInput
              value={editingName}
              onChangeText={setEditingName}
              placeholder="Novo nome"
            />
            <Button onPress={confirmarEdicao}>Salvar</Button>
            <Button onPress={cancelarEdicao}>Cancelar</Button>
          </View>
        </Modal>
      </Portal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 200 },
  lista_mensagem_vazio: { marginHorizontal: 16 },
  cabecalho: {
    flex: 1,
    flexDirection: 'column',
  },
  cabecalho_titulo: {
    fontWeight: 'bold',
  },
  item_selecionado: {
    backgroundColor: 'lightgray',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  avatarRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 16
  }
});