module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                useBuiltIns: 'entry',
                corejs: 2
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        ["@babel/transform-runtime"]
    ]
}