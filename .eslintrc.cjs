const messages = {
    undefined: "Use typeof checks instead of undefined comparisons.",
    emptyString: "Use Util.empty instead of direct empty-string comparisons.",
    emptyLength: "Use Util.empty instead of direct length/size emptiness comparisons.",
    singleLength: "Use Util.single or Util.multiple instead of direct single-item length/size comparisons.",
    rawError: "Use a repo error class instead of raw Error."
};

const undefinedSelectors = [
    "BinaryExpression[operator='==='] > Identifier[name='undefined']",
    "BinaryExpression[operator='!=='] > Identifier[name='undefined']"
];

const emptyStringSelectors = [
    "BinaryExpression[operator='==='][left.value='']",
    "BinaryExpression[operator='==='][right.value='']",
    "BinaryExpression[operator='!=='][left.value='']",
    "BinaryExpression[operator='!=='][right.value='']",
    "BinaryExpression[operator='=='][left.value='']",
    "BinaryExpression[operator='=='][right.value='']",
    "BinaryExpression[operator='!='][left.value='']",
    "BinaryExpression[operator='!='][right.value='']"
];

const emptyLengthSelector = [
    "BinaryExpression[left.type='MemberExpression'][left.property.name=/^(length|size)$/][operator=/^(===|==|<=)$/][right.value=0]",
    "BinaryExpression[left.type='MemberExpression'][left.property.name=/^(length|size)$/][operator='<'][right.value=1]",
    "BinaryExpression[left.value=0][operator=/^(===|==|>=)$/][right.type='MemberExpression'][right.property.name=/^(length|size)$/]",
    "BinaryExpression[left.value=1][operator='>'][right.type='MemberExpression'][right.property.name=/^(length|size)$/]",
    "BinaryExpression[left.type='MemberExpression'][left.property.name=/^(length|size)$/][operator=/^(!==|!=|>)$/][right.value=0]",
    "BinaryExpression[left.type='MemberExpression'][left.property.name=/^(length|size)$/][operator='>='][right.value=1]",
    "BinaryExpression[left.value=0][operator=/^(!==|!=|<)$/][right.type='MemberExpression'][right.property.name=/^(length|size)$/]",
    "BinaryExpression[left.value=1][operator='<='][right.type='MemberExpression'][right.property.name=/^(length|size)$/]"
].join(", ");

const singleLengthSelector = [
    "BinaryExpression[left.type='MemberExpression'][left.property.name=/^(length|size)$/][operator=/^(===|==|!==|!=|>|<|>=|<=)$/][right.value=1]",
    "BinaryExpression[left.value=1][operator=/^(===|==|!==|!=|>|<|>=|<=)$/][right.type='MemberExpression'][right.property.name=/^(length|size)$/]"
].join(", ");

const rawErrorSelectors = [
    "ThrowStatement > NewExpression[callee.name='Error']",
    "ThrowStatement > CallExpression[callee.name='Error']"
];

const makeRules = (selectors, message) => {
    return selectors.map(selector => ({
        selector,
        message
    }));
};

const undefinedRules = makeRules(undefinedSelectors, messages.undefined),
    emptyStringRules = makeRules(emptyStringSelectors, messages.emptyString),
    emptyLengthRules = [
        {
            selector: `:matches(${emptyLengthSelector})`,
            message: messages.emptyLength
        }
    ],
    singleLengthRules = [
        {
            selector: `:matches(${singleLengthSelector})`,
            message: messages.singleLength
        }
    ],
    rawErrorRules = makeRules(rawErrorSelectors, messages.rawError);

const appRules = [...undefinedRules, ...emptyStringRules, ...emptyLengthRules, ...singleLengthRules, ...rawErrorRules],
    utilJsRules = [...undefinedRules, ...rawErrorRules];

module.exports = {
    parser: "@babel/eslint-parser",
    env: {
        node: true,
        es2023: true
    },
    extends: "eslint:recommended",
    ignorePatterns: ["test/**", "vendor/**"],
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            plugins: ["@babel/plugin-syntax-import-assertions"]
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["unused-imports"],
    rules: {
        "no-unused-vars": "off",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                vars: "all",
                varsIgnorePattern: "^(resolve|reject|_)$",
                args: "none"
            }
        ],
        "unused-imports/no-unused-imports": "error",
        "no-duplicate-imports": "error",
        "no-ex-assign": "off",
        "no-case-declarations": "off",
        "no-empty": "off",
        eqeqeq: ["error", "always", { null: "ignore" }],
        "no-restricted-syntax": ["error", ...undefinedRules],
        curly: ["error", "all"],
        "no-template-curly-in-string": "warn",
        "object-shorthand": ["warn", "properties"],
        "require-await": "error"
    },
    globals: {
        projRoot: "readonly",
        projRootUrl: "readonly"
    },
    overrides: [
        {
            files: ["src/**/*.js", "scripts/**/*.js"],
            rules: {
                "no-restricted-syntax": ["error", ...appRules]
            }
        },
        {
            files: ["src/util/**/*.js"],
            rules: {
                "no-restricted-syntax": ["error", ...utilJsRules]
            }
        }
    ]
};
