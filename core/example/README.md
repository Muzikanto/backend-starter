## Структура фичи

```yaml
application-module:
  commands: Команды на запись
    dto: Валидация запрсов
    handlers: Обработчики команд
    impl: Команды
    types: Типизация запросов
  controllers: 
    - контроллеры
  events: 
    - обработчики эвентов
  queries: Команды на чтение
    dto: Валидация запрсов
    handlers: Обработчики команд
    impl: Команды
    types: Типизация запросов
  <FEATURE_NAME>.module: бизнес модуль

db-adapter: Схемы таблиц для бд

domain:
  aggregates:
    - доменные сущности
  dto: 
    - Схема для доменов
  events: 
    - Эвенты которые создает домен
  types: 
    - Типизация домена
  utils: 
    - Хэлперы домена

infrastructure-module:
  <FEATURE_NAME>.module: модуль соединяющий инфру
  <FEATURE_NAME>.repository: сервис взаимодействия с бд

proxy-module:
  <FEATURE_NAME>.module: модуль для взаимодействия с микросервисом
  <FEATURE_NAME>.client: сервис взаимодействия tcp/kafka контроллером фичи

tests:
  e2e: 
    - E2E тесты
  e2e-helpers: 
    - Заготовки axios запросов
  fixture: 
    - Заготовки данных
  unit: 
    - Unit тесты
  unit-helpers: 
    - Хэлперы для unit тестов
```
