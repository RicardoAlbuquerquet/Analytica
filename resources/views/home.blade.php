<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytica</title>
    <link rel="icon" href="images\[A].png" type="image/x-icon">
    <link href="{{ asset('css/Home.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.js"></script>
</head>

<body>
    <div id="app">
        <nav class="navbar">
            <div class="navbar-content">
                <div class="theme-switch-wrapper">
                    <label class="theme-switch" for="checkbox">
                        <input type="checkbox" id="checkbox" v-model="darkTheme" @click="toggleTheme" />
                        <div class="slider round"></div>
                    </label>
                </div>
                <div class="nav-links">
                    <a href="#" @click="changeView('sobre', $event)">Sobre</a>
                    <a href="#" class="login-button" @click="changeView('login', $event)">Login</a>
                </div>
            </div>
            <a id="Homebutton" href="/" v-if="currentView === 'sobre' || currentView === 'login'">
                <h1>[Analytica]</h1>
            </a>
        </nav>

        <div id="loadingAnimation" v-if="loading">
            <div class="spinner" :style="{ animation: spinnerAnimationStyle }"></div>
            <div class="text-overlay">[A]</div>
        </div>

            <component :is="currentView + '-component'"></component>
        
    </div>
    <script type="module" src="{{ asset('js/Home.js') }}"></script>
</body>
<footer class="footer">
    <a href="https://www.linkedin.com/company/analyticagroupinc/" target="_blank" class="linkedin-icon">
        <i class="fab fa-linkedin"></i>
    </a>
    <a href="https://www.linkedin.com/company/analyticagroupinc/" target="_blank" class="linkedin-icon">
        <i class="fab fa-facebook"></i>
    </a>
    <a href="https://www.linkedin.com/company/analyticagroupinc/" target="_blank" class="linkedin-icon">
        <i class="fab fa-instagram"></i>
    </a>
    <a href="https://www.linkedin.com/company/analyticagroupinc/" target="_blank" class="linkedin-icon">
        <i class="fab fa-youtube"></i>
    </a>
</footer>

</html>
