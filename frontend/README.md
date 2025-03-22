#  Тестовое задание: Таблица с товарами

React + Redux Toolkit + TypeScript + Vite

## 📋 Условия задания

Реализовать таблицу с товарами, полученными по запросу с сервера:

🔗 API: [https://dummyjson.com/products](https://dummyjson.com/products)

### Функциональные требования:

- ✅ Вывод данных в таблице `TableData`
- ✅ Данные хранятся в Redux Toolkit slice
- ✅ Запрос выполняется через `createAsyncThunk`
- ✅ Slice загружается по требованию (при рендере `TableData`)
- ✅ Обновление данных каждые 30 секунд
- ✅ Используется вручную реализованный хук `useInterval(callback, interval)`
- ✅ Если `interval === null`, обновление не выполняется
- ✅ На странице есть переключатель (switch) для включения/отключения автообновления
- ✅ Реализован поиск по полям `title` и `description`

---

## 🚀 Как запустить

```bash
cd frontend
npm install
npm run dev
