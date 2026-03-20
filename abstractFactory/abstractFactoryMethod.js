class MetodoPagamento {
    executar(valor) {
        throw new Error("Implementar executar()");
    }
}

class Credito extends MetodoPagamento {}
class Fatura extends MetodoPagamento {}

class CreditoNubank extends Credito {
    executar(valor) {
        console.log(`R$${valor} pago no crédito Nubank`);
    }
}

class FaturaNubank extends Fatura {
    executar(valor) {
        console.log(`R$${valor} pago via fatura Nubank`);
    }
}

class CreditoSantander extends Credito {
    executar(valor) {
        console.log(`R$${valor} pago no crédito Santander`);
    }
}

class FaturaSantander extends Fatura {
    executar(valor) {
        console.log(`R$${valor} pago via fatura Santander`);
    }
}

class InstituicaoFactory {
    criarCredito() {
        throw new Error("Implementar criarCredito()");
    }
    criarFatura() {
        throw new Error("Implementar criarFatura()");
    }
}

class NubankFactory extends InstituicaoFactory {
    criarCredito() {
        return new CreditoNubank();
    }
    criarFatura() {
        return new FaturaNubank();
    }
}

class SantanderFactory extends InstituicaoFactory {
    criarCredito() {
        return new CreditoSantander();
    }
    criarFatura() {
        return new FaturaSantander();
    }
}

class SistemaPagamento {
    constructor(factory) {
        this.factory = factory;
    }

    pagarCredito(valor) {
        const metodo = this.factory.criarCredito();
        metodo.executar(valor);
    }

    pagarFatura(valor) {
        const metodo = this.factory.criarFatura();
        metodo.executar(valor);
    }
}

function selecionarInstituicao(nome) {
    if (nome === "nubank") return new NubankFactory();
    if (nome === "santander") return new SantanderFactory();
    throw new Error("Instituição inválida");
}

const factory = selecionarInstituicao("nubank");
const sistema = new SistemaPagamento(factory);

sistema.pagarCredito(150);
sistema.pagarFatura(300);