<template>
    <div style="height:300px;">
        <LoginMenu />

        <ValidationObserver
            ref="loginForm"
            tag="form"
            @submit.stop.prevent="login"
        >
            <div class="grid gap-2">
                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|email"
                    name="E-mail"
                >
                    <input
                        v-model="email"
                        type="text"
                        placeholder="Digite seu e-mail"
                        class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                    >

                    <div
                        v-if="!!errors[0]"
                        class="text-red-500 text-sm mb-2"
                    >
                        {{ errors[0] }}
                    </div>
                </ValidationProvider>

                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="Senha"
                >
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Digite sua senha"
                        class="bg-gray-900 placeholder-gray-700 text-gray-500 font-light border border-gray-900 focus:outline-none focus:border-blue-800 rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                    >

                    <div
                        v-if="!!errors[0]"
                        class="text-red-500 text-sm mb-2"
                    >
                        {{ errors[0] }}
                    </div>
                </ValidationProvider>
                
                <button 
                    type="submit"
                    class="flex items-center justify-center bg-blue-800 text-blue-200 font-medium text-sm focus:outline-none rounded-sm py-3 px-4 block w-full appearance-none leading-normal"
                >
                    ENTRAR
                </button>

                <div class="my-4 text-center">
                    <RouterLink
                        :to="{ name: 'forgot-password'}"
                        class="text-sm font-light"
                    >
                        Esqueci minha senha
                    </RouterLink>
                </div>
            </div>
        </ValidationObserver>
    </div>
</template>

<script>
    import LoginMenu from '@/components/Auth/LoginMenu';
    import Cookie from 'js-cookie';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';

    export default {
        name: 'Login',

        components: {
            LoginMenu,
            ValidationObserver,
            ValidationProvider,
        },

        data() {
            return {
                email: '',
                password: '',
            };
        },

        methods: {
            async login() {
                const validator = await this.$refs.loginForm.validation();
                if (!validator) { return; }

                const payload = {
                    email: this.email,
                    password: this.password,
                };

                this.$axios.post('v1/login', payload).then((response) => {
                    const token = `${response.data.token_type} ${response.data.access_token}`;
                    Cookie.setToken(token);

                    this.$store.commit('user/STORE_USER', response.data.data);
                });
            },
        },
    };
</script>