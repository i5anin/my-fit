import { createApp } from 'vue';
import { toast } from 'mhz-ui';

import App from './App.vue';

import { VueQueryPlugin, vueQueryOptions } from '@/common/plugins/query';
import { setBaseURL } from '@/common/plugins/api';

import router from '@/common/router';
import { TOKEN_NAME, URL_LOGIN } from '@/auth/constants';

import '@/common/styles/main.scss';

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin, vueQueryOptions(toast, URL_LOGIN, TOKEN_NAME));

setBaseURL(import.meta.env.VITE_API);

app.mount('#app');
