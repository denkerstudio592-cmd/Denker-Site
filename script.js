// ==========================================
// СПИСОК МУЗЫКИ (просто дописывай имя файла сюда)
// ==========================================
const serverMusic = [
    "07. Menu.mp3"
];

// ==========================================
// СПИСОК ШРИФТОВ (просто дописывай имя файла сюда)
// ==========================================
const serverFonts = [
    "Comfortaa-Bold.ttf"
];

// ==========================================
// ПЕРЕВОДЫ И НАСТРОЙКИ
// ==========================================
const translations = {
    en: {
        nav_home: "Home",
        nav_projects: "Projects",
        nav_socials: "Socials",
        nav_music: "Editing Music",
        nav_fonts: "Fonts",
        nav_tutorials: "Tutorials",
        nav_settings: "Settings",
        hero_title_welcome: "Welcome to",
        btn_projects: "My Projects",
        projects_title: "Featured Projects",
        socials_title: "My Social Networks",
        music_title: "Editing Music",
        fonts_title: "Fonts",
        tutorials_title: "Tutorials",
        empty_message: "Nothing here yet. Content will be added soon!",
        settings_title: "Site Settings",
        theme_setting_title: "Theme",
        theme_setting_desc: "Choose between light and dark visual themes.",
        lang_setting_title: "Language",
        lang_setting_desc: "Select your preferred display language.",
        dark_theme_btn: "Dark Theme",
        light_theme_btn: "Light Theme"
    },
    ru: {
        nav_home: "Главная",
        nav_projects: "Проекты",
        nav_socials: "Соцсети",
        nav_music: "Музыка для монтажа",
        nav_fonts: "Шрифты",
        nav_tutorials: "Туториалы",
        nav_settings: "Настройки",
        hero_title_welcome: "Добро пожаловать на",
        btn_projects: "Мои проекты",
        projects_title: "Мои Проекты",
        socials_title: "Мои Соцсети",
        music_title: "Музыка для монтажа",
        fonts_title: "Шрифты",
        tutorials_title: "Туториалы",
        empty_message: "Пока что тут ничего нет. Скоро всё появится!",
        settings_title: "Настройки Сайта",
        theme_setting_title: "Тема оформления",
        theme_setting_desc: "Выберите между светлой и тёмной темой.",
        lang_setting_title: "Язык интерфейса",
        lang_setting_desc: "Выберите желаемый язык отображения сайта.",
        dark_theme_btn: "Тёмная тема",
        light_theme_btn: "Светлая тема"
    },
    uk: {
        nav_home: "Головна",
        nav_projects: "Проєкти",
        nav_socials: "Соцмережі",
        nav_music: "Музика для монтажу",
        nav_fonts: "Шрифти",
        nav_tutorials: "Туторіали",
        nav_settings: "Налаштування",
        hero_title_welcome: "Ласкаво просимо на",
        btn_projects: "Мої проєкти",
        projects_title: "Мої Проєкти",
        socials_title: "Мої Соцмережі",
        music_title: "Музика для монтажу",
        fonts_title: "Шрифти",
        tutorials_title: "Туторіали",
        empty_message: "Поки що тут нічого немає. Скоро все з'явиться!",
        settings_title: "Налаштування Сайту",
        theme_setting_title: "Тема оформлення",
        theme_setting_desc: "Оберіть між світлою та темною темою.",
        lang_setting_title: "Мова інтерфейсу",
        lang_setting_desc: "Оберіть бажану мову відображення сайту.",
        dark_theme_btn: "Темна тема",
        light_theme_btn: "Світла тема"
    }
};

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon') : null;
const themeText = document.getElementById('theme-text');
const langSelect = document.getElementById('lang-select');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('denker_theme', theme);
    
    const currentLang = localStorage.getItem('denker_lang') || 'en';

    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    if (themeText) {
        themeText.textContent = theme === 'dark' 
            ? (translations[currentLang]?.light_theme_btn || "Light Theme") 
            : (translations[currentLang]?.dark_theme_btn || "Dark Theme");
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

function setLanguage(lang) {
    if (!translations[lang]) return;
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    if (langSelect) langSelect.value = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('denker_lang', lang);

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme);
}

if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
}

function initSettings() {
    const savedLang = localStorage.getItem('denker_lang') || 'en';
    const savedTheme = localStorage.getItem('denker_theme') || 'light';
    
    setLanguage(savedLang);
    setTheme(savedTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    initSettings();
    loadMusicList();
    loadFontsList();
});

