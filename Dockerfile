# Dependencias de produccion
FROM node:19.2-alpine3.16 as prod-deps
# cd app
WORKDIR /app
# copiar package.json
COPY package.json ./
# instalar las dependencias de produccion
RUN npm install --prod


# Runner
FROM node:19.2-alpine3.16 as runner
# cd app
WORKDIR /app
# copiar dependencias de produccion
COPY --from=prod-deps /app/node_modules ./node_modules
# copiar archivos de la app
COPY ./ ./
# compilar typescript
RUN npm run build 
# comando run de la imagen
CMD [ "node", "dist/app.js" ]