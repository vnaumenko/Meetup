module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['prettier', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    JSX: false,
  },
  plugins: ['react', 'prettier'],
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      //      "fragment": "React.Fragment",
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.sass', 'scss', '.json', '.svg'],
        paths: ['public', 'lib'],
      },
    },
  },
  rules: {
    // MAIN
    camelcase: 0,
    // default в CASE должен стоять на последнем месте
    'default-case-last': 2,
    // default параметры в функция должны быть в конце списка
    'default-param-last': 2,
    // при переносе свойства объекта на новую строку - точка должна быть со свойством
    'dot-location': [2, 'property'],
    // Всегда необходимо сравнение без приведения типов
    eqeqeq: [2, 'always'],
    // Никаких табов
    'no-tabs': 2,
    // В цикле for-in должна быть проверка (чтобы не проходить по лишним ключам)
    'guard-for-in': 2,
    // Максимум 2 класса в файле
    'max-classes-per-file': [2, 2],
    // Предупреждение об использовании alert, console, debugger
    'no-alert': 1,
    'no-console': 1,
    'no-debugger': 1,
    // Отключение деклараций в case. Задекларированная в case переменная видна во всём блоке switch
    'no-case-declarations': 2,
    // Из конструктора класса нельзя возвращать значение
    'no-constructor-return': 2,
    // После return в if не нужен else
    'no-else-return': [2, { allowElseIf: false }],
    // Запрещены пустые функции
    'no-empty-function': [2, { allow: [] }],
    // Запрещена пустая деструтуризация
    'no-empty-pattern': 2,
    // Запрещена функция eval и eval-like функции и javascript url
    'no-eval': 2,
    'no-implied-eval': 2,
    'no-script-url': 2,
    // Запрещён bind в функциях, где он не нужен
    'no-extra-bind': 2,
    // Перед case в switch должен быть оператор, прерывающий предыдущий case
    'no-fallthrough': 2,
    // Float не должен начинаться и заканчивать точкой
    'no-floating-decimal': 2,
    // Нельзя делать re-assign глобальных переменных
    'no-global-assign': 2,
    // Отключение приведения типов короткими способами
    'no-implicit-coercion': [2, { boolean: true, number: true, string: true, allow: [] }],
    // Отключение использования __iterator__
    'no-iterator': 2,
    // Отключение использования labels
    'no-labels': 2,
    'no-unused-labels': 2,
    'no-label-var': 2,
    // Запрет необязательных блоков из фигурных скобок
    'no-lone-blocks': 2,
    // Запрет на использование пустых блоков из фигурных скобок
    'no-empty': 2,
    // Запрет циклов, в которых могут быть проблемы
    'no-loop-func': 2, // с областью видимости
    'for-direction': 2, // с направлением переменной, ответственной за цикл
    // Запрет использования чисел в выражениях, без присваивания их константам
    // СТРОГОЕ ПРАВИЛО! Константы надо использовать даже при присваивании чисел свойствам объекта
    'no-magic-numbers': [
      2,
      { ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 60, 100, 1024], detectObjects: false },
    ],
    // Запрет лишних пробелов в строчке кода
    'no-multi-spaces': 2,
    // Запрет использования нескольких строк в одной строке с использованием \
    'no-multi-str': 2,
    // Запрещено использование new без дальнейшего использования (сайд эффекты)
    'no-new': 2,
    // Запрет использования синтаксиса new Function
    'no-new-func': 2,
    // Запрет на явное использование врапперов примитивов (new Boolean(false)), так как они возвращают объект
    'no-new-wrappers': 2,
    // Запрет на использование восьмеричных чисел с первым знаком 0
    'no-octal': 2,
    // Запрет на re-asign параметров в функциях. Изменять свойства объекта разрешено
    'no-param-reassign': 2,
    // Заперт на старый синтаксис __proto__
    'no-proto': 2,
    // Запрет на повторную декларации переменной с одинаковым идентификатором при использовании var
    'no-redeclare': 0,
    // Запрет на return с выражением присваивания в нём
    'no-return-assign': [2, 'always'],
    // Запрет на return await (Заполняет один ненужный микротаск)
    'no-return-await': 2,
    // Запрещено присваивание нового идентификатора переменной без создания новой ссылки
    'no-self-assign': 2,
    // Запрещено сравнивание переменной самой с собой
    'no-self-compare': 2,
    // Запрещён оператор запятая
    'no-sequences': 2,
    // В оператор throw запрещено использовать примитивы
    'no-throw-literal': 2,
    // Предупреждение, если в шаге цикла никак явно не изменяется сущность, от которой зависит цикл
    'no-unmodified-loop-condition': 1,
    // Запрет на выражение, которые не используются в коде (a && b() разрешены)
    'no-unused-expressions': [2, { allowShortCircuit: true }],
    // Запрет на использование call и apply, которые не изменяют this
    'no-useless-call': 2,
    // Запрет на использование throw блока, который никак не обрабатывает ошибку, помимо дальнейшего пробрасывания
    'no-useless-catch': 2,
    // Запрет на контакенцию строк, представленных литералами, а не переменными
    'no-useless-concat': 2,
    // Запрет на использование ненужных escape слэшей
    'no-useless-escape': 2,
    // Запрет на использование ненужного return
    'no-useless-return': 2,
    // Запрет на использование void оператора
    'no-void': 2,
    // Запрет на использование конструкции with
    'no-with': 2,
    // Промисы должны реджектить только ошибки
    'prefer-promise-reject-errors': 2,
    // В parseInt и parseFloat необходимо указывать второй параметр
    radix: 2,
    // В async функциях обязателен await
    'require-await': 2,
    // Декларация var обязательно должна находится сверху текущего scope
    'vars-on-top': 2,
    // Оборачивание IIFE в формат (function(){})();
    'wrap-iife': [2, 'inside'],
    // Запрет на Yoda сравнения (когда литерал идёт первым в сравнении)
    yoda: [2, 'never'],

    // Запрет на использование async экзекьютора в промисах
    'no-async-promise-executor': 2,
    // Запрет на сравнение с -0
    'no-compare-neg-zero': 2,
    // Запрет на выражение присваивания в сравнениях
    'no-cond-assign': [2, 'always'],
    // Запрет на использование ОДНОЙ константы в выражениях сравнения. Разрешены константы для бесконечного цикла
    'no-constant-condition': [2, { checkLoops: false }],
    // Запрет на использование дублирующихся аргументов в объявлении функции
    'no-dupe-args': 2,
    // Запрет на дублирующиеся else-if
    'no-dupe-else-if': 2,
    // Запрет на дублирующиеся имена свойств в объектах
    'no-dupe-keys': 2,
    // Запрет на дублирующиеся case в конструкциях switch
    'no-duplicate-case': 2,
    // Запрет на re-asign параметра ошибки в catch блоке
    'no-ex-assign': 2,
    // Запрет на использование излишнего приведения к логическому значению
    'no-extra-boolean-cast': [2, { enforceForLogicalOperands: true }],
    // Запрет на использование излишних скобок
    'no-extra-parens': 0,
    // Запрет на использование излишних точек с запятой
    'no-extra-semi': 2,
    // Запрет на присваивание переменным объявленных Function Declaration
    'no-func-assign': 2,
    // Запрет на re-asign идентификаторов, полученных из import
    'no-import-assign': 2,
    // Объявлять функции и var возможно только на первом уровне области видимости других функций
    'no-inner-declarations': [2, 'both'],
    // Предупреждения о номерах, которые потеряют точность в компиляторе JS
    'no-loss-of-precision': 1,
    // Запрет на вызов Math, JSON, Reflect и Atomics как функций
    'no-obj-calls': 2,
    // Запрет на возврат значений через return из промисов
    'no-promise-executor-return': 2,
    // Запрет на использование методов Object напрямую из пользовательских объектов
    'no-prototype-builtins': 2,
    // Запрет на использование массивов с "дырами" [1,,5]
    'no-sparse-arrays': 2,
    // Предупреждение об использовании ${} в обычных строках
    'no-template-curly-in-string': 1,
    // Запрет на использование выражений на нескольких строках, которые могут быть неверно интерпертированы
    'no-unexpected-multiline': 2,
    // Запрет на использование кода, который не выполнится (например, после return)
    'no-unreachable': 2,
    // Запрет на использование циклов, которые никогда не достигнут второй итерации
    'no-unreachable-loop': 2,
    // Запрет на использование return, throw, break и continue в блоке finally
    'no-unsafe-finally': 2,
    // Запрет на использование отрицаний, которые могут спровоцировать ошибки
    'no-unsafe-negation': [2, { enforceForOrderingRelations: true }],
    // Для сравнений на NaN нужно использовать isNaN
    'use-isnan': 2,
    // Запрет на использование в сравнении с typeof неккоректных литералов типов
    'valid-typeof': 2,

    // Запрет на удаление переменных, объявленных через var
    'no-delete-var': 2,
    // Запрет на использование идентификаторов с одинаковыми именами в разных областях видимости
    'no-shadow': 0,
    // Запрет на присваивание идентификаторов глобальных переменных в нижестоящих областях видимости
    'no-shadow-restricted-names': 2,
    // Запрет на использование необъявленных переменных
    'no-undef': [2, { typeof: true }],
    // Запрет на использование сущностей перед их объявлением (отключение, так как есть typescript правило)
    'no-use-before-define': 0,

    // Если возможно не использовать фиурные стрелки в стрелочной функции - не использовать их
    'arrow-body-style': [2, 'as-needed', { requireReturnForObjectLiteral: false }],
    // Всегда использовать скобки в параметрах стрелочных функций
    'arrow-parens': 2,
    // Необходимость пробелов в стрелке стрелочной функции
    'arrow-spacing': [2, { before: true, after: true }],
    // Запрет на неисользование/некорректное использование super в конструкторах
    'constructor-super': 2,
    // В генераторах звёздочка ставится после function
    'generator-star-spacing': [2, 'after'],
    // Запрет на re-assign идентификаторов классов
    'no-class-assign': 2,
    // Запрет на использование стрелочных функций в местах, где они могут быть неправильно поняты (сравнения)
    'no-confusing-arrow': 2,
    // Запрет на reassign переменных, объявленных через const
    'no-const-assign': 2,
    // Запрет на использование полей класса с одинаковыми именами
    'no-dupe-class-members': 2,
    // Запрет на импорт/экспорт сущностей из модуля в разных строках
    'no-duplicate-imports': [2, { includeExports: true }],
    // Запрет на использование конструкции new Symbol
    'no-new-symbol': 2,
    // Запрет на использование this перед super
    'no-this-before-super': 2,
    // Запрет на использование излишних вычисляемых свойств
    'no-useless-computed-key': 2,
    // Запрет на использование излишних конструкторов
    'no-useless-constructor': 2,
    // Запрет на ненужное переименовывание при импорте/экспорте/деструктуризации
    'no-useless-rename': [
      2,
      { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false },
    ],
    // Запрет на использование var
    'no-var': 2,
    // Свойства объектов необходимо записывать в сокращённой форме
    'object-shorthand': [2, 'always'],
    // Необходимость использования стрелочных функций в местах, где функция выступает в роли колбека
    'prefer-arrow-callback': 2,
    // Приоритет в использовании const, а не let
    'prefer-const': 2,
    // Необходимость использования деструктурицазации при работе с объектами и массивами
    'prefer-destructuring': [
      2,
      { array: true, object: true },
      { enforceForRenamedProperties: true },
    ],
    // Для того, чтобы получить 2/8/16-чное число необходимо использовать литералы, а не parseInt
    'prefer-numeric-literals': 2,
    // Запрет на использование arguments в функциях, использование rest параметров вместо этого
    'prefer-rest-params': 2,
    // Запрет на использование prototype.apply() в местах где вместо этого может быть использован spread оператор
    'prefer-spread': 2,
    // Запрет на использование контакенции строк в местах, не можно использовать template string
    'prefer-template': 2,
    // Функции генераторы обязаны иметь yield
    'require-yield': 2,
    // Между операторами rest и spread и операндом этих операциях не должно быть пробела
    'rest-spread-spacing': [2, 'never'],
    // Импорты необходимо выстраивать в алфавитном порядке
    //    "sort-imports": [2, { "memberSyntaxSortOrder": ["none", "all", "multiple", "single"] ,"allowSeparatedGroups": true }],
    // При создании сиволов обязателен ввод описания
    'symbol-description': 2,
    // В шаблонных строках не допускается использование пробелов в месте ввода переменной
    'template-curly-spacing': [2, 'never'],
    // В генераторах звёздочка допускается только после funciton
    'yield-star-spacing': [2, 'after'],

    // REACT
    'react/boolean-prop-naming': [
      2,
      {
        propTypeNames: ['boolean'],
        rule: '^is[A-Z]([A-Za-z0-9]?)+',
        //        "message": "Неккоректное имя свойства ({{ propName }}). Boolean свойство должно начинаться с is|are|has|have|was|will"
      },
    ],
    // Кнопки должны иметь атрибут type
    'react/button-has-type': 2,
    // Default Props должны соответствовать типу Props. Для обязательных props не должно быть default props
    'react/default-props-match-prop-types': 2,
    // Все данные в компоненте необходиму деструктурировать (props/state/context)
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    // Для каждого компонента необходимо указывать displayName (помогает в дебаггинге)
    'react/display-name': 2,
    // TODO написать правило
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    // Запрет на доступ к this.state в setState
    'react/no-access-state-in-setstate': 2,
    // Запрет на использование индекса массива в качестве key
    'react/no-array-index-key': 2,
    // Запрет на использование children prop
    'react/no-children-prop': 2,
    // Запрет на использование dangerous JSX props
    'react/no-danger': 2,
    // Запрет на использование deprecated и unsafe React методов
    'react/no-deprecated': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    'react/no-unsafe': 2,
    // Запрет на setState в методах componentDidMount и componentDidUpdate
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 2,
    // Запрет на прямое изменение state
    'react/no-direct-mutation-state': 2,
    // Запрет на декларацию нескольких компонентов в одном файле
    'react/no-multi-comp': 2,
    // Запрет на использование shouldComponentUpdate в PureComponent
    'react/no-redundant-should-component-update': 2,
    // Запрет на использование значения, возвращаемого ReactDOM.render
    'react/no-render-return-value': 2,
    // Запрет на исопльзование строковых Ref в классовых компонентах
    'react/no-string-refs': [2, { noTemplateLiterals: true }],
    // Запрет на использование this в SFC
    'react/no-this-in-sfc': 2,
    // Запрет на использование неэкранированных >, ", \, } внутри JSX
    'react/no-unescaped-entities': 2,
    // Запрет на state, который не используется в компоненте
    'react/no-unused-state': 2,
    // Запрет на использование createReactClass
    'react/prefer-es6-class': [2, 'always'],

    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,

    'no-nested-ternary': 2,

    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'jsx-quotes': [2, 'prefer-double'],
  },
};
