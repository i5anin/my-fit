import { createApp } from 'vue';
import { toast } from 'mhz-ui';

import App from './App.vue';

import { VueQueryPlugin, vueQueryOptions } from '@/common/plugins/query';
import { setBaseURL } from '@/common/plugins/api';

import router from '@/common/router';
import { TOKEN_NAME } from '@/auth/constants';
import { URL_HOME } from '@/common/constants';

import '@/common/styles/main.scss';

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin, vueQueryOptions(toast, URL_HOME, TOKEN_NAME));

setBaseURL(import.meta.env.VITE_API);

app.mount('#app');
