declare module "faker-br" {
    const fakerBr: {
        br: {
            cpf(): string;
            cnpj(): string;
            rg(): string;
        };
    };

    export default fakerBr;
}