// https://nuxt.com/docs/api/configuration/nuxt-config
export default async function defineNuxtConfig() {
  const ENV = process.env
  return {
    app: {
      baseURL: ENV.NUXT_URI,
      head: {
        title: 'App',
        link: [
          {
            hid: 'icon',
            rel: 'icon',
            type: 'image/png',
            href: '/img/favicon.png',
          },
        ],
      },
    },
    ssr: false,
    spaLoadingTemplate: './spa-loading-template.html',
    devtools: { enabled: true },
    runtimeConfig: {
      public: {
        env: ENV.NUXT_ENV,
        apiUrl: ENV.API_URL,
      },
    },
    modules: [['@nuxtjs/apollo']],
    apollo: {
      clients: {
        default: {
          httpEndpoint: `${ENV.API_URL}`,
        },
      },
    },
    imports: {
      dirs: ['~/composables', 'composables/**'],
    },
    css: ['normalize.css/normalize.css'],
    plugins: ['~/plugins/apollo.js', '~/plugins/apollo-error.js'],
    ignore: ['pages/**/*.js'],
  }
}
