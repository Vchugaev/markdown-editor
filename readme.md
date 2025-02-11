# Markdown Editor

Markdown Editor - это веб-приложение для создания и редактирования Markdown и других документов. Фронтенд построен с использованием Vite, а бэкенд реализован на Express с базой данных MongoDB.

## Структура проекта

- **markdown/** - Фронтенд (Vite, React)
- **server/** - Бэкенд (Express, MongoDB)
  - **config/** - Настройки подключения к базе данных

## Установка и запуск

### 1. Клонирование репозитория
```sh
git clone <repository-url>
cd <project-folder>
```

### 2. Установка зависимостей
#### Фронтенд
```sh
cd markdown
npm install
```

#### Бэкенд
```sh
cd ../server
npm install
```

### 3. Настройка переменных окружения
#### Фронтенд
Создайте файл `.env` в папке `markdown` и укажите URL сервера:
```sh
VITE_SERVER_API=http://localhost:5000
```

#### Бэкенд
Создайте файл `.env` в папке `server/config/config.env` с настройками подключения к базе данных:
```sh
URI=mongodb://localhost:27017/test
PORT="5000"
SECRET_KEY=your_secret_key
JWT_EXPIRE=7d
```

### 4. Запуск проекта
#### Бэкенд
```sh
cd server
npm start
```

#### Фронтенд
```sh
cd ../markdown
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:5173`

## Основные функции
- Аутентификация пользователей с JWT
- Создание и редактирование Markdown-файлов
- Сохранение файлов на сервере
- Чтение структуры папок пользователя

## Контакты
Если у вас есть вопросы или предложения, свяжитесь со мной через GitHub или Telegram - @vchugaevn.

