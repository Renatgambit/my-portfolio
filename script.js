// script.js — вынесено из index.html
// ===== 1. SPLASH SCREEN & INIT =====
window.addEventListener('load',()=>{
    const splash=document.getElementById('splash-screen');
    const mainContent=document.getElementById('main-content');
    setTimeout(()=>{
        splash.classList.add('hidden');
        mainContent.classList.add('visible');
        initTypingEffect();
    },1500);
});
// ===== 2. TYPING EFFECT =====
function initTypingEffect(){
    const textElement=document.getElementById('typing-text');
    const phrases=["Студент 3 курса МАИ","Начинающий 1С Разработчик","IT-Специалист с опытом 3 года","Готов к сложным задачам"];
    let phraseIndex=0,charIndex=0,isDeleting=false,typeSpeed=100;
    function type(){
        const currentPhrase=phrases[phraseIndex];
        if(isDeleting){textElement.textContent=currentPhrase.substring(0,charIndex-1);charIndex--;typeSpeed=50;}
        else{textElement.textContent=currentPhrase.substring(0,charIndex+1);charIndex++;typeSpeed=100;}
        if(!isDeleting&&charIndex===currentPhrase.length){isDeleting=true;typeSpeed=2000;}
        else if(isDeleting&&charIndex===0){isDeleting=false;phraseIndex=(phraseIndex+1)%phrases.length;typeSpeed=500;}
        setTimeout(type,typeSpeed);
    }type();
}
// ===== 3. THEME TOGGLE =====
const themeToggle=document.getElementById('theme-toggle');
const htmlElement=document.documentElement;
if(localStorage.getItem('theme')==='dark'){htmlElement.setAttribute('data-theme','dark');themeToggle.textContent='☀️';}
themeToggle.addEventListener('click',()=>{
    if(htmlElement.getAttribute('data-theme')==='dark'){
        htmlElement.removeAttribute('data-theme');localStorage.setItem('theme','light');themeToggle.textContent='🌙';
    }else{
        htmlElement.setAttribute('data-theme','dark');localStorage.setItem('theme','dark');themeToggle.textContent='☀️';
    }
});
// ===== 4. SCROLL ANIMATIONS (Intersection Observer) =====
const observerOptions={threshold:0.1,rootMargin:"0px 0px -50px 0px"};
const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            if(entry.target.id==='skills'){
                const progressBars=entry.target.querySelectorAll('.skill-bar-fill');
                progressBars.forEach(bar=>{const width=bar.getAttribute('data-width');bar.style.width=width;});
            }
            observer.unobserve(entry.target);
        }
    });
},observerOptions);
document.querySelectorAll('.section,.experience-item').forEach(el=>{observer.observe(el);});
// ===== 5. NAVIGATION & SCROLL SPY =====
const navLinks=document.querySelectorAll('.nav-link');
const sections=document.querySelectorAll('section');
const menuToggle=document.getElementById('menu-toggle');
const navList=document.getElementById('nav-links');
menuToggle.addEventListener('click',()=>{
    navList.classList.toggle('active');
    menuToggle.textContent=navList.classList.contains('active')?'✕':'☰';
});
navLinks.forEach(link=>{link.addEventListener('click',()=>{navList.classList.remove('active');menuToggle.textContent='☰';});});
window.addEventListener('scroll',()=>{
    let current='';sections.forEach(section=>{const sectionTop=section.offsetTop,sectionHeight=section.clientHeight;if(scrollY>=(sectionTop-150)){current=section.getAttribute('id');}});
    navLinks.forEach(link=>{link.classList.remove('active');if(link.getAttribute('href').includes(current)){link.classList.add('active');}});
    const backToTop=document.getElementById('back-to-top');if(window.scrollY>500){backToTop.classList.add('visible');}else{backToTop.classList.remove('visible');}
});
document.getElementById('back-to-top').addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});});
// ===== 6. INTERACTIONS =====
document.getElementById('download-resume').addEventListener('click',()=>{showToast('Скачивание резюме началось...');setTimeout(()=>{showToast('Резюме сохранено на устройство!');},1500);});
document.getElementById('contact-form').addEventListener('submit',(e)=>{
    e.preventDefault();const btn=e.target.querySelector('button'),originalText=btn.textContent;btn.textContent='Отправка...';btn.disabled=true;setTimeout(()=>{btn.textContent='Отправлено! ✅';btn.style.backgroundColor='#10b981';showToast('Сообщение успешно отправлено!');e.target.reset();setTimeout(()=>{btn.textContent=originalText;btn.disabled=false;btn.style.backgroundColor='';},3000);},1500);
});
function showToast(message){const toast=document.getElementById('toast'),msgElement=document.getElementById('toast-message');msgElement.textContent=message;toast.classList.add('show');setTimeout(()=>{toast.classList.remove('show');},3000);}
const profilePic=document.getElementById('main-profile-pic');profilePic.addEventListener('click',()=>{profilePic.style.transform='scale(0.95) rotate(-5deg)';setTimeout(()=>{profilePic.style.transform='scale(1) rotate(0deg)';},300);});
