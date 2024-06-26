
const { createApp, reactive, onMounted, onBeforeUnmount, toRefs } = Vue;

const app = Vue.createApp({
    setup() {
        const state = reactive({
            loading: true,
            darkTheme: localStorage.getItem('theme') === 'dark',
            spinnerAnimationStyle: '',
            currentView: 'homebody',
            currentMessageIndex: 0,
        });

        function initTheme() {
            const storedTheme = localStorage.getItem('theme') || 'light';
            setTheme(storedTheme);
            setTimeout(() => { handleVideoEnd(); }, 25000);
        }

        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            state.darkTheme = theme === 'dark';
            const videoElement = document.getElementById('video-source');
            const backgroundVideo = document.getElementById('background-video');
            if (videoElement && backgroundVideo) {
                videoElement.src = theme === 'dark' ? 'images/black.mp4' : 'images/white.mp4';
                backgroundVideo.load();
            }
            setTimeout(() => { handleVideoEnd(); }, 25000);
        }

        function handleVideoEnd() {
            const backgroundVideo = document.getElementById('background-video');
            if (backgroundVideo) {
                backgroundVideo.pause();
            }
        }

        function changeMessage() {
            const messages = document.querySelectorAll('#Home-info2 p');
            if (messages.length === 0) return;

            let previousIndex = state.currentMessageIndex;
            state.currentMessageIndex = (state.currentMessageIndex + 1) % messages.length;

            messages[previousIndex].classList.add('fade-out');
            messages[previousIndex].classList.remove('fade-in');

            messages[state.currentMessageIndex].classList.add('fade-in');
            messages[state.currentMessageIndex].classList.remove('fade-out');
        }


        function toggleTheme() {
            state.darkTheme = !state.darkTheme;
            setTheme(state.darkTheme ? 'dark' : 'light');
        }

        function applySpinnerAnimation() {
            state.spinnerAnimationStyle = 'spin 2s linear infinite, scaleAndFade 2s ease-in forwards';
        }

        function changeView(view, event) {
            event.preventDefault();
            state.currentView = view;
        }

        onMounted(() => {
            setTimeout(() => {
                state.loading = false;
            }, 3000);

            initTheme();
            setTimeout(() => {
                const spinner = document.querySelector('#loadingAnimation .spinner');
                const loadingAnimation = document.getElementById('loadingAnimation');
                const mainContent = document.getElementById('mainContent');

                if (spinner && loadingAnimation && mainContent) {
                    spinner.style.animation = state.spinnerAnimationStyle;

                    setTimeout(() => {
                        loadingAnimation.style.display = 'none';
                        mainContent.style.display = 'block';
                    }, 1000);
                }
            }, 3000);

            setInterval(changeMessage, 5000);
        });

        onBeforeUnmount(() => {

        });

        return {
            ...toRefs(state),
            initTheme,
            setTheme,
            handleVideoEnd,
            changeMessage,
            toggleTheme,
            applySpinnerAnimation,
            changeView
        };
    },
});

app.component('sobre-component', {
    data() {
        return {
            // Dados do componente
        };
    },
    methods: {
        updateBodyStyle() {
            if (document && document.body) {
                document.body.style.background = 'var(--background_sobre)';
            }
        },
        resetBodyStyle() {
            if (document && document.body) {
                document.body.style.background = 'var(--color-primary-background)';
            }
        }
    },
    mounted() {
        this.updateBodyStyle();
    },
    beforeUnmount() { // Antes era beforeDestroy
        this.resetBodyStyle();
    },
    template: `
    <div class="sobre">
    <div class="content">
        <div class="container">
            <div class="main-heading">
                <h2>Sobre [Analytica]</h2>
            </div>

            <section class="subtexto_sobre">
                <h2>VisÃ£o Geral</h2>
                <p>Oferecemos consultoria especializada em gestÃ£o orientada a dados, capacitando sua empresa a tomar
                    decisÃµes assertivas e impulsionar o crescimento. Combinamos expertise em anÃ¡lise de dados com
                    soluÃ§Ãµes personalizadas, desbravando insights cruciais para o sucesso do seu negÃ³cio. Na
                    [Analytica], transformamos nÃºmeros em estratÃ©gias, guiando-o pelo caminho da excelÃªncia em decisÃµes
                    e resultados impactantes. Descubra o poder dos dados conosco e eleve sua performance a novos
                    patamares!</p>
            </section>

            <section class="subtexto_sobre">
                <h2>InformaÃ§Ãµes da Empresa</h2>
                <ul>
                    <li><strong>Setor:</strong> ServiÃ§os de dados de tecnologia da informaÃ§Ã£o</li>
                    <li><strong>Tamanho da Empresa:</strong> 2-10 funcionÃ¡rios</li>
                    <li><strong>Sede:</strong> Salvador, Bahia</li>
                    <li><strong>Fundada em:</strong> 2023</li>
                    <li><strong>EspecializaÃ§Ãµes:</strong> dados, data science, ciÃªncia de dados, tecnologia,
                        programaÃ§Ã£o, automaÃ§Ã£o, AWS, cloud, anÃ¡lise de dados, data analytics, gestÃ£o, organizaÃ§Ã£o,
                        Python, banco de dados, SQL e NoSQL.</li>
                </ul>
            </section>
        </div>
    </div>
</div>
    `
});

app.component('login-component', {
    data() {
        return {
            // Dados do componente
        };
    },
    methods: {
        updateBodyStyle() {
            document.body.style.background = 'var(--background_sobre)';
        },
        resetBodyStyle() {
            document.body.style.background = 'var(--color-primary-background)';
        }
    },
    mounted() {
        this.updateBodyStyle();
    },
    beforeUnmount() { // Antes era beforeDestroy
        this.resetBodyStyle();
    },
    template: `
            <div class="login-container">
            <form action="" method="POST">
                <h3>Login</h3>

                <div class="login-input-group login-email-input-group">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" value="" required autofocus>
                </div>

                <div class="login-input-group">
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" required>
                </div>

                <div class="login-input-group">
                    <button type="submit" class="login-button-submmit">Login</button>
                </div>

                <div class="login-input-group">
                    <a class="login-a" href="">Esqueceu a senha?</a>
                </div>
            </form>
        </div>
    `
});

app.component('homebody-component', {
    data() {
        return {
            content: '',
            videoSource: localStorage.getItem('theme') === 'dark' ? 'images/black.mp4' : 'images/white.mp4',
            currentMessageIndex: 0,
            messages: [
                'Sua parceira estratÃ©gica na era dos dados!',
                'Descubra o poder dos dados conosco e eleve sua performance a novos patamares!',
                'Desbravando insights cruciais para o sucesso do seu negÃ³cio.'
            ],
        };
    },
    template: `
            <div id="mainContent">
            <div class="content">
                <video autoplay loop muted playsinline id="background-video">
                    <source id="video-source" :src="videoSource" type="video/mp4">
                    Seu navegador nÃ£o suporta vÃ­deos de fundo.
                </video>
                <div id="Home-info">
                    <p><strong>[Analytica]</strong></p>
                </div>
            </div>

            <div id="Home-info2">
                    <p v-for="(message, index) in messages" :key="index"
                        :class="{ 'fade-in': index === currentMessageIndex, 'fade-out': index !== currentMessageIndex }">
                        {{ message }}
                    </p>
            </div>

            <div class="buttons-container">
                <button class="btn" id="btn-contratar">Contratar</button>
                <button class="btn" id="btn-ser-contratado">Ser Contratado</button>
            </div>
        </div>
    `
});

app.mount('#app');
