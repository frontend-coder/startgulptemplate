# Start temptate Gulp4

Я зібрав новий стартовий шаблон для забеспечення швидкого старту верстки та продакш-складання інтернет-проекту на замовлення, за запропонованим Figma- або PSD-макетом. В якості  таск-менеджера використовую Gulp 4.

До стартового шблону додав normalize та найпростішу сітку, що прийнята в Web-дизайні. Ширина макету за замовченням складає 1140px. При необхідності це значення змінюється у файлі grid.css. В ньому вказані всі break-points.

До складу стартового шаблона додав:
jQuery v3.3.1
jquery.PageScroll2id v1.5.8
Magnific Popup v1.1.0
Owl Carousel v2.3.4
jquery.nicescroll v3.7.6
font-awesome-4.7.0

Щоб підключити/від'єднати потрібні/непотрібні плагіни, фрейворки, інше відкрийте файли:

```text
scss/_libs.scss
gulpfile.js
```

## Як установити стартовый шаблон

Встановіть nodejs з підтримкою npm [https://nodejs.org/en/](https://nodejs.org/en/)
Встановіть git bash, якщо не використовуете консоль, жоден термінал не встановлений на компьютері під керуванням Windows 10 [gitforwindows](https://gitforwindows.org/)

Встановіть gulp глобально. Ця операция здійснюється одноразово, для цього потрібно у консолі виконати команду

```bash
npm install gulp-cli -g
```

Щоб побачити версію Gulp, що інстальований в систему, потрібно виконати команду

```bash
gulp -v
```

На момент написання цієї інструкції отримав наступну відповідь

```text
CLI version 2.0.1
Local version 4.0.0
```

Щоб побачити версію nodejs, яка інстальована в систему, потрібно виконати команду

```bash
node -v
```

Щоб побачити перелік пакетів та версії npm, які інстальовані в систему, потрібно виконати команду

```bash
npm list -g --depth=0
```

Щоб почати работу зі стартовим пакетом потрібно:

* створити каталог, в якому буде виконуватись збірка шаблону
* розархівувати архів до створенного каталогу
* відкрити його в VSCode. Для швидкості рекомендую використувати плагін Project Manager під VSC
* в терміналі виконується команда

```bash

npm i --legacy-peer-deps

```

Якщо будуть виникати помилки потрібно виконати наступну команду

```bash

npm i

```

* через декілька хвилин всі пакети збірки будуть встановлені

## Як запустити збірку шаблону

Після завершеня інсталювання збірки виконайте команду, щоб запустити сервер:

```bash
gulp
```

За хвилиту автоматично запускается сервер, після чого в браузері відкриється головна сторінка сайту. Необхідно відкрити всі рабочі файли збірки та почати верстку шаблона.

каталог sass - писати scss-код
каталог libs/common.js - писати кастомний js-код
index.html - виконуется HTML-розмітка шаблону

* Якшо необхідно встановити додаткові плагіни jQuery або Javascript, всі їх файли розміщуються у каталозі libs.
* Якщо необхідно підключити js-файли, необхідно прописати шлях до них в файлі gulpfile.js
* Якщо з'явилася необхідність підключити файли css до збірки, потрібно прописати шлях до них в файлі app/scss/_ libs.scss
  
### Збірка сторінок сайту

В стартому шаблоні передбачено 2 варінта сбірки сторінок html. Якщо ідетья про верстку багатосторінкового шаблону з багаться однаковими блоками на них, верстальщик створює декілька основних файлів-сторінок, які повинні вхолдими до складу шалону. Наприклад:

```text

index.html
single.html
category.html
  
```

Кожна сторінка може складатися із блоків-компонентів. Вони можуть одночасно присутніми на декількох сторінках. В вищенаведених файлах прописуеться назва компонентів таким чином:

```text
<!--=include header.html -->
```

Тобто компонент має назву header.html, в ньому розміщений код, який повинен бути в шапці шаблону. Ці файли в любій кількості повинні розмішуватися в папці:

```text

app/components
  
```

Другий варінт збірки полягає в тому, що весь код пишеться в файлі index.html, що розміщений в каталозі pages, і в нього не підключаються жодні компоненти.  

### Оптимізація файлів зображень

Ви зберігаєте файли зображень в форматах svg, jpg, png. Їх Потрібно розмістити в каталозі:

```text

app/img/src
  
```

В автоматичному режимі вони мінімізуться і переміщаться в каталог:

 ```text

app/img
  
```

Крім того генеруються зображення в форматах webp та avif. Далі ви можете вставиляти зображення на сторінку за допомогою тега:

```html

<img>  
  
```

В цьому разі використовуються файли jpg та png. ніяка оптимізація сторінок не виконується. Щоб у браузера був вибір завантаження оптимального файла потрібно використовувати тег picture таким чином:

```html

    <picture>
      <source type="image/avif" srcset="img/picture-name.avif">
      <source type="image/webp" srcset="img/picture-name.webp">
      <img src="img/picture-name.jpg" alt="picture alt" title="picture title">
   </picture> 
  
```

### Генерація шрифтів

Якщо вам не надані web шрифти до проекту, загрузіть в каталог шрифти в форматі ttf або otf.

```text

app/fonts/src
  
```

Виконайте одноразово команду

```bash

gulp fonts

```

Всі шрифти будуть складатися в каталог

```text

app/fonts
  
```

Вони підключиться в файлі:

```text

app/scss/_fonts.scss
  
```

### Як створити svg спрайт

Такий файл може вміщувати в себе багато елементів для декорування сторінок сайту, завантажуватися один раз и використовуватися одночасно в декількох місцях сторінки/сторінок.

Щоб створити спрайт потрібно всі файли в формати svg завантажити в каталог

```text

app/img/sprite
  
```

Виконати команду

```bash

gulp sprite

```

В підсумку виконання процессу створення svg спрайту отримуемо

* сам файл svg, він має назву sprite.svg і він розміщується в каталозі app/img/
* каталог symbol в якому розміщений файл html, с інструкцією підключення спрайту в документ
* каталог symbol вміщає файл _sprite.scss, в якому зібрані стилі оформлення спрайту.

### Фінальна збірка шаблона

В терміналі виконайте команду

```bash
gulp build
```

## Точки зламу для адаптації під усі мобільні пристрої

   1. 1920 - базова точка
   2. 1680 - додаткова точка
   3. 1440 - базова точка
   4. 1336 - базова точка
   5. 1280 - додаткова точка
   6. 1200 - базова точка
   7. 1190 - базова точка
   8. 1080 - базова точка
   9. 1024 - базова точка
   10. 992 - базова точка
   11. 980 - базова точка
   12. 834 - додаткова точка
   13. 812 - додаткова точка
   14. 815 - базова точка
   15. 800 - базова точка
   16. 768 - базова точка
   17. 740 - базова точка
   18. 736 - базова точка
   19. 734 - додаткова точка
   20. 684 - додаткова точка
   21. 667 - базова точка
   22. 640 - додаткова точка
   23. 600 - базова точка
   24. 568 - базова точка
   25. 480 - базова точка
   26. 425 - додаткова точка
   27. 414 - додаткова точка
   28. 412 - додаткова точка
   29. 387 - базова точка
   30. 384 - додаткова точка
   31. 375 - додаткова точка
   32. 360 - додаткова точка
   33. 320 - базова точка

## Контроль за якістью кода

За умовчуванням виконане налаштування котролю  за якістью написанного коду в процессі роботи. До зборки додані такі інструменти:

* Eslint
* Prettier
* Stylelint
  
Для активації цих інструментів використовуйте IDE VSCode да встановіть такі плагіни:

* Prettier - Code formatter
* ESLint | Dirk Baeumer
* vscode-stylelint

## Зв`язатися зі мною з питань розробки сайті під ключ

[![facebook](https://img.shields.io/badge/-Facebook-1877F2?style=for-the-badge&logo=Figma&logoColor=eeffff)](https://www.facebook.com/frontendercode)
[![Telegram](https://img.shields.io/badge/-Telegram-26A5E4?style=for-the-badge&logo=Telegram&logoColor=eeffff)](https://t.me/frontendcoder)
[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=for-the-badge&logo=Instagram&logoColor=eeffff)](https://www.instagram.com/frontendercode/?hl=ru)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=eeffff)](https://github.com/frontend-coder)
[![Portfolio](https://img.shields.io/badge/-Портфолио-181717?style=for-the-badge&logo=Internet-Archive&logoColor=eeffff)](https://frontend-coder.github.io)
