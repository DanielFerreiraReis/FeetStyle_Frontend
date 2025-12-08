export const camposFuncionario = [
  { 
    type: "text", 
    key: "nome", 
    label: "Nome completo",
    required: true
  },

  { 
    type: "cpf",
    key: "cpf",
    label: "CPF",
    required: true
  },

  { 
    type: "telefone", 
    key: "telefone", 
    label: "Telefone",
    required: true
  },
  
  { 
    type: "email",
    key: "email", 
    label: "E-mail",
    required: true
  },
  
  {
    type: "select",
    key: "status",
    label: "Status",
    required: true,
    options: [
      { value: 1, texto: "Ativo" },
      { value: 0, texto: "Inativo" },
    ],
  },

  {
    type: "select",
    key: "cargo",
    label: "Cargo",
    required: true,
    options: [
      { value: "Atendente", texto: "Atendente" },
      { value: "Vendedor", texto: "Vendedor" },
    ],
  },
  
  { 
    type: "dataCustom",
    placeholder: "Data",
    key: "dataAdmissao", 
    label: "Data de Admissão",
    required: true
  },
  
  { 
    type: "number", 
    key: "salario", 
    label: "Salário (R$)",
    step: "0.01",
    required: true
  },
  
  {
    type: "select",
    key: "role",
    label: "Nível de Acesso",
    required: true,
    options: [
      { value: 0, texto: "Funcionário" },
      { value: 1, texto: "Administrador" },
    ],
  },
];