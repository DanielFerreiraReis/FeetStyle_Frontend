export const camposFuncionario = [
  { 
    type: "text", 
    key: "nome", 
    label: "Nome completo"
  },

  { 
    type: "cpf",
    key: "cpf",
    label: "CPF"
  },

  { 
    type: "telefone", 
    key: "telefone", 
    label: "Telefone"
  },
  
  { 
    type: "email",
    key: "email", 
    label: "E-mail"
  },
  
  {
    type: "select",
    key: "status",
    label: "Status",
    options: [
      { value: 1, texto: "Ativo" },
      { value: 0, texto: "Inativo" },
    ],
  },

  {
    type: "select",
    key: "cargo",
    label: "Cargo",
    options: [
      { value: "Atendente", texto: "Atendente" },
      { value: "Vendedor", texto: "Vendedor" },
    ],
  },
  
  { 
    type: "dataCustom",
    placeholder: "Data",
    key: "dataAdmissao", 
    label: "Data de Admissão"
  },
  
  { 
    type: "number", 
    key: "salario", 
    label: "Salário (R$)",
    step: "0.01" 
  },
  
  {
    type: "select",
    key: "role",
    label: "Nível de Acesso",
    options: [
      { value: 0, texto: "Funcionário" },
      { value: 1, texto: "Administrador" },
    ],
  },
];
