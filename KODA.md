# KODA.md — Контекст проекта

## 📋 Обзор проекта

**Название:** Content-Hub (Контент-Хаб)
**Тип:** Веб-приложение (SPA)
**Назначение:** Интерактивная панель управления контентом с поддержкой светлой/тёмной темы, адаптивным дизайном и CRUD-операциями для постов.

## 🛠 Технологический стек

| Технология | Версия | Назначение |
|---|---|---|
| **JavaScript** | ES6+ | Основная логика приложения |
| **Vite** | 7.x | Сборщик с HMR |
| **Tailwind CSS** | 4.x | Utility-first CSS фреймворк |
| **PostCSS** | 8.x | Обработка CSS |
| **Autoprefixer** | 10.x | Автоматическое добавление вендорных префиксов |
| **gh-pages** | 6.x | Деплой на GitHub Pages |

## 📁 Структура проекта

```
learn_block-2/
├── index.html              # Точка входа
├── package.json            # Зависимости и скрипты
├── vite.config.js          # Конфигурация Vite + Tailwind плагин
├── public/                 # Статические файлы (пустая)
├── src/
│   ├── main.js             # JavaScript точка входа
│   ├── style.css           # Глобальные стили + Tailwind
│   └── assets/
│       └── nav-images/     # Изображения для навигации
└── KODA.md                 # Этот файл
```

## 🚀 Сборка и запуск

### Требования

- Node.js >= 18.0.0
- npm >= 9.0.0

### Команды

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (с HMR)
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр сборки
npm run preview

# Деплой на GitHub Pages
npm run deploy
```

### Конфигурация Vite

- **Base path:** `/learn_block-2/` (для деплоя на GitHub Pages)
- **Плагин:** `@tailwindcss/vite` для интеграции Tailwind CSS 4.x

## 🎨 Дизайн и темы

### Цветовая палитра (план)

| Токен | Light Theme | Dark Theme |
|---|---|---|
| Фон страницы | `#F3F4F6` | `#0B0F19` |
| Фон карточки | `#FFFFFF` | `#111827` |
| Текст основной | `#111827` | `#F9FAFB` |
| Акцент (Primary) | `#3B82F6` | `#60A5FA` |

### Категории (план)

| Категория | Градиент (Light) | Градиент (Dark) |
|---|---|---|
| Технологии | `from-blue-500 to-blue-400` | `from-blue-900 to-blue-600` |
| Дизайн | `from-purple-500 to-purple-400` | `from-purple-900 to-purple-600` |
| Бизнес | `from-amber-500 to-amber-400` | `from-amber-900 to-amber-600` |
| Наука | `from-emerald-500 to-emerald-400` | `from-emerald-900 to-emerald-600` |
| Культура | `from-pink-500 to-pink-400` | `from-pink-900 to-pink-600` |

## 🏗 Архитектура (план)

### Модульная структура

```
src/
├── js/
│   ├── main.js              # Инициализация приложения
│   ├── modules/
│   │   ├── header.js        # Шапка (поиск, тема, создание)
│   │   ├── sidebar.js       # Боковая панель (Desktop)
│   │   ├── mobileNav.js     # Нижняя навигация (Mobile)
│   │   ├── feed.js          # Сетка постов / Empty State
│   │   ├── filter.js        # Фильтрация и поиск
│   │   ├── postModal.js     # Модальное окно просмотра
│   │   ├── createPostModal.js # Модальное окно создания
│   │   └── theme.js         # Управление темами
│   ├── components/
│   │   ├── card.js          # Компонент карточки поста
│   │   ├── emptyState.js    # Компонент пустого состояния
│   │   └── badge.js         # Компонент бейджа
│   ├── services/
│   │   └── api.js           # API клиент (JSONPlaceholder)
│   └── utils/
│       ├── helpers.js       # Вспомогательные функции
│       ├── validator.js     # Валидация форм
│       └── themeConfig.js   # Конфигурация тем
└── css/
    └── styles.css           # Глобальные стили
```

