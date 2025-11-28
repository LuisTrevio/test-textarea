if (localStorage.getItem('dark-mode') === 'true' ) 
{document.body.classList.toggle('dark');document.querySelector('meta[name="theme-color"]').setAttribute('content', '#222222');}
else {document.body.classList.remove('dark');document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');}

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

document.querySelector('.space-hour').addEventListener('click', () => {
    document.querySelector('.space-hour-ex').style.display = 'flex';
    document.querySelector('.space-hour-ex').style.cursor = 'pointer';
    document.querySelector('.content-editor').style.display = 'none';
    document.querySelector('.header-editor').style.display = 'none';
});

document.querySelector('.space-hour-ex').addEventListener('click', () => {
    document.querySelector('.space-hour-ex').style.display = 'none';
    document.querySelector('.space-hour-ex').style.cursor = 'none';
    document.querySelector('.content-editor').style.display = 'flex';
    document.querySelector('.header-editor').style.display = 'flex';
});

//Primero preguntamos si el navegador soporta el API File System Access
const supportsFileSystemAccess = 'showOpenFilePicker' in window && 'showSaveFilePicker' in window;

function OpenFile() {
    if (!supportsFileSystemAccess) {
        alert('Tu navegador no soporta la API File System Access. Por favor, usa un navegador compatible como Chrome o Edge.');
        return;
    }  
    const options = {
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': ['.txt', '.md', '.js', '.html', '.css']
                }
            }
        ],
        excludeAcceptAllOption: true,
        multiple: false
    };
    window.showOpenFilePicker(options).then(async (fileHandles) => {
        const fileHandle = fileHandles[0];
        const file = await fileHandle.getFile();
        const contents = await file.text();
        document.getElementById('codeEditor').value = contents;
        const charCount = contents.length;
        document.getElementById('charCount').textContent = charCount + ' caracteres';
    }).catch((err) => {
        console.error(err);
    });
}

function SaveAs() {
    if (!supportsFileSystemAccess) {
        alert('Tu navegador no soporta la API File System Access. Por favor, usa un navegador compatible como Chrome o Edge.');
        return;
    }
    const options = {
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': ['.txt', '.md', '.js', '.html', '.css']
                }
            }
        ]
    };
    window.showSaveFilePicker(options).then(async (fileHandle) => {
        const writable = await fileHandle.createWritable();
        await writable.write(document.getElementById('codeEditor').value);
        await writable.close();
    }).catch((err) => {
        console.error(err);
    });
}

function darkmode() {
    document.body.classList.toggle('dark');

    if(document.body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');

        document.querySelectorAll('.st-w').forEach((result) => {result.classList.add('status-w-on')});
        document.querySelectorAll('.st-d').forEach((result) => {result.classList.remove('status-d-on')});
    
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#222222');
    } else {
        localStorage.setItem('dark-mode', 'false');

        document.querySelectorAll('.st-w').forEach((result) => {result.classList.remove('status-w-on')});
        document.querySelectorAll('.st-d').forEach((result) => {result.classList.add('status-d-on')});
    
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');
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

//Reloj hora local del usuario (Creo)
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

// Cambia de formato de archivo en el botón Abrir Archivo y Guardar Como
document.querySelectorAll('.typefile-button .option').forEach(button => {
    button.addEventListener('click', () => {
        const selectedFormat = button.getAttribute('data-sort');
        document.querySelector('.typefile-button').setAttribute('data-selected', selectedFormat);
        document.querySelector('.typefile-button').firstChild.textContent = selectedFormat;
    });
});

function saveToFile() {
    const textToSave = document.getElementById('codeEditor').value;
    const selectedFormat = document.querySelector('.typefile-button').getAttribute('data-selected') || 'txt';
    const logotext = document.querySelector('.logotext');
    const filename = logotext.value ? logotext.value + '.' + selectedFormat : 'document.' + selectedFormat;
    
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click();
}


/*
// resalta el codigo
document.getElementById('codeEditor').addEventListener('input', function() {
    const code = this.value;
    const highlightedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>') // comentarios
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>') // cadenas
        .replace(/\b(function|return|var|let|const|if|else|for|while|break|continue|switch|case|default|new|this)\b/g, '<span class="keyword">$1</span>'); // palabras clave
    document.getElementById('highlightedCode').innerHTML = highlightedCode;
});

// Inicializa el resaltado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const event = new Event('input');
    document.getElementById('codeEditor').dispatchEvent(event);
});

*/
