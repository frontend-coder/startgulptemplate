# Start temptate Gulp4

Я собрал этот стартовый шаблон специально для того, чтобы быстро приступить к верстке шаблона по предоставленному PSD-макету. В качестве сборщика использую Gulp 4.

К стартовому шаблону присоединил normalize и самую простую сетку для верстки под обычному макету. ширина макета по умолчанию принята величина 1140px.

К макету по умолчанию присоединил:
jQuery v3.3.1
jquery.PageScroll2id v1.5.8
Magnific Popup v1.1.0
Owl Carousel v2.3.4
jquery.nicescroll v3.7.6
font-awesome-4.7.0

Чтобы подключить/отключить другие плагины, фрейворки и так далее к шаблоны откройте файлы:

```
scss/_libs.scss
gulpfile.js
```

Этот стартовый шаблон предназначен для сборки HTML5 шаблонов любой сложности с помощью Gulp4. Макет подготовлен к адаптивной верстке шаблона.

Стартовый шаблон ничем не перегружен и способен только собрать стили и скрипты в один файл соответственно, собрать продакт-версию для размещения сверстанного шаблона на хостинг.

### Как установить стартовый шаблон

Установите nodejs с поддержкой npm [https://nodejs.org/en/](https://nodejs.org/en/)
Установите git bash, если вы не используете консоль и они не установлена на компьютере под управлением Windows 10 [gitforwindows](https://gitforwindows.org/)

Установите gulp глобально. Эта операция выполняется только один раз на установленную операционную систему. Для этого в консоли пропишите команду

```
npm install gulp-cli -g
```

Чтобы узнать какая версия Gulp установлена, пропишите команду

```
gulp -v
```

На момент написания этой инструкции получил следующий ответ

```
CLI version 2.0.1
Local version 4.0.0
```

Чтобы узнать какая версия nodejs установлена, пропишите команду

```
node -v
```

Чтобы узнать какие пакеты и версии пакетов npm установлены, пропишите команду

```
npm list -g --depth=0
```

Разархивируйте скачанный стартовый пакет шаблона, переместите его в каталог, в котором будет выполняться вся разработка. Откройте его в консоли. Пропишите команду

```
npm i
```

Будет выполняться установка всех модулей Gulp. После завершения установки пропишите помаду для запуска сервера:

```
gulp
```

Необходимо открыть файлы и выпоолнять верстку шаблона.

каталог sass - прописывать стили для оформления шаблона
каталог libs/common.js - прописывать стили для оформления шаблона
index.html - верстка шаблона

Если есть необходимость установить плагины jQuery, все каталоги разместите в калалоге libs.
Чтобы подключить js-файлы прописывать путь к ним в файле gulpfile.js
Чтобы подключить файлы css, пропишите пути к ним в файле app/scss/ \_ libs.scss

### Финальная сборка шаблона

В консоли наберите команду

```
gulp build
```



