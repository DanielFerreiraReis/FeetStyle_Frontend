export const camposEndereco = [
    {
        type: "text",
        key: "rua",
        label: "Rua"
    },

    {
        type: "number",
        key: "numCasa",
        label: "Número"
    },

    {
         type:"text",
         key: "bairro",
         label:"Bairro"
    },

    {
        type: "cep",
        key: "cep",
        label: "Cep"
    },

    {
        type: "text",
        key: "cidade",
        label: "Cidade"
    },

    {
        type:"text",
        key: "detalhamento",
        label: "Detalhamento (complemento)"
    },

    {
        type: "select",
        key: "estado",
        label: "Estado (UF)",
        options:[

            { value: "AC", texto: "Acre" },
            { value: "AL", texto: "Alagoas" },
            { value: "AP", texto: "Amapá" },
            { value: "AM", texto: "Amazonas" },
            { value: "BA", texto: "Bahia" },
            { value: "CE", texto: "Ceará" },
            { value: "DF", texto: "Distrito Federal" },
            { value: "ES", texto: "Espírito Santo" },
            { value: "GO", texto: "Goiás" },
            { value: "MA", texto: "Maranhão" },
            { value: "MT", texto: "Mato Grosso" },
            { value: "MS", texto: "Mato Grosso do Sul" },
            { value: "MG", texto: "Minas Gerais" },
            { value: "PA", texto: "Pará" },
            { value: "PB", texto: "Paraíba" },
            { value: "PR", texto: "Paraná" },
            { value: "PE", texto: "Pernambuco" },
            { value: "PI", texto: "Piauí" },
            { value: "RJ", texto: "Rio de Janeiro" },
            { value: "RN", texto: "Rio Grande do Norte" },
            { value: "RS", texto: "Rio Grande do Sul" },
            { value: "RO", texto: "Rondônia" },
            { value: "RR", texto: "Roraima" },
            { value: "SC", texto: "Santa Catarina" },
            { value: "SP", texto: "São Paulo" },
            { value: "SE", texto: "Sergipe" },
            { value: "TO", texto: "Tocantins" }
        ]
    }


];