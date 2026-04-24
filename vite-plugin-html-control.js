// vite-plugin-html-control.js
export function htmlControlPlugin() {
  return {
    name: 'html-control',
    transformIndexHtml(html, ctx) {
      // 1. Извлекаем все элементы
      const faviconMatch = html.match(/<link[^>]*rel=["']icon["'][^>]*>/i);
      const stylesMatches =
        html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
      const scriptsMatches =
        html.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];

      // 2. Удаляем извлечённые элементы из HTML
      let cleanHtml = html;
      if (faviconMatch) {
        faviconMatch.forEach((el) => {
          cleanHtml = cleanHtml.replace(el, '');
        });
      }
      stylesMatches.forEach((el) => {
        cleanHtml = cleanHtml.replace(el, '');
      });
      scriptsMatches.forEach((el) => {
        cleanHtml = cleanHtml.replace(el, '');
      });

      // 3. Очищаем HTML от лишних пустых строк и пробелов
      cleanHtml = cleanHtml.replace(/\n\s*\n\s*\n/g, '\n');
      cleanHtml = cleanHtml.replace(/^\s*\n/gm, '');
      cleanHtml = cleanHtml.replace(/\n{3,}/g, '\n\n');

      // 4. Находим место для вставки head элементов
      const headOpenMatch = cleanHtml.match(/<head[^>]*>/i);
      const headCloseMatch = cleanHtml.match(/<\/head>/i);

      if (!headOpenMatch || !headCloseMatch) {
        return html;
      }

      // 5. Формируем правильный порядок элементов для head
      let headContent = '';

      // Сначала favicon
      if (faviconMatch) {
        faviconMatch.forEach((el) => {
          el = el.replace(/\s*crossorigin/g, '');
          el = el.replace(/\s+/g, ' ');
          headContent += el + '\n';
        });
      }

      // Потом стили
      stylesMatches.forEach((el) => {
        el = el.replace(/\s*crossorigin/g, '');
        el = el.replace(/\s+/g, ' ');
        headContent += el + '\n';
      });

      // Потом скрипты (сразу после стилей)
      scriptsMatches.forEach((el) => {
        // Добавляем defer если type="module" и нет defer
        if (el.includes('type="module"') && !el.includes('defer')) {
          el = el.replace(/type="module"/, 'defer type="module"');
        }
        // Убираем crossorigin
        el = el.replace(/\s*crossorigin/g, '');
        // Убираем лишние пробелы
        el = el.replace(/\s+/g, ' ');
        headContent += el + '\n';
      });

      // 6. Вставляем элементы в head (после <head>)
      const headOpenEnd = headOpenMatch.index + headOpenMatch[0].length;
      const beforeHeadClose = cleanHtml.substring(0, headCloseMatch.index);
      const afterHeadClose = cleanHtml.substring(headCloseMatch.index);

      // Вставляем контент после <head> и перед </head>
      let resultHtml = beforeHeadClose + '\n' + headContent + afterHeadClose;

      // 7. Финальная очистка от пустых строк
      resultHtml = resultHtml.replace(/\n\s*\n\s*\n/g, '\n\n');
      resultHtml = resultHtml.replace(/^\s*\n/gm, '');
      resultHtml = resultHtml.trim();

      return resultHtml;
    },
  };
}
