import { useState, useContext, createContext } from 'react';

const AppContext = createContext();

/**
 * Este componente funciona como o provider do contexto `AppContext`.
 * 
 * São fornecidos estes recursos:
 * * a lista de pessoas
 * * uma função para adicionar uma pessoa na lista
 * * uma função para remover uma pessoa da lista
 * * um evento de pessoa adicionada
 * * um evento de pessoa removida
 * * um evento de pessoa selecionada
 */
export function AppProvider({
  children,
  onAdicionarPessoa,
  onSelecionarPessoa,
  onRemoverPessoa,
}) {
  const [pessoas, setPessoas] = useState([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState();

  /**
   * Esta função recebe um parâmetro `nome`, cria um objeto 
   * com `id` igual ao timestamp atual e o adiciona
   * na lista de pessoas. 
   * 
   * Dispara o evento `onAdicionarPessoa`.
   * 
   * @param nome String
   */
  const adicionarPessoa = (nome) => {
    const id = new Date().getTime();
    const pessoa = { id, nome };
    const lista = [...pessoas, pessoa];
    setPessoas(lista);
    if (onAdicionarPessoa) {
      onAdicionarPessoa(pessoa);
    }
  };

  /**
   * Esta função recebe um parâmetro `pessoa`, identifica
   * o item correspondente na lista de pessoas e,
   * se for encontrado, o remove da lista.
   * 
   * Dispara o evento `onRemoverPessoa`.
   * 
   * @param pessoa `{id, nome}`
   */
  const removerPessoa = (pessoa) => {
    const lista = pessoas.filter((p) => p.id != pessoa.id);
    setPessoas(lista);
    if (pessoaSelecionada?.id == pessoa.id) {
      setPessoaSelecionada(null);
    }
    if (onRemoverPessoa) {
      onRemoverPessoa(pessoa);
    }
  };

  /**
   * Esta função recebe um parâmetro `pessoa` e determina
   * que o item correspondente na lista de pessoas está selecionado.
   * 
   * Dispara o evento `onSelecionarPessoa`
   */
  const selecionarPessoa = (pessoa) => {
    if (pessoaSelecionada?.id == pessoa.id) {
      setPessoaSelecionada(null);
    } else {
      setPessoaSelecionada(pessoa);
    }
    if (onSelecionarPessoa) {
      onSelecionarPessoa(pessoa);
    }
  };

  return (
    <AppContext.Provider
      value={{
        pessoas,
        adicionarPessoa,
        removerPessoa,
        selecionarPessoa,
        pessoaSelecionada,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
