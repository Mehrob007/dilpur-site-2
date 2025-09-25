# Проект DILPUR

> Макет в Figma: [ссылка](https://www.figma.com/design/yAXQullKxBItwvcrk2xCrg/%D0%94%D0%B8%D0%BB%D0%BF%D1%83%D1%80?node-id=0-1&t=GwbE3yZ3mzQHpu4P-1)

## О проекте

Реализован полный путь пользователя — от просмотра каталога до оформления заказа. Проект построен на **Next.js 14 + TypeScript 5**, состояние хранится в **Zustand**, данные запрашиваются через **Axios**, стили написаны на **SCSS**.


## Технологии

- **Next.js 14 / TypeScript 5** — базовый стек, сборка через `create-next-app`
- **Zustand** — глобальное состояние корзины
- **Axios** — REST‑запросы
- **imask** — маска и валидация поля телефона
- **DOMPurify** — безопасный рендер HTML‑тегов
- **SCSS** — стили и адаптивная вёрстка (CSS Grid + Flexbox)

## Как запустить проект локально

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/Mehrob007/dilpur.git
cd test-task

# 2. Установите зависимости
pnpm install        # или npm install / yarn

# 3. Настройте переменные окружения
# Создайте файл .env.local и добавьте, например:
NEXT_PUBLIC_API_URL=https://api.example.com

# 4. Запустите dev‑сервер
pnpm dev            # http://localhost:3000

# 5. Сборка production
pnpm build          # создаётся папка .next
pnpm start          # запуск production‑сервера
```

## Структура проекта

```
├─ public/            # статические ассеты
│  ├─ icons/          # иконки
│  └─ images/         # изображения
├─ src/
│  ├─ api/            # обёртка Axios
│  ├─ components/     # UI‑компоненты
│  ├─ hooks/          # кастомные хуки
│  ├─ app/            # маршруты (Next App Router)
│  ├─ modules/        # бизнес‑модули (Cart, ProductItems и т. д.)
│  ├─ store/          # Zustand‑слайсы
│  ├─ styles/         # SCSS Стили
│  ├─ types/          # общие типы TS
│  ├─ constants/      # const
│  └─ utils/          # вспомогательные функции
│  └─ fonts/          # шрифты страниц
└─ README.md
```

## Лицензия

MIT# dilpur-site-2
# dilpur-site-2