### Поток данных

1. **Инициализация:** `api.init()` загружает данные с JSONPlaceholder
2. **Обогащение:** Добавление категорий, статусов, лайков
3. **Рендеринг:** Empty State или сетка постов
4. **Взаимодействие:** Фильтрация, поиск, CRUD операции

## ✅ Функциональные требования

### Компоненты

- **Header:** Логотип, поиск, переключатель темы, кнопка создания, аватар
- **Sidebar (Desktop):** Категории со счетчиками, фильтры по статусам
- **Mobile Navigation:** Pills (категории), Bottom Bar (Посты, Создать, Профиль)
- **Post Card:** Градиентная шапка, бейджи, заголовок, футер с метриками
- **Empty State:** Отображается при отсутствии постов
- **Модальные окна:** Просмотр поста, создание/редактирование

### CRUD операции

| Операция | Метод | Описание |
|---|---|---|
| Создание | POST (mock) | Добавление в начало списка |
| Чтение | GET | Получение списка постов |
| Обновление | PUT/PATCH (mock) | Редактирование, лайки |
| Удаление | DELETE (mock) | Удаление с анимацией |

### Валидация форм

| Поле | Тип | Мин | Макс | Обязательное |
|---|---|---|---|---|
| Категория | Select | — | — | Да |
| Имя автора | Текст | 2 | 50 | Да |
| Фамилия автора | Текст | 2 | 50 | Да |
| Название поста | Текст | 5 | 100 | Да |
| Содержание | Текст | 20 | 2000 | Да |

### Адаптивность

| Breakpoint | Ширина | Сетка | Sidebar | Header Search |
|---|---|---|---|---|
| Mobile | `< 768px` | 1 колонка | Скрыт | Иконка |
| Tablet | `768px - 1024px` | 2 колонки | Скрыт | Input |
| Desktop | `> 1024px` | 3 колонки | Видим | Input |

### Доступность (A11y)

- Клавиатурная навигация (Tab)
- Видимый focus outline
- ARIA-атрибуты (`aria-label`, `aria-invalid`, `aria-describedby`)
- Focus Trap в модальных окнах
- Закрытие по ESC
- Контрастность ≥ 4.5:1 (WCAG 2.1 AA)

## 📝 Правила разработки

### Стиль кода

- **ES6 Modules:** Каждый компонент — отдельный модуль
- **Чистые функции:** Рендеринг через функции-генераторы HTML
- **Event Delegation:** Оптимизация обработчиков событий
- **const/let:** Запрет `var`, предпочтение `const`

### Тестирование

- Ручное тестирование на разных разрешениях (320px–1920px)
- Проверка в браузерах: Chrome, Firefox, Safari, Edge
- Accessibility: клавиатура, скринридеры
- Lighthouse: Performance ≥ 90, Accessibility ≥ 90

## 🔧 API Интеграция

### JSONPlaceholder Endpoints

```javascript
GET https://jsonplaceholder.typicode.com/posts?_limit=20
GET https://jsonplaceholder.typicode.com/users
```

### Mock Enrichment

Данные обогащаются моковыми полями:
- `category` (tech, design, business, science, culture)
- `status` (published, draft, archive)
- `likes` (число)
- `views` (число)
- `readTime` (минуты)

## 📊 Статус разработки

| Компонент | Статус |
|---|---|
| Базовая настройка Vite + Tailwind | ✅ Готово |
| Структура проекта | ✅ Создана |
| Основная логика (main.js) | ⏳ В разработке |
| Компоненты UI | ⏳ Ожидает |
| API интеграция | ⏳ Ожидает |
| Тестирование | ⏳ Ожидает |

## 🤝 Контрибуция

1. Форкните репозиторий
2. Создайте ветку: `git checkout -b feature/amazing-feature`
3. Зафиксируйте: `git commit -m 'Add amazing feature'`
4. Запушьте: `git push origin feature/amazing-feature`
5. Откройте Pull Request

## 📄 Лицензия

MIT License.
