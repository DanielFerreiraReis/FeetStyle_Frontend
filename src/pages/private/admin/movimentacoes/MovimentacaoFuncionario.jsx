import { useState, useEffect } from "react";
import styles from "../../../../styles/subRotesCss/MovimentacoesFuncionarios.module.css"
import ModalUpdate from "../.././../../UI/ModalUpdate";;

const MovimentacaoFuncionario = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);

  // Exemplo de fetch inicial
  useEffect(() => {
    // Aqui você faria a chamada real para sua API
    // fetch("/api/funcionarios")
    //   .then(res => res.json())
    //   .then(data => setFuncionarios(data));

    // Mock para teste
    setFuncionarios([
      { 
        id: 1, 
        nome: "João Silva", 
        status: 1, 
        cargo: "Vendedor", 
        role: 0, 
        salario: 2500, 
        cpf: "12345678901", 
        rua: "Rua A", 
        cidade: "Tucuruí", 
        estado: "PA", 
        theme: "Dark",
        foto: "https://via.placeholder.com/80" 
      },
      { 
        id: 2, 
        nome: "Maria Souza", 
        status: 0, 
        cargo: "Gerente", 
        role: 1, 
        salario: 4500, 
        cpf: "98765432100", 
        rua: "Rua B", 
        cidade: "Belém", 
        estado: "PA", 
        theme: "Light",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL2avXjcxx__TgNLmHDJcnZvlzguI-j-WIYQ&s" 
      }
    ]);
  }, []);

  const handleStatusToggle = (id) => {
    setFuncionarios(prev =>
      prev.map(f =>
        f.id === id ? { ...f, status: f.status ? 0 : 1 } : f
      )
    );
  };

  return (
    <div className={styles.container}>
      <h2>Funcionários</h2>
      <ul className={styles.list}>
        {funcionarios.map(f => (
          <li key={f.id} className={`${styles.listItem} ${!f.status ? styles.inativo : ""}`}>
            <div className={styles.info}>
              <img src={f.foto} alt={f.nome} className={styles.foto} />
              <span>{f.nome} — {f.status ? "Ativo" : "Inativo"}</span>
            </div>
            <div className={styles.actions}>
              <button onClick={() => setSelectedFuncionario(f)}>Editar</button>
              <button onClick={() => handleStatusToggle(f.id)}>
                {f.status ? "Inativar" : "Ativar"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ModalUpdate
          isOpen={!!selectedFuncionario}
          onClose={() => setSelectedFuncionario(null)}
          entity="Funcionario"
          data={selectedFuncionario}
          onSave={(updated) => {
            setFuncionarios(prev =>
              prev.map(f => f.id === updated.id ? updated : f)
            );
            console.log("Salvar funcionário:", updated);
          }}
          fields={[
            { name: "nome", label: "Nome", type: "text" },
            { name: "cargo", label: "Cargo", type: "text" },
            { name: "role", label: "Role", type: "select", options: [
              { value: 0, label: "Funcionário" },
              { value: 1, label: "Admin" }
            ]},
            { name: "salario", label: "Salário", type: "number" },
            { name: "cpf", label: "CPF", type: "text" },
            { name: "rua", label: "Rua", type: "text" },
            { name: "cidade", label: "Cidade", type: "text" },
            { name: "estado", label: "Estado", type: "text" },
            { name: "theme", label: "Tema", type: "select", options: [
              { value: "Dark", label: "Dark" },
              { value: "Light", label: "Light" }
            ]},
            { name: "foto", label: "Foto", type: "file" } // agora usando o contexto para upload
          ]}
        />
    </div>
  );
};

export default MovimentacaoFuncionario;