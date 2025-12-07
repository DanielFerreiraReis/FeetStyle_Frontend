export const camposClientePF = [
    { key: "nome", label: "Nome", required: true },
    { key: "telefone", label: "Telefone", required: true },
    { key: "email", label: "Email", required: true },
    { key: "status", label: "Status", required: true },

    // PF específicos
    { key: "cpf", label: "CPF", required: true },
    { key: "sexo", label: "Sexo", required: true },
    { key: "dataNascimento", label: "Data de Nascimento", type: "date", required: true }
];

export const camposClientePJ = [
    { key: "nome", label: "Razão Social", required: true },
    { key: "telefone", label: "Telefone", required: true },
    { key: "email", label: "Email", required: true },
    { key: "status", label: "Status", required: true },

    // PJ específicos
    { key: "cnpj", label: "CNPJ", required: true },
    { key: "dataFundacao", label: "Data de Fundação", type: "date", required: true },
    { key: "areaAtuacao", label: "Área de Atuação", required: true }
];