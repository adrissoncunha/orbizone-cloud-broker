# ⚡ OrbiZone Cloud Infrastructure (Broker SaaS)
> **Plataforma transacional full-stack de provisionamento automatizado de Virtual Private Servers (VPS) com múltiplos gateways de pagamento e telemetria remota via SSH.**

![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Mongoose-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![MercadoPago](https://img.shields.io/badge/Gateway-Mercado%20Pago%20Bricks-009EE3?style=flat-square)
![Plisio](https://img.shields.io/badge/Crypto-Plisio%20Gateway-627EEA?style=flat-square)

---

## 🚀 Visão Geral da Arquitetura
O **OrbiZone** é um motor SaaS projetado para gerenciar o ciclo de vida de instâncias em nuvem, desde o checkout financeiro transacional até o controle de energia e monitoramento de recursos em tempo real.

### Destaques Técnicos & Módulos Implementados:
1. **Orquestração DevOps via SSH (`ssh2`):** Conexão direta com nós hipervisores remotos para execução segura de comandos de reinicialização (`reboot`), desligamento e varredura de consumo de CPU/RAM em tempo real.
2. **Checkout Transparente Multi-Gateway:**
   - **PIX White-Label:** Geração dinâmica de QR Code em Base64 integrada à API do Mercado Pago sem redirecionamento externo.
   - **Cartão de Crédito (MP Bricks):** Tokenização segura de cartões com suporte a chaves de idempotência (`X-Idempotency-Key`).
   - **Criptomoedas (Plisio):** Faturas automatizadas em BTC, USDT, LTC e SOL com validação via Webhook seguro.
3. **Segurança de Dados Corporativos:** Criptografia simétrica (AES-256) aplicada em repouso para credenciais sensíveis (senhas root) armazenadas no banco de dados.
4. **Sistema de Afiliados Multinível:** Cálculo automático de comissões de indicação (5%) creditadas em tempo real após a compensação do primeiro pagamento.

---

## 🎥 Demonstração Prática (Walkthrough)
Assista à apresentação completa da plataforma no YouTube:
👉 [Orbizone - Apresentação Oficial](https://www.youtube.com/watch?v=txwKghbcIwY)
