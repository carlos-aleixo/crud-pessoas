import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Modal, View, Dimensions } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

const BotaoSobre = ({ sobreConteudo }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Appbar.Action icon="help-circle" size={32} />
      </TouchableOpacity>

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
              O Formulário deve ser preenchido e assim que o botão de check for selecionado estará no nosso "banco de dados fake". {'\n'}<Button icon="check-circle" mode="contained" onPress={() => {}} style={styles.roundedIcon} />
              {'\n'}
              Em caso de edição, o botão com símbolo de lápis já está aparente. {'\n'}<Button icon="pencil-outline" mode="contained" onPress={() => {}} style={styles.roundedIcon} />
              {'\n'}
              Em caso de exclusão, o botão com símbolo de lixeira aparecerá assim que selecionar o nome. {'\n'}<Button icon="trash-can-outline" mode="contained" onPress={() => {}} style={styles.roundedIcon} />
              {'\n'}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        {/* Botão vai sempre no canto superior */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Alinha a modal ao final da tela
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%', // Largura da modal é 100% da largura da tela
  },
  roundedIcon: {
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default BotaoSobre;
