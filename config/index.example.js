module.exports = {
    PRIVATE_TOKEN: '<your_private_token>',
    baseURL: 'https://gitlab.com/api/v4/',
    types: {
        react: 'https://github.com/SibdevPro/react-typescript-stub',
        django: 'https://github.com/SibdevPro/backend-stub',
        vue: 'https://github.com/SibdevPro/vue-stub'
    },
    accessLevels: {
        Guest: 10,
        guest: 10,
        Reporter: 20,
        reporter: 20,
        Developer: 30,
        developer: 30,
        Maintainer: 40,
        maintainer: 40
    },
    namespace_id: 4076980
}
