// تهيئة مكتبة الأنميشن
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 1. منطق الدارك مود (Dark Mode Logic)
const toggle = document.getElementById('darkToggle');
const html = document.documentElement;

function updateTheme(isDark) {
    if (isDark) {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if(toggle) toggle.checked = true;
    } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if(toggle) toggle.checked = false;
    }
}

toggle?.addEventListener('change', () => updateTheme(toggle.checked));

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) updateTheme(true);

// 2. منيو الموبايل (Mobile Menu)
const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('nav');

menuBtn?.addEventListener('click', () => {
    nav.classList.toggle('hidden');
    nav.classList.toggle('flex');
    nav.classList.toggle('flex-col');
    nav.classList.toggle('absolute');
    nav.classList.toggle('top-20');
    nav.classList.toggle('left-0');
    nav.classList.toggle('w-full');
    nav.classList.toggle('bg-white');
    nav.classList.toggle('dark:bg-gray-800');
    nav.classList.toggle('p-6');
    nav.classList.toggle('shadow-xl');
});

// 3. إرسال الفورم (Form Submission AJAX)
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = 'Sending... <i class="fas fa-spinner animate-spin"></i>';
    btn.disabled = true;

    try {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(this.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('تم إرسال رسالتك بنجاح!');
            this.reset();
        } else {
            alert('حدث خطأ أثناء الإرسال.');
        }
    } catch (error) {
        alert('تأكد من اتصالك بالإنترنت.');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});