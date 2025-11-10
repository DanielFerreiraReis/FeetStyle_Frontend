export const campos = [
  { 
    type: "text", 
    key: "nome", 
    placeholder: "Nome completo",
    label: "Nome completo"
  },

  { 
    type: "cpf",
    key: "cpf",
    placeholder: "CPF",
    label: "CPF"
  },

  { 
    type: "telefone", 
    key: "telefone", 
    placeholder: "Telefone",
    label: "Telefone"
  },
  
  { 
    type: "email",
    key: "email", 
    placeholder: "E-mail",
    label: "E-mail"
  },
  
  {
    type: "select",
    key: "status",
    placeholder: "Status",
    label: "Status",
    options: [
      { value: 1, label: "Ativo" },
      { value: 0, label: "Inativo" },
    ],
  },

  {
    type: "select",
    key: "cargo",
    placeholder: "Cargo",
    label: "Cargo",
    options: [
      { value: "Atendente", label: "Atendente" },
      { value: "Vendedor", label: "Vendedor" },
    ],
  },
  
  { 
    type: "date",
    key: "dataAdmissao", 
    placeholder: "Data de Admissão",
    label: "Data de Admissão"
  },

  {   
    type: "date",
    key: "dataDemissao", 
    placeholder: "Data de Demissão",
    label: "Data de Demissão"
  },
  
  { 
    type: "number", 
    key: "salario", 
    placeholder: "Salário (R$)",
    label: "Salário (R$)",
    step: "0.01" 
  },
  
  {
    type: "select",
    key: "role",
    placeholder: "Nível de Acesso",
    label: "Nível de Acesso",
    options: [
      { value: 0, label: "Funcionário" },
      { value: 1, label: "Administrador" },
    ],
  },
];
