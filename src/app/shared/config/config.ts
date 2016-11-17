export let Config = {
    import: [
        'app/shared/config/cache.json',
        'app/shared/i18n/lang_en.json',
        'app/shared/i18n/lang_es.json'
    ],

    appLang: 'en',
    availableLangs: [
        { label: 'EN', value: 'en' },
        { label: 'ES', value: 'es' }
    ],

    security: {
        mode: 'off' // on, off
    },

    ui: {
        langselector: 'std', // std, primeng
        messages: 'growl' // inline, growl
    },

    api: {
    }
};