// --- Генерация музыки из списка (с безопасным скачиванием) ---
function loadMusicList() {
    const container = document.getElementById('music-container');
    if (!container) return;

    container.innerHTML = '';

    if (!serverMusic || serverMusic.length === 0) {
        container.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-icon">🎵</div><p>В списке пока нет музыки</p></div>`;
        return;
    }

    serverMusic.forEach((fileName) => {
        const displayName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
        const filePath = `../assets/musics/${fileName}`;

        const card = document.createElement('div');
        card.className = 'media-card';
        card.innerHTML = `
            <div class="media-info">
                <h3>${displayName}</h3>
                <span>Audio Track</span>
            </div>
            <audio controls src="${filePath}"></audio>
            <div class="media-actions">
                <button class="btn btn-primary download-music-btn" data-url="${filePath}" data-name="${fileName}" style="width: 100%; justify-content: center;">⬇️ Скачать</button>
            </div>
        `;
        container.appendChild(card);
    });

    // Обработчик принудительного скачивания без открытия новой вкладки
    document.querySelectorAll('.download-music-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const url = e.currentTarget.getAttribute('data-url');
            const filename = e.currentTarget.getAttribute('data-name');
            
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = blobUrl;
                a.download = filename;
                
                document.body.appendChild(a);
                a.click();
                
                window.URL.revokeObjectURL(blobUrl);
                document.body.removeChild(a);
            } catch (err) {
                window.open(url, '_blank');
            }
        });
    });
}

// --- Генерация шрифтов из списка и Тестер ---
function loadFontsList() {
    const container = document.getElementById('fonts-container');
    if (!container) return;

    container.innerHTML = '';

    if (!serverFonts || serverFonts.length === 0) {
        container.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-icon">🔤</div><p>В списке пока нет шрифтов</p></div>`;
        return;
    }

    serverFonts.forEach((fileName, index) => {
        const displayName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
        const filePath = `../assets/fonts/${fileName}`;
        const fontName = `ServerFont_${index}`;
        const ext = fileName.split('.').pop();

        loadFontFromURL(fontName, filePath);

        const card = document.createElement('div');
        card.className = 'media-card';
        card.innerHTML = `
            <div class="media-info">
                <h3 style="font-family: '${fontName}', sans-serif;">${displayName}</h3>
                <span>Формат: ${ext.toUpperCase()}</span>
            </div>
            <div class="media-actions">
                <button class="btn btn-secondary inspect-btn" data-name="${displayName}" data-family="${fontName}">🔍 Осмотр</button>
                <a href="${filePath}" download="${fileName}" class="btn btn-primary" style="flex:1; justify-content:center;">⬇️ Скачать</a>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.inspect-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const family = e.target.getAttribute('data-family');
            openFontTester(name, family);
        });
    });
}

function loadFontFromURL(name, url) {
    const styleId = `font-style-${name}`;
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
        @font-face {
            font-family: '${name}';
            src: url('${url}');
        }
    `;
    document.head.appendChild(style);
}

// Логика модального тестера шрифтов
const modal = document.getElementById('font-modal');
const closeModal = document.getElementById('close-font-modal');
const testerText = document.getElementById('tester-text');
const testerSize = document.getElementById('tester-size');
const testerWeight = document.getElementById('tester-weight');
const sizeVal = document.getElementById('size-val');
const previewBox = document.getElementById('tester-preview-box');
const modalTitle = document.getElementById('modal-font-name');

function openFontTester(fontName, fontFamily) {
    if (!modal) return;
    modalTitle.textContent = `Осмотр: ${fontName}`;
    modal.style.display = 'flex';
    updatePreview(fontFamily);

    testerText.oninput = () => updatePreview(fontFamily);
    testerSize.oninput = () => {
        sizeVal.textContent = testerSize.value + 'px';
        updatePreview(fontFamily);
    };
    testerWeight.onchange = () => updatePreview(fontFamily);
}

function updatePreview(family) {
    previewBox.style.fontFamily = `'${family}', sans-serif`;
    previewBox.style.fontSize = testerSize.value + 'px';
    previewBox.style.fontWeight = testerWeight.value;
    previewBox.textContent = testerText.value || 'Sample Text';
}

if (closeModal) {
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; }
}