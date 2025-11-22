if (localStorage.getItem('dark-mode') === 'true' ) {document.body.classList.toggle('dark');}
else {document.body.classList.remove('dark');}


document.getElementById('codeEditor').addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const logotext = document.querySelector('.logotext');
    document.title = logotext.value || 'Textarea Editor';
    logotext.addEventListener('input', function() {
        document.title = logotext.value || 'Textarea Editor';
    }
    );
});

if (window.innerWidth <= 786) {} else {
const logotext = document.querySelector('.logotext');
logotext.addEventListener('input', function() {
    const charCount = this.value.length;
    var countPlus = charCount * 13;
    if (charCount > 15) {
        this.style.width = countPlus + 'px';
    } else {
        this.style.width = '200px';
    }
});
}

if (window.innerWidth <= 786 && window.innerHeight <= 470) {
        document.querySelector('.space-hour-ex').style.display = 'flex';
        document.querySelector('.content-editor').style.display = 'none';
        document.querySelector('.header-editor').style.display = 'none';
    } else {
        document.querySelector('.space-hour-ex').style.display = 'none';
        document.querySelector('.content-editor').style.display = 'flex';
        document.querySelector('.header-editor').style.display = 'flex';
}

window.addEventListener('resize', function() {
    if (window.innerWidth <= 786 && window.innerHeight <= 470) {
        document.querySelector('.space-hour-ex').style.display = 'flex';
        document.querySelector('.content-editor').style.display = 'none';
        document.querySelector('.header-editor').style.display = 'none';
    } else {
        document.querySelector('.space-hour-ex').style.display = 'none';
        document.querySelector('.content-editor').style.display = 'flex';
        document.querySelector('.header-editor').style.display = 'flex';
    }
});

//Primero preguntamos si el navegador soporta el API File System Access
const supportsFileSystemAccess = 'showOpenFilePicker' in window && 'showSaveFilePicker' in window;

function saveToFile() {
    const textToSave = document.getElementById('codeEditor').value;
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = logotext.value ? logotext.value + '.txt' : 'document.txt';
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

function darkmode() {
    document.body.classList.toggle('dark');

    if(document.body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');

        document.querySelectorAll('.st-w').forEach((result) => {result.classList.add('status-w-on')});
        document.querySelectorAll('.st-d').forEach((result) => {result.classList.remove('status-d-on')});
    } else {
        localStorage.setItem('dark-mode', 'false');

        document.querySelectorAll('.st-w').forEach((result) => {result.classList.remove('status-w-on')});
        document.querySelectorAll('.st-d').forEach((result) => {result.classList.add('status-d-on')});
    }
}

document.getElementById('codeEditor').addEventListener('input', function() {
    const charCount = this.value.length;
    document.getElementById('charCount').textContent = charCount + ' caracteres';
});

document.addEventListener('DOMContentLoaded', function() {
    const charCount = document.getElementById('codeEditor').value.length;
    document.getElementById('charCount').textContent = charCount + ' caracteres';
});

//Reloj hora local del usuario
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const timeString = hours + ':' + minutes + ':' + seconds;
    document.getElementById('clock').textContent = timeString;
    document.getElementById('clock2').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();