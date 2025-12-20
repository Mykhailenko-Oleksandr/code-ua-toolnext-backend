// Libraries
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';

//MongoDB
import { connectMongoDB } from './db/connectMongoDB.js';

// Middlewares
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

// Swagger
import { swaggerSpec } from './config/swagger.js';
import { swaggerTranslations } from './config/swaggerTranslations.js';

// Routes
import userRoutes from './routes/usersRoutes.js';
import toolsRoutes from './routes/toolsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import feedbacksRoutes from './routes/feedbacksRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Swagger documentation with language switcher
// Helmet с условной CSP: строгая для всего приложения, отключена только для Swagger UI
app.use((req, res, next) => {
  if (req.path.startsWith('/api-docs')) {
    // Отключаем CSP только для Swagger UI
    helmet({
      contentSecurityPolicy: false,
    })(req, res, next);
  } else {
    // Строгая CSP для всех остальных маршрутов
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
    })(req, res, next);
  }
});

// Swagger documentation with language switcher
const swaggerOptions = {
  customCss: `
    .lang-switcher {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 99999;
      display: flex;
      gap: 5px;
      background: white;
      padding: 5px 10px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .lang-switcher button {
      padding: 5px 10px;
      border: 1px solid #3b4151;
      background: white;
      cursor: pointer;
      border-radius: 3px;
      font-size: 12px;
    }
    .lang-switcher button.active {
      background: #3b4151;
      color: white;
    }
    .lang-switcher button:hover {
      background: #f0f0f0;
    }
    .lang-switcher button.active:hover {
      background: #2b2d35;
    }
  `,
  customJsStr: `
    (function() {
      var currentLang = localStorage.getItem('swaggerLang') || 'en';
      var translations = ${JSON.stringify(swaggerTranslations)};

      function switchLang(lang) {
        localStorage.setItem('swaggerLang', lang);
        location.reload();
      }

      function translateText(text) {
        if (!text) return text;
        var t = translations[currentLang] || translations.en;
        return t[text.trim()] || text;
      }

      function updateSwaggerInfo() {
        var t = translations[currentLang] || translations.en;
        var info = document.querySelector('.info .title');
        if (info) {
          info.innerHTML = '<h1>' + t.title + '<small>v1.0.0</small></h1>';
        }
        var description = document.querySelector('.info .description');
        if (description) {
          description.innerHTML = '<p>' + t.description + '</p>';
        }
      }

      function translateAllElements() {
        var t = translations[currentLang] || translations.en;

        // Переводим summary (заголовки эндпоинтов) - только текст, не innerHTML
        document.querySelectorAll('.opblock-summary-description').forEach(function(el) {
          var text = el.textContent.trim();
          if (t[text] && el.textContent === text) {
            el.textContent = t[text];
          }
        });

        // Переводим description в операциях - только текст в параграфах
        document.querySelectorAll('.opblock-description-wrapper p').forEach(function(el) {
          var text = el.textContent.trim();
          if (t[text] && el.textContent === text) {
            el.textContent = t[text];
          }
        });

        // Переводим описания параметров
        document.querySelectorAll('.parameter__description').forEach(function(el) {
          var text = el.textContent.trim();
          if (t[text] && el.textContent === text) {
            el.textContent = t[text];
          }
        });

        // Переводим описания ответов
        document.querySelectorAll('.response-col_description').forEach(function(el) {
          var text = el.textContent.trim();
          if (t[text] && el.textContent === text) {
            el.textContent = t[text];
          }
        });

        // Переводим системные тексты Swagger UI
        document.querySelectorAll('.opblock-section-header h4').forEach(function(el) {
          var text = el.textContent.trim();
          if (t[text] && el.textContent === text) {
            el.textContent = t[text];
          }
        });

        // Переводим "No parameters" - только если это весь текст
        document.querySelectorAll('.opblock-body p').forEach(function(el) {
          var text = el.textContent.trim();
          if (t[text] && el.textContent === text) {
            el.textContent = t[text];
          }
        });
      }

      function addLangSwitcher() {
        if (document.querySelector('.lang-switcher')) return;
        var langSwitcher = document.createElement('div');
        langSwitcher.className = 'lang-switcher';
        var btnEn = document.createElement('button');
        btnEn.textContent = 'EN';
        btnEn.className = currentLang === 'en' ? 'active' : '';
        btnEn.onclick = function() { switchLang('en'); };
        var btnUa = document.createElement('button');
        btnUa.textContent = 'UA';
        btnUa.className = currentLang === 'ua' ? 'active' : '';
        btnUa.onclick = function() { switchLang('ua'); };
        langSwitcher.appendChild(btnEn);
        langSwitcher.appendChild(btnUa);
        document.body.appendChild(langSwitcher);
      }

      function applyTranslations() {
        updateSwaggerInfo();
        translateAllElements();
      }

      var translateTimeout = null;
      function debouncedTranslate() {
        if (translateTimeout) clearTimeout(translateTimeout);
        translateTimeout = setTimeout(function() {
          translateAllElements();
        }, 200);
      }

      // Обработчик кликов для перевода при раскрытии секций
      function setupClickHandlers() {
        document.querySelectorAll('.opblock-summary, .opblock-summary-control').forEach(function(el) {
          if (el.dataset.translateHandler) return;
          el.dataset.translateHandler = 'true';
          el.addEventListener('click', function() {
            setTimeout(function() {
              translateAllElements();
            }, 300);
          });
        });
      }

      // Wait for Swagger UI to load
      var observer = new MutationObserver(function(mutations, obs) {
        if (document.querySelector('.swagger-ui')) {
          addLangSwitcher();
          applyTranslations();
          setupClickHandlers();
          obs.disconnect();
        }
      });
      observer.observe(document, {
        childList: true,
        subtree: true
      });

      // Fallback for faster loading
      setTimeout(function() {
        addLangSwitcher();
        applyTranslations();
        setupClickHandlers();
      }, 500);

      // Повторяем перевод при раскрытии секций
      setTimeout(function() {
        applyTranslations();
        setupClickHandlers();
      }, 1500);

      // Отслеживаем изменения DOM для перевода новых элементов (с debounce)
      var translationObserver = null;
      setTimeout(function() {
        if (document.querySelector('.swagger-ui')) {
          translationObserver = new MutationObserver(function(mutations) {
            debouncedTranslate();
          });
          translationObserver.observe(document.querySelector('.swagger-ui'), {
            childList: true,
            subtree: true,
            attributes: false
          });
        }
      }, 2000);
    })();
  `,
};

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions),
);
// End of Swagger documentation with language switcher

app.use(userRoutes);
app.use(toolsRoutes);
app.use(authRoutes);
app.use(bookingsRoutes);
app.use(categoriesRoutes);
app.use(feedbacksRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
