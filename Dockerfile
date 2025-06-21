# Estágio 1: Builder - Onde as dependências são instaladas
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de definição de pacotes
COPY package*.json ./

# Instala as dependências de produção de forma otimizada
# --omit=dev garante que pacotes como 'dotenv' não sejam instalados na imagem final
RUN npm ci --omit=dev

# Copia o resto do código-fonte da aplicação
COPY . .

# ---

# Estágio 2: Runner - A imagem final e otimizada
FROM node:20-alpine

WORKDIR /app

# Cria um usuário e grupo específicos para a aplicação por segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copia os arquivos do estágio 'builder'
# Isso inclui o código-fonte e a pasta node_modules já instalada
COPY --from=builder /app .

# Define o usuário que rodará a aplicação
USER appuser

# Expõe a porta que a aplicação vai escutar dentro do container.
# O Easypanel irá mapear esta porta para a porta 80/443 do mundo exterior.
EXPOSE 3333

# O comando para iniciar a aplicação quando o container rodar
CMD ["node", "src/index.js"] 