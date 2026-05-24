FROM node:20-alpine
WORKDIR /app

# Копируем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем остальной код
COPY . .

# Прокидываем переменные (если нужны при сборке)
ARG NEXT_PUBLIC_API_URL=http://188.127.227.168:5000/
ARG NEXT_PUBLIC_GET_FILE=https://files.dilpur.tj/
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GET_FILE=$NEXT_PUBLIC_GET_FILE

# Собираем проект
RUN npm run build

EXPOSE 3000

# Запускаем сервер
CMD ["npm", "start"]
