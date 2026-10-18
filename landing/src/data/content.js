/* ══════════════════════════════════════════════════════════════════
   CloseCLAW Landing Page — Bilingual Content (RU & EN)
   ══════════════════════════════════════════════════════════════════ */

export const CONTENT = {
  ru: {
    nav: {
      features: 'Возможности',
      simulator: 'Симулятор',
      guide: 'Инструкция',
      envBuilder: 'Генератор .env',
      commands: 'Команды',
      architecture: 'Архитектура',
      faq: 'FAQ',
      presentation: 'Слайды 📺',
      github: 'GitHub ⚡',
    },
    hero: {
      badge: 'v2.0 • Двухуровневый ИИ • Open Source',
      titleLine1: 'Управляй сервером',
      titleLine2: 'через Telegram с ',
      titleGradient: 'ИИ-мозгом',
      subtitle:
        'CloseCLAW — это умный автономный Telegram-бот, объединяющий приватный локальный ИИ (Ollama) и мощный облачный ИИ (io.net) для полного контроля над Linux-сервером, создания дочерних ботов и безопасного выполнения shell-команд.',
      ctaQuickStart: '⚡ Быстрый старт',
      ctaSimulator: '📱 Попробовать в симуляторе',
      ctaGuide: '📖 Полная инструкция',
      cloneHint: 'Быстрая установка в 1 строку:',
      scrollText: 'Листай для изучения',
    },
    stats: [
      { number: '2 ИИ', label: 'Уровня интеллекта', sub: 'Ollama (Local) + io.net (Cloud)' },
      { number: 'AES-256', label: 'Шифрование токенов', sub: 'PBKDF2 + Fernet Vault' },
      { number: '100% Приватно', label: 'OS задачи локально', sub: 'Данные не покидают сервер' },
      { number: '∞ Ботов', label: 'Генерация через ИИ', sub: 'Авто-создание и PM2 деплой' },
    ],
    features: {
      label: 'Возможности системы',
      title: 'Всё необходимое для контроля над сервером',
      subtitle: 'Шесть интегрированных модулей превращают Telegram в полноценный центр управления сервером.',
      items: [
        {
          icon: '🖥️',
          title: 'Shell-терминал в Telegram',
          desc: 'Выполняйте любые Linux-команды через /run с живым выводом stdout/stderr, кодами завершения и ограничением переполнения экрана.',
          tag: 'OS Control',
          color: 'cyan',
        },
        {
          icon: '🧠',
          title: 'Умная маршрутизация задач',
          desc: 'Интеллектуальный роутер сам понимает тип запроса: конфиденциальные задачи ОС идут локально, сложные задачи кода — в облако.',
          tag: 'Smart Router',
          color: 'purple',
        },
        {
          icon: '☁️',
          title: 'Облачный ИИ io.net',
          desc: 'Прямая интеграция с передовыми моделями (Llama 3.3 70B Instruct) через децентрализованную вычислительную сеть io.net.',
          tag: 'Cloud LLM',
          color: 'pink',
        },
        {
          icon: '🔒',
          title: 'Локальный приватный ИИ',
          desc: 'Связка с локальным Ollama (llama3.2). Системные логи, пути к файлам и пароли никогда не отправляются во внешнюю сеть.',
          tag: 'Privacy First',
          color: 'green',
        },
        {
          icon: '🏭',
          title: 'AI Фабрика ботов',
          desc: 'Опишите текстом нужного бота (например: "Бот прогноза погоды для Ташкента"), и ИИ сгенерирует код, установит зависимости и запустит его.',
          tag: 'Bot Factory',
          color: 'orange',
        },
        {
          icon: '🔐',
          title: 'AES-256 Хранилище токенов',
          desc: 'Шифрованное хранилище токенов дочерних ботов с солью и мастер-паролем. Безопасное добавление, удаление и маскированный просмотр.',
          tag: 'Vault Security',
          color: 'blue',
        },
      ],
    },
    simulator: {
      label: 'Интерактивный симулятор',
      title: 'Попробуйте CloseCLAW прямо сейчас',
      subtitle: 'Переключайтесь между режимом Telegram-чата и серверной консолью, чтобы увидеть работу бота в реальном времени.',
      modeTg: '💬 Telegram Чат',
      modeTerm: '💻 Консоль сервера',
      botName: 'CloseCLAW Master Bot',
      botStatus: 'онлайн • v2.0',
      typeHint: 'Нажмите кнопку команды ниже, чтобы отправить её боту:',
      chips: [
        { cmd: '/start', label: '👋 /start (Приветствие)' },
        { cmd: '/status', label: '📊 /status (Мониторинг)' },
        { cmd: '/run free -h', label: '🖥️ /run free -h (Память)' },
        { cmd: '/ai Напиши bash-скрипт бэкапа', label: '☁️ /ai (Облачный ИИ)' },
        { cmd: '/local Проверь открытые порты', label: '🔒 /local (Ollama ИИ)' },
        { cmd: '/createbot CryptoAlertBot', label: '🏭 /createbot (Создать бота)' },
        { cmd: '/tokens', label: '🔐 /tokens (Хранилище)' },
      ],
    },
    guide: {
      label: 'Пошаговое руководство',
      title: 'Полная инструкция по запуску от А до Я',
      subtitle: 'Подробное руководство: где взять ключи, как настроить .env, установить зависимости и развернуть бота на сервере.',
      tabs: {
        steps: '🚀 Пошаговый запуск',
        keys: '🔑 Где взять API ключи',
        envBuilder: '⚙️ Генератор .env',
        commands: '📟 Все команды бота',
        deployment: '🌐 Продакшн на сервере',
        troubleshooting: '⚠️ Решение ошибок',
      },
      stepsList: [
        {
          step: '01',
          title: 'Клонирование репозитория и переход в папку',
          desc: 'Склонируйте исходный код проекта с GitHub на ваш Linux-сервер или локальный компьютер.',
          code: 'git clone https://github.com/Future-Web2/Close-Claw.git\ncd Close-Claw',
          note: 'Проект содержит готовые модули brain/ (ИИ-логика), token_store/ (хранилище токенов) и dashboard/ (веб-интерфейс).',
        },
        {
          step: '02',
          title: 'Создание и активация виртуального окружения',
          desc: 'Рекомендуется использовать Python 3.10+ и изолированное виртуальное окружение .venv.',
          code: `# Linux / macOS:
python3 -m venv .venv
source .venv/bin/activate

# Windows (PowerShell):
python -m venv .venv
.venv\\Scripts\\Activate.ps1`,
          note: 'После активации в начале строки терминала появится префикс (.venv).',
        },
        {
          step: '03',
          title: 'Установка необходимых Python-зависимостей',
          desc: 'Установите официальные библиотеки для Telegram, OpenAI/io.net, Ollama и AES-256 криптографии.',
          code: 'pip install --upgrade pip\npip install -r requirements.txt',
          note: 'Устанавливаются: python-telegram-bot (v21.6), openai, ollama, cryptography, aiohttp, psutil, python-dotenv.',
        },
        {
          step: '04',
          title: 'Создание и настройка файла переменных .env',
          desc: 'Скопируйте шаблон .env.example в рабочий файл .env и впишите свои реальные ключи.',
          code: 'cp .env.example .env\nnano .env',
          note: 'Файл .env уже добавлен в .gitignore — ваши секретные ключи никогда случайно не попадут в репозиторий!',
        },
        {
          step: '05',
          title: 'Запуск локальной модели Ollama (Опционально)',
          desc: 'Если вы хотите использовать полностью приватный ИИ для анализа системы без отправки данных в интернет.',
          code: `# Установка Ollama (Linux):
curl -fsSL https://ollama.com/install.sh | sh

# Скачивание и запуск легковесной модели:
ollama run llama3.2`,
          note: 'Если Ollama не установлена, бот всё равно будет полноценно работать через облачный ИИ io.net!',
        },
        {
          step: '06',
          title: 'Первый запуск CloseCLAW Master Bot',
          desc: 'Запустите точку входа bot.py и убедитесь в успешном подключении всех систем.',
          code: 'python bot.py',
          note: 'В терминале появится: "✅ CloseCLAW is online!" и "🚀 Starting CloseCLAW...". Теперь напишите /start боту в Telegram!',
        },
      ],
      apiKeys: [
        {
          name: 'TELEGRAM_BOT_TOKEN',
          status: 'Обязательно',
          source: '@BotFather в Telegram',
          sourceUrl: 'https://t.me/BotFather',
          instruction:
            '1. Откройте диалог с официальным ботом @BotFather в Telegram.\n2. Отправьте команду /newbot.\n3. Введите отображаемое имя (например, CloseCLAW Commander).\n4. Задайте username с окончанием _bot (например, my_closeclaw_bot).\n5. Скопируйте полученный HTTP API токен вида: 7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.',
          example: '7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
        {
          name: 'IO_NET_API_KEY',
          status: 'Обязательно (для облачного ИИ)',
          source: 'cloud.io.net',
          sourceUrl: 'https://cloud.io.net',
          instruction:
            '1. Зарегистрируйтесь или войдите на cloud.io.net.\n2. Перейдите в раздел "API Keys" (или Cloud Intelligence).\n3. Нажмите "Create New API Key" и скопируйте ключ.\n4. Этот ключ обеспечивает доступ к Llama-3.3-70B-Instruct через децентрализованный GPU-кластер.',
          example: 'sk-io-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
        {
          name: 'ALLOWED_USER_IDS',
          status: 'Критически важно для безопасности',
          source: '@userinfobot в Telegram',
          sourceUrl: 'https://t.me/userinfobot',
          instruction:
            '1. Напишите боту @userinfobot любое сообщение.\n2. Скопируйте строку Id (например: 123456789).\n3. Вставьте его в ALLOWED_USER_IDS.\n4. Если нужно разрешить доступ нескольким администраторам, перечислите их через запятую: 123456789,987654321.\nЛюбой чужой пользователь получит отказ "⛔ Access denied"!',
          example: '123456789,987654321',
        },
        {
          name: 'TOKEN_STORE_PASSWORD',
          status: 'Обязательно',
          source: 'Придумайте сами',
          sourceUrl: '',
          instruction:
            '1. Придумайте сложный секретный пароль (не менее 16 символов).\n2. Из этого пароля с помощью PBKDF2 и уникальной соли генерируется ключ AES-256.\n3. Этим ключом шифруются все токены дочерних ботов, сохраняемые через команду /addtoken.',
          example: 's3cur3_vAuLt_P@ssw0rd_2026_Claw!',
        },
      ],
      deployment: [
        {
          method: 'PM2 (Рекомендуется для Node/Python)',
          desc: 'Автоматический перезапуск при сбоях и перезагрузке сервера, удобный просмотр логов.',
          code: `# Установка PM2:
npm install -g pm2

# Запуск CloseCLAW в фоне:
pm2 start bot.py --name closeclaw --interpreter .venv/bin/python

# Сохранение автозапуска:
pm2 save
pm2 startup`,
        },
        {
          method: 'Systemd Service (Нативный Linux)',
          desc: 'Запуск бота как системного демона Linux с автоматическим поднятием при старте сервера.',
          code: `# Создать сервис /etc/systemd/system/closeclaw.service:
[Unit]
Description=CloseCLAW AI Telegram Bot Commander
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/path/to/Close-Claw
ExecStart=/path/to/Close-Claw/.venv/bin/python bot.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target

# Активация и старт:
sudo systemctl daemon-reload
sudo systemctl enable closeclaw
sudo systemctl start closeclaw`,
        },
        {
          method: 'Screen / Tmux (Простой фоновый запуск)',
          desc: 'Быстрый запуск в отдельной сессии терминала без создания системных служб.',
          code: `# Запуск новой сессии:
screen -S closeclaw

# Внутри сессии активируем venv и запускаем:
source .venv/bin/activate
python bot.py

# Отключиться от сессии (оставив работать): нажмите Ctrl+A, затем D
# Вернуться обратно в сессию:
screen -r closeclaw`,
        },
      ],
      troubleshooting: [
        {
          q: 'Ошибка: ValueError: TELEGRAM_BOT_TOKEN not set in .env',
          a: 'Вы не создали файл .env или оставили поле TELEGRAM_BOT_TOKEN пустым. Выполните cp .env.example .env и впишите туда токен, полученный от @BotFather.',
        },
        {
          q: 'Бот отвечает: ⛔ Access denied',
          a: 'Ваш Telegram User ID не добавлен в список ALLOWED_USER_IDS в файле .env. Узнайте свой ID через @userinfobot и добавьте его в .env, затем перезапустите bot.py.',
        },
        {
          q: 'Ошибка: io.net error / Unauthorized / Connection timeout',
          a: 'Проверьте правильность IO_NET_API_KEY на cloud.io.net, баланс аккаунта и доступность адреса https://api.intelligence.io.solutions/api/v1 с вашего сервера.',
        },
        {
          q: 'Ошибка: Ollama error / Connection refused to localhost:11434',
          a: 'Локальный сервер Ollama не запущен. Выполните ollama serve или ollama run llama3.2 в отдельном окне. Если локальный ИИ не нужен, пользуйтесь облачной командой /ai.',
        },
        {
          q: 'ModuleNotFoundError: No module named "telegram"',
          a: 'Вы запускаете скрипт системным Python вместо активированного виртуального окружения. Активируйте окружение (source .venv/bin/activate) или используйте путь .venv/bin/python bot.py.',
        },
        {
          q: 'Как проверить статус запущенных дочерних ботов?',
          a: 'Используйте команду /bots в Telegram или системную команду pm2 list на сервере.',
        },
      ],
    },
    commands: {
      label: 'Справочник команд',
      title: 'Все команды CloseCLAW под рукой',
      subtitle: 'Полный список встроенных команд с синтаксисом, примерами и описанием работы.',
      filterAll: 'Все команды',
      filterSystem: 'Система и ОС',
      filterAi: 'ИИ и Анализ',
      filterBots: 'Управление ботами',
      filterSecurity: 'Безопасность',
      searchPlaceholder: 'Поиск команды (например: /run, status, token)...',
      items: [
        {
          cmd: '/start',
          cat: 'system',
          syntax: '/start',
          desc: 'Главное меню, список всех команд и приветственное руководство.',
          example: '/start',
          response: '🤖 CloseCLAW — AI Bot Commander онлайн! Выберите команду...',
        },
        {
          cmd: '/status',
          cat: 'system',
          syntax: '/status',
          desc: 'Диагностика сервера: загрузка CPU %, RAM (МБ/всего), диск (ГБ/всего), количество работающих ботов, статус Ollama и io.net.',
          example: '/status',
          response: '📊 CPU: 12% | RAM: 34% (1380MB / 4096MB) | Bots: 3 | Ollama: Online',
        },
        {
          cmd: '/run',
          cat: 'system',
          syntax: '/run <shell команда>',
          desc: 'Выполнение терминальной команды на сервере в неблокирующем асинхронном режиме с форматированным выводом.',
          example: '/run uptime && docker ps',
          response: '```\nup 14 days, 3 users, load average: 0.15\nCONTAINER ID   IMAGE   STATUS\n```\nExit code: 0',
        },
        {
          cmd: '/ai',
          cat: 'ai',
          syntax: '/ai <ваш промпт>',
          desc: 'Прямой запрос к облачной сверхмощной модели (Llama-3.3-70B через io.net). Идеально для написания кода, архитектуры и сложных текстов.',
          example: '/ai Напиши скрипт ротации логов на Python',
          response: 'Вот готовый production-скрипт с использованием logging.handlers.RotatingFileHandler...',
        },
        {
          cmd: '/local',
          cat: 'ai',
          syntax: '/local <ваш промпт>',
          desc: 'Конфиденциальный запрос к локальной модели Ollama. Запрос не выходит во внешнюю сеть — безопасно для анализа паролей и логов.',
          example: '/local Проверь конфигурацию iptables на уязвимости',
          response: 'Анализ правил iptables: порт 22 открыт для всех IP, рекомендуется ограничить...',
        },
        {
          cmd: '/createbot',
          cat: 'bots',
          syntax: '/createbot <текстовое описание бота>',
          desc: 'AI Bot Factory: генерирует полностью рабочий код дочернего бота по описанию, сохраняет его, создает окружение и запускает.',
          example: '/createbot Бот викторина по истории с 10 вопросами',
          response: '🏗 Бот HistoryQuizBot сгенерирован и запущен под управлением PM2 (PID: 4812).',
        },
        {
          cmd: '/bots',
          cat: 'bots',
          syntax: '/bots',
          desc: 'Выводит список всех дочерних ботов, запущенных через CloseCLAW, их статус, время работы и потребление ресурсов.',
          example: '/bots',
          response: '🤖 Активные боты:\n1. WeatherBot (online, uptime: 3d)\n2. CryptoAlert (online)',
        },
        {
          cmd: '/stopbot',
          cat: 'bots',
          syntax: '/stopbot <имя бота>',
          desc: 'Штатная остановка и удаление процесса дочернего бота.',
          example: '/stopbot WeatherBot',
          response: '🛑 Бот WeatherBot успешно остановлен.',
        },
        {
          cmd: '/tokens',
          cat: 'security',
          syntax: '/tokens',
          desc: 'Просмотр сохраненных токенов в зашифрованном хранилище (токены выводятся в безопасном замаскированном виде).',
          example: '/tokens',
          response: '🔐 Сохраненные токены:\n• WeatherBot: 7123...4a9f\n• SupportBot: 8491...bc02',
        },
        {
          cmd: '/addtoken',
          cat: 'security',
          syntax: '/addtoken <имя> <токен>',
          desc: 'Сохранение нового токена Telegram-бота с шифрованием алгоритмом AES-256 в локальный зашифрованный файл tokens.enc.',
          example: '/addtoken ShopBot 789123456:AAH_example_token_here',
          response: '🔐 Токен ShopBot успешно зашифрован (AES-256) и сохранен в хранилище.',
        },
        {
          cmd: '/removetoken',
          cat: 'security',
          syntax: '/removetoken <имя>',
          desc: 'Безвозвратное удаление токена из зашифрованного хранилища.',
          example: '/removetoken ShopBot',
          response: '✅ Токен ShopBot удален из хранилища.',
        },
        {
          cmd: 'Авто-роутер',
          cat: 'ai',
          syntax: '<любой текст без слэша>',
          desc: 'Умный режим: просто напишите боту свой вопрос на естественном языке. Роутер сам решит, отправить его в локальный или облачный ИИ.',
          example: 'Как перезагрузить nginx без простоя?',
          response: '🧠 Анализ запроса... Направлено в Cloud AI:\nДля graceful reload используйте: sudo systemctl reload nginx',
        },
      ],
    },
    envBuilder: {
      label: 'Интерактивный конфигуратор',
      title: 'Генератор файла .env в 1 клик',
      subtitle: 'Заполните поля или используйте готовые значения по умолчанию. Скопируйте готовый файл или скачайте его.',
      tgToken: 'Telegram Bot Token (@BotFather)',
      allowedIds: 'Ваш Telegram User ID (@userinfobot)',
      ioNetKey: 'io.net API Key (cloud.io.net)',
      storePass: 'Пароль шифрования токенов (любой надежный)',
      ollamaUrl: 'Ollama Base URL',
      ollamaModel: 'Модель Ollama',
      ioNetUrl: 'io.net Base URL',
      ioNetModel: 'Модель io.net',
      dashPort: 'Порт дашборда',
      copyBtn: '📋 Скопировать .env',
      downloadBtn: '💾 Скачать .env',
      copiedAlert: '✅ Скопировано в буфер обмена!',
      resetBtn: 'Сбросить к шаблону',
    },
    architecture: {
      label: 'Архитектура и Безопасность',
      title: 'Многоуровневая изоляция и защита данных',
      subtitle: 'Разделение приватных локальных операций и мощных облачных вычислений обеспечивает максимальную безопасность.',
      pillars: [
        {
          icon: '🛡️',
          title: 'Строгий декоратор @whitelist',
          desc: 'Любой входящий запрос от пользователя, чей ID не прописан в ALLOWED_USER_IDS, немедленно отклоняется. Бот даже не парсит команду.',
        },
        {
          icon: '🔒',
          title: 'Local-First принцип для ОС',
          desc: 'Выполнение шелл-команд (/run) и локальный ИИ (/local) работают полностью на вашей машине. Вывод системных логов не передается третьим сторонам.',
        },
        {
          icon: '🔐',
          title: 'Шифрование AES-256 с солью',
          desc: 'Хранилище token_store использует криптографический стандарт Fernet с PBKDF2HMAC (100 000 итераций SHA-256).',
        },
        {
          icon: '🚀',
          title: 'Изоляция дочерних процессов',
          desc: 'Каждый созданный через /createbot бот запускается в изолированном процессе и может контролироваться независимо.',
        },
      ],
    },
    cta: {
      title: 'Готовы взять сервер под контроль?',
      desc: 'Склонируйте репозиторий, настройте свой .env и запустите CloseCLAW прямо сейчас. Доступно бесплатно на GitHub.',
      btnGithub: '⚡ Перейти в репозиторий GitHub',
      btnDocs: '📺 Открыть интерактивную презентацию',
    },
    footer: {
      about: 'CloseCLAW — автономный ИИ-командир для Linux-серверов под управлением Telegram.',
      builtBy: 'Разработано с 🤖 командой Future-Web2',
      copyright: 'CloseCLAW © 2026. Лицензия MIT.',
      linksTitle: 'Ресурсы',
      repo: 'GitHub Репозиторий',
      slides: 'Интерактивная презентация (12 слайдов)',
      dashboard: 'Веб-дашборд проекта',
    },
  },

  en: {
    nav: {
      features: 'Features',
      simulator: 'Simulator',
      guide: 'Guide',
      envBuilder: '.env Builder',
      commands: 'Commands',
      architecture: 'Architecture',
      faq: 'FAQ',
      presentation: 'Slides 📺',
      github: 'GitHub ⚡',
    },
    hero: {
      badge: 'v2.0 • Dual-Brain AI • Open Source',
      titleLine1: 'Command Your Linux Server',
      titleLine2: 'from Telegram with an ',
      titleGradient: 'AI Brain',
      subtitle:
        'CloseCLAW is an autonomous Telegram bot commander bridging private local AI (Ollama) and high-power cloud AI (io.net) for total Linux server control, spawning child bots, and safe shell execution.',
      ctaQuickStart: '⚡ Quick Start',
      ctaSimulator: '📱 Try Live Simulator',
      ctaGuide: '📖 Full Step-by-Step Guide',
      cloneHint: 'Quick 1-line install:',
      scrollText: 'Scroll to explore',
    },
    stats: [
      { number: '2 AI Layers', label: 'Intelligence Tiers', sub: 'Ollama (Local) + io.net (Cloud)' },
      { number: 'AES-256', label: 'Token Vault', sub: 'PBKDF2 + Fernet Encryption' },
      { number: '100% Private', label: 'OS Tasks Stay Local', sub: 'Data never leaves your VPS' },
      { number: '∞ Bots', label: 'AI Bot Factory', sub: 'Autonomous creation & PM2 deploy' },
    ],
    features: {
      label: 'Core Capabilities',
      title: 'Everything You Need to Command Your Server',
      subtitle: 'Six integrated modules turning Telegram into an intelligent mission control center.',
      items: [
        {
          icon: '🖥️',
          title: 'Shell Terminal in Telegram',
          desc: 'Execute any Linux command via /run with real-time stdout/stderr, return codes, and output truncation safeguards.',
          tag: 'OS Control',
          color: 'cyan',
        },
        {
          icon: '🧠',
          title: 'Smart AI Routing',
          desc: 'Intelligent router auto-detects request semantics: sensitive OS tasks stay local; complex code reasoning routes to cloud.',
          tag: 'Smart Router',
          color: 'purple',
        },
        {
          icon: '☁️',
          title: 'Cloud AI via io.net',
          desc: 'Direct integration with high-end models (Llama 3.3 70B Instruct) powered by the decentralized io.net GPU network.',
          tag: 'Cloud LLM',
          color: 'pink',
        },
        {
          icon: '🔒',
          title: 'Local Private AI (Ollama)',
          desc: 'Runs on your server via Ollama (llama3.2). System logs, passwords, and server diagnostics never hit third-party servers.',
          tag: 'Privacy First',
          color: 'green',
        },
        {
          icon: '🏭',
          title: 'AI Bot Factory',
          desc: 'Describe what you need (e.g. "A crypto price alert bot"), and CloseCLAW writes code, installs deps, and spawns the child bot.',
          tag: 'Bot Factory',
          color: 'orange',
        },
        {
          icon: '🔐',
          title: 'AES-256 Token Vault',
          desc: 'Encrypted storage for child bot tokens with salted key derivation. Secure additions, deletions, and masked inspection.',
          tag: 'Vault Security',
          color: 'blue',
        },
      ],
    },
    simulator: {
      label: 'Interactive Simulator',
      title: 'Test CloseCLAW Live Right Now',
      subtitle: 'Switch between Telegram Chat and Server Terminal views to see how CloseCLAW reacts in real time.',
      modeTg: '💬 Telegram Chat',
      modeTerm: '💻 Server Terminal',
      botName: 'CloseCLAW Master Bot',
      botStatus: 'online • v2.0',
      typeHint: 'Click a command chip below to send it to the bot:',
      chips: [
        { cmd: '/start', label: '👋 /start (Welcome)' },
        { cmd: '/status', label: '📊 /status (Metrics)' },
        { cmd: '/run free -h', label: '🖥️ /run free -h (RAM)' },
        { cmd: '/ai Write a backup bash script', label: '☁️ /ai (Cloud AI)' },
        { cmd: '/local Check open ports', label: '🔒 /local (Ollama)' },
        { cmd: '/createbot CryptoAlertBot', label: '🏭 /createbot (Spawn Bot)' },
        { cmd: '/tokens', label: '🔐 /tokens (Vault)' },
      ],
    },
    guide: {
      label: 'Complete Instructions',
      title: 'Step-by-Step Setup & Deployment Guide',
      subtitle: 'Everything you need: getting API keys, configuring .env, installing dependencies, and running in production.',
      tabs: {
        steps: '🚀 Step-by-Step Setup',
        keys: '🔑 API Keys Guide',
        envBuilder: '⚙️ .env Builder',
        commands: '📟 Bot Commands',
        deployment: '🌐 Production VPS',
        troubleshooting: '⚠️ Troubleshooting',
      },
      stepsList: [
        {
          step: '01',
          title: 'Clone Repository & Enter Directory',
          desc: 'Clone the CloseCLAW repository from GitHub to your Linux server or local development workstation.',
          code: 'git clone https://github.com/Future-Web2/Close-Claw.git\ncd Close-Claw',
          note: 'Contains brain/ (AI routing), token_store/ (encrypted tokens), and dashboard/ (web UI).',
        },
        {
          step: '02',
          title: 'Create and Activate Virtual Environment',
          desc: 'Using Python 3.10+ in an isolated virtual environment ensures clean dependency management.',
          code: `# Linux / macOS:
python3 -m venv .venv
source .venv/bin/activate

# Windows (PowerShell):
python -m venv .venv
.venv\\Scripts\\Activate.ps1`,
          note: 'Once activated, your terminal prompt will be prefixed with (.venv).',
        },
        {
          step: '03',
          title: 'Install Required Python Dependencies',
          desc: 'Install the official libraries for Telegram Bot API, OpenAI/io.net, Ollama, and cryptography.',
          code: 'pip install --upgrade pip\npip install -r requirements.txt',
          note: 'Packages installed: python-telegram-bot (v21.6), openai, ollama, cryptography, aiohttp, psutil, python-dotenv.',
        },
        {
          step: '04',
          title: 'Configure Your .env Environment File',
          desc: 'Copy the .env.example template to .env and fill in your actual API keys and Telegram credentials.',
          code: 'cp .env.example .env\nnano .env',
          note: 'The .env file is gitignored by default, so your secrets will never be committed to Git.',
        },
        {
          step: '05',
          title: 'Start Local Ollama Model (Optional)',
          desc: 'If you want 100% private local AI processing without internet data leaks for sensitive operations.',
          code: `# Install Ollama (Linux):
curl -fsSL https://ollama.com/install.sh | sh

# Pull and run lightweight model:
ollama run llama3.2`,
          note: 'If Ollama is omitted, the cloud AI (/ai) will still work completely out of the box!',
        },
        {
          step: '06',
          title: 'Launch CloseCLAW Master Bot',
          desc: 'Execute bot.py and verify that all systems initialize cleanly.',
          code: 'python bot.py',
          note: 'Expected console output: "✅ CloseCLAW is online!" and "🚀 Starting CloseCLAW...". Now message your bot /start!',
        },
      ],
      apiKeys: [
        {
          name: 'TELEGRAM_BOT_TOKEN',
          status: 'Required',
          source: '@BotFather on Telegram',
          sourceUrl: 'https://t.me/BotFather',
          instruction:
            '1. Message official @BotFather on Telegram.\n2. Send /newbot.\n3. Choose a display name (e.g. CloseCLAW Commander).\n4. Choose a username ending in _bot (e.g. my_closeclaw_bot).\n5. Copy the generated HTTP API token: 7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.',
          example: '7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
        {
          name: 'IO_NET_API_KEY',
          status: 'Required (for Cloud AI)',
          source: 'cloud.io.net',
          sourceUrl: 'https://cloud.io.net',
          instruction:
            '1. Sign up or log in at cloud.io.net.\n2. Navigate to "API Keys" section.\n3. Click "Create New API Key" and copy the token.\n4. Grants access to Llama-3.3-70B-Instruct running on decentralized GPU clusters.',
          example: 'sk-io-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
        {
          name: 'ALLOWED_USER_IDS',
          status: 'Critical Security Requirement',
          source: '@userinfobot on Telegram',
          sourceUrl: 'https://t.me/userinfobot',
          instruction:
            '1. Message @userinfobot on Telegram.\n2. Copy your numeric Id (e.g. 123456789).\n3. Paste into ALLOWED_USER_IDS.\n4. For multiple admins, separate with commas: 123456789,987654321.\nAll unauthorized users receive an instant "⛔ Access denied" response.',
          example: '123456789,987654321',
        },
        {
          name: 'TOKEN_STORE_PASSWORD',
          status: 'Required',
          source: 'Create your own',
          sourceUrl: '',
          instruction:
            '1. Create a strong random passphrase (at least 16 characters).\n2. Derived into an AES-256 key via PBKDF2 with unique salt.\n3. Encrypts all child bot tokens stored via /addtoken.',
          example: 's3cur3_vAuLt_P@ssw0rd_2026_Claw!',
        },
      ],
      deployment: [
        {
          method: 'PM2 Process Manager (Recommended)',
          desc: 'Automatic restart on crash, startup persistence on server reboot, and log management.',
          code: `# Install PM2:
npm install -g pm2

# Run CloseCLAW in background:
pm2 start bot.py --name closeclaw --interpreter .venv/bin/python

# Save for reboot:
pm2 save
pm2 startup`,
        },
        {
          method: 'Systemd Service (Native Linux Daemon)',
          desc: 'Standard production approach for Linux servers with automatic restart and system journal integration.',
          code: `# Create /etc/systemd/system/closeclaw.service:
[Unit]
Description=CloseCLAW AI Telegram Bot Commander
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/path/to/Close-Claw
ExecStart=/path/to/Close-Claw/.venv/bin/python bot.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target

# Enable and start:
sudo systemctl daemon-reload
sudo systemctl enable closeclaw
sudo systemctl start closeclaw`,
        },
        {
          method: 'Screen / Tmux Session',
          desc: 'Fast detached terminal session without configuring root services.',
          code: `# Start detached session:
screen -S closeclaw

# Inside session:
source .venv/bin/activate
python bot.py

# Detach: Press Ctrl+A, then D
# Reattach anytime:
screen -r closeclaw`,
        },
      ],
      troubleshooting: [
        {
          q: 'Error: ValueError: TELEGRAM_BOT_TOKEN not set in .env',
          a: 'You did not create .env or left the TELEGRAM_BOT_TOKEN blank. Run cp .env.example .env and enter the token from @BotFather.',
        },
        {
          q: 'Bot says: ⛔ Access denied',
          a: 'Your Telegram User ID is missing from ALLOWED_USER_IDS in .env. Get your ID from @userinfobot, add it to .env, and restart bot.py.',
        },
        {
          q: 'Error: io.net error / Unauthorized / Connection timeout',
          a: 'Verify your IO_NET_API_KEY at cloud.io.net and ensure your server can reach https://api.intelligence.io.solutions/api/v1.',
        },
        {
          q: 'Error: Ollama error / Connection refused to localhost:11434',
          a: 'Local Ollama is not running. Execute ollama run llama3.2 in another terminal. If you only want cloud AI, simply use /ai.',
        },
        {
          q: 'ModuleNotFoundError: No module named "telegram"',
          a: 'You are using system Python instead of your virtual environment. Activate it via source .venv/bin/activate or run .venv/bin/python bot.py.',
        },
        {
          q: 'How do I check active spawned child bots?',
          a: 'Send /bots in Telegram or run pm2 list on the host server.',
        },
      ],
    },
    commands: {
      label: 'Command Reference',
      title: 'Complete CloseCLAW Command Directory',
      subtitle: 'All built-in commands with syntax, examples, category filters, and live responses.',
      filterAll: 'All Commands',
      filterSystem: 'System & OS',
      filterAi: 'AI & Analysis',
      filterBots: 'Bot Management',
      filterSecurity: 'Security',
      searchPlaceholder: 'Search command (e.g. /run, status, token)...',
      items: [
        {
          cmd: '/start',
          cat: 'system',
          syntax: '/start',
          desc: 'Main menu, full command list, and introductory help guide.',
          example: '/start',
          response: '🤖 CloseCLAW — AI Bot Commander is online! Choose a command below...',
        },
        {
          cmd: '/status',
          cat: 'system',
          syntax: '/status',
          desc: 'Server health metrics: CPU %, RAM (used/total), Disk (used/total), running bots count, Ollama, and io.net status.',
          example: '/status',
          response: '📊 CPU: 12% | RAM: 34% (1380MB / 4096MB) | Bots: 3 | Ollama: Online',
        },
        {
          cmd: '/run',
          cat: 'system',
          syntax: '/run <shell command>',
          desc: 'Executes any shell command on the host server asynchronously with formatted stdout/stderr and exit code.',
          example: '/run uptime && docker ps',
          response: '```\nup 14 days, 3 users, load average: 0.15\nCONTAINER ID   IMAGE   STATUS\n```\nExit code: 0',
        },
        {
          cmd: '/ai',
          cat: 'ai',
          syntax: '/ai <your prompt>',
          desc: 'Direct query to cloud AI (Llama-3.3-70B via io.net). Ideal for writing scripts, architecture, and reasoning.',
          example: '/ai Write a Python log rotation script',
          response: 'Here is a complete production script using logging.handlers.RotatingFileHandler...',
        },
        {
          cmd: '/local',
          cat: 'ai',
          syntax: '/local <your prompt>',
          desc: 'Confidential query to local Ollama. Request never leaves your server — safe for analyzing credentials and logs.',
          example: '/local Check iptables rules for security risks',
          response: 'Audit of iptables: SSH port 22 is unrestricted; recommend limiting to your bastion IP...',
        },
        {
          cmd: '/createbot',
          cat: 'bots',
          syntax: '/createbot <bot description>',
          desc: 'AI Bot Factory: generates full code for a child bot from description, installs deps, and spawns it under PM2.',
          example: '/createbot A history trivia bot with 10 questions',
          response: '🏗 Bot HistoryQuizBot generated and deployed under PM2 (PID: 4812).',
        },
        {
          cmd: '/bots',
          cat: 'bots',
          syntax: '/bots',
          desc: 'Lists all child bots managed by CloseCLAW along with their status, uptime, and resource usage.',
          example: '/bots',
          response: '🤖 Active bots:\n1. WeatherBot (online, uptime: 3d)\n2. CryptoAlert (online)',
        },
        {
          cmd: '/stopbot',
          cat: 'bots',
          syntax: '/stopbot <bot name>',
          desc: 'Gracefully terminates and removes a running child bot process.',
          example: '/stopbot WeatherBot',
          response: '🛑 Bot WeatherBot stopped successfully.',
        },
        {
          cmd: '/tokens',
          cat: 'security',
          syntax: '/tokens',
          desc: 'Lists stored bot tokens in the AES-256 vault with secure masking.',
          example: '/tokens',
          response: '🔐 Stored tokens:\n• WeatherBot: 7123...4a9f\n• SupportBot: 8491...bc02',
        },
        {
          cmd: '/addtoken',
          cat: 'security',
          syntax: '/addtoken <name> <token>',
          desc: 'Stores a new Telegram bot token into local encrypted vault tokens.enc using AES-256.',
          example: '/addtoken ShopBot 789123456:AAH_example_token_here',
          response: '🔐 Token ShopBot securely encrypted (AES-256) and saved to vault.',
        },
        {
          cmd: '/removetoken',
          cat: 'security',
          syntax: '/removetoken <name>',
          desc: 'Permanently removes a token from the encrypted vault.',
          example: '/removetoken ShopBot',
          response: '✅ Token ShopBot removed from vault.',
        },
        {
          cmd: 'Auto-Router',
          cat: 'ai',
          syntax: '<any natural language message>',
          desc: 'Smart routing: type any prompt without a slash command. Router analyzes context and picks Local or Cloud AI automatically.',
          example: 'How do I gracefully restart nginx?',
          response: '🧠 Routed to Cloud AI:\nUse: sudo systemctl reload nginx for zero-downtime config reload.',
        },
      ],
    },
    envBuilder: {
      label: 'Interactive Configurator',
      title: '1-Click .env File Builder',
      subtitle: 'Fill in your values or use safe defaults. Copy the ready configuration or download it directly.',
      tgToken: 'Telegram Bot Token (@BotFather)',
      allowedIds: 'Your Telegram User ID (@userinfobot)',
      ioNetKey: 'io.net API Key (cloud.io.net)',
      storePass: 'Token Vault Passphrase (choose a strong one)',
      ollamaUrl: 'Ollama Base URL',
      ollamaModel: 'Ollama Model',
      ioNetUrl: 'io.net Base URL',
      ioNetModel: 'io.net Model',
      dashPort: 'Dashboard Port',
      copyBtn: '📋 Copy .env File',
      downloadBtn: '💾 Download .env',
      copiedAlert: '✅ Copied to clipboard!',
      resetBtn: 'Reset to Defaults',
    },
    architecture: {
      label: 'Architecture & Security',
      title: 'Multi-Tiered Data Isolation',
      subtitle: 'Clear boundaries between private local operations and cloud computing guarantee zero data leaks.',
      pillars: [
        {
          icon: '🛡️',
          title: 'Strict @whitelist Decorator',
          desc: 'Any incoming update from a user whose ID is not in ALLOWED_USER_IDS is dropped immediately without execution.',
        },
        {
          icon: '🔒',
          title: 'Local-First OS Isolation',
          desc: 'Shell execution (/run) and local AI (/local) run entirely on your server. System diagnostics never touch the cloud.',
        },
        {
          icon: '🔐',
          title: 'Salted AES-256 Cryptography',
          desc: 'Token store uses Fernet with PBKDF2HMAC (100,000 iterations of SHA-256) to ensure child bot tokens cannot be recovered without the passphrase.',
        },
        {
          icon: '🚀',
          title: 'Sub-Process Sandboxing',
          desc: 'Child bots generated via /createbot run as distinct supervised processes under PM2 with separate logging.',
        },
      ],
    },
    cta: {
      title: 'Ready to Take Command of Your Server?',
      desc: 'Clone the repo, configure your .env, and launch CloseCLAW in under 5 minutes. Available open source on GitHub.',
      btnGithub: '⚡ View on GitHub',
      btnDocs: '📺 Open Interactive Slides Presentation',
    },
    footer: {
      about: 'CloseCLAW — Autonomous AI Bot Commander for Linux servers controlled via Telegram.',
      builtBy: 'Built with 🤖 by Future-Web2',
      copyright: 'CloseCLAW © 2026. MIT License.',
      linksTitle: 'Resources',
      repo: 'GitHub Repository',
      slides: 'Interactive Presentation (12 Slides)',
      dashboard: 'Project Web Dashboard',
    },
  },
}
