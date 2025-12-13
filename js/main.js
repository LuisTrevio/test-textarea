if (localStorage.getItem('dark-mode') === 'true' ) 
{document.body.classList.toggle('dark');document.querySelector('meta[name="theme-color"]').setAttribute('content', '#222222');document.querySelector('.darkmode-desk').textContent = 'Modo Claro';}
else {document.body.classList.remove('dark');document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');document.querySelector('.darkmode-desk').textContent = 'Modo Oscuro';}


function Pop() {
    const toggleClasses = [
        ['.Pop-Exit', 'Pop-out'],
        ['.Status-Ani', 'Status-Animated'],
        ['.scr-fr', 'scroll-frost'],
        ['.close-up', 'Pop-Close-Up']
    ];

    toggleClasses.forEach(([selector, className]) => {
        document.querySelectorAll(selector).forEach(result => result.classList.toggle(className));
    });

    const classesToRemove = [
        'Pop-Save-Out',
        'Pop-Menu-Out'
    ];

    classesToRemove.forEach(className => {
        document.querySelectorAll(`.${className.replace('-Out', '-O')}`).forEach(result => {
            result.classList.remove(className);
        });
    });

}

const popFunctions = [
    ['PopSave', 'Pop-Save-O', 'Pop-Save-Out'],
    ['PopMenu', 'Pop-Menu-O', 'Pop-Menu-Out']
];

popFunctions.forEach(([funcName, selector, className]) => {
    window[funcName] = () => {
        document.querySelectorAll(`.${selector}`).forEach(result => {
            result.classList.add(className);
        });
    };
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.querySelector('.Pop-Exit.Pop-out')) {
        Pop();
    }
});


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
    var countPlus = charCount * 11.17;
    if (charCount > 15) {
        this.style.width = countPlus + 'px';
    } else {
        this.style.width = '170px';
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
                    'text/plain': ['txt', 'md', 'js', 'html', 'css']
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
        document.querySelector('.darkmode-desk').textContent = 'Modo Claro';
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#222222');
    } else {
        localStorage.setItem('dark-mode', 'false');

        document.querySelectorAll('.st-w').forEach((result) => {result.classList.remove('status-w-on')});
        document.querySelectorAll('.st-d').forEach((result) => {result.classList.add('status-d-on')});
        document.querySelector('.darkmode-desk').textContent = 'Modo Oscuro';
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

// Typefile-mobile
document.querySelectorAll('.typefile-mobile .option').forEach(button => {
    button.addEventListener('click', () => {
        const selectedFormat = button.getAttribute('data-sort');
        document.querySelector('.typefile-mobile').setAttribute('data-selected', selectedFormat);
        document.querySelector('.typefile-mobile').firstChild.textContent = selectedFormat;
    });
});

// Guarda el contenido del editor en un archivo con el formato seleccionado
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

// Save As para dispositivos móviles (con elemento select)
function saveToFileMobile() {
    const textToSave = document.getElementById('codeEditor').value;
    const selectElement = document.getElementById('formatSelect'); // ID del select
    const selectedFormat = selectElement.value || 'txt';
    const logotext = document.querySelector('.logotext');
    const filename = logotext.value ? logotext.value + '.' + selectedFormat : 'document.' + selectedFormat;
    
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

// toogle que despliega el box 
document.querySelector('.typefile-button').addEventListener('click', () => {
    const box = document.querySelector('.typefile-button .border-box');
    box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
    document.querySelector('.typefile-button').style.border = 'white 1px solid';
});

document.querySelector('.archivo').addEventListener('click', () => {
    const box = document.querySelector('.archivo .border-box');
    box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
    document.querySelector('.archivo').style.border = 'white 1px solid';
});

document.querySelector('.editor').addEventListener('click', () => {
    const box = document.querySelector('.editor .border-box');
    box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
    document.querySelector('.editor').style.border = 'white 1px solid';
});

document.querySelector('.preferences').addEventListener('click', () => {
    const box = document.querySelector('.preferences .border-box');
    box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
    document.querySelector('.preferences').style.border = 'white 1px solid';
});

document.addEventListener('click', (event) => {
    const box = document.querySelector('.typefile-button .border-box');
    const button = document.querySelector('.typefile-button');
    if (!button.contains(event.target)) {
        box.style.display = 'none';
        document.querySelector('.typefile-button').style.border = 'var(--header-on) 1px solid';
    }
});

document.addEventListener('click', (event) => {
    const box = document.querySelector('.archivo .border-box');
    const button = document.querySelector('.archivo');
    if (!button.contains(event.target)) {
        box.style.display = 'none';
        document.querySelector('.archivo').style.border = 'var(--header-on) 1px solid';
    }
});

document.addEventListener('click', (event) => {
    const box = document.querySelector('.editor .border-box');
    const button = document.querySelector('.editor');
    if (!button.contains(event.target)) {
        box.style.display = 'none';
        document.querySelector('.editor').style.border = 'var(--header-on) 1px solid';
    }  
});

document.addEventListener('click', (event) => {
    const box = document.querySelector('.preferences .border-box');
    const button = document.querySelector('.preferences');
    if (!button.contains(event.target)) {
        box.style.display = 'none';
        document.querySelector('.preferences').style.border = 'var(--header-on) 1px solid';
    }  
});

function Tick() {
    setInterval(() => {
    document.querySelector('.content-editor').style.display = 'flex';
    document.querySelector('.header-editor').style.display = 'flex';
    }, 200);
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

// Función para imprimir el contenido del editor
function Print() {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Imprimir Documento</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; } pre { white-space: pre-wrap; word-wrap: break-word; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<pre>' + document.getElementById('codeEditor').value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

function Copy() {
    const textToCopy = document.getElementById('codeEditor').value;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });   
}

function Paste() {
    navigator.clipboard.readText().then(text => {
        const editor = document.getElementById('codeEditor');
        const startPos = editor.selectionStart;
        const endPos = editor.selectionEnd;
        editor.value = editor.value.substring(0, startPos) + text + editor.value.substring(endPos);
        editor.selectionStart = editor.selectionEnd = startPos + text.length;
    }).catch(err => {
        console.error('Error al pegar el texto: ', err);
    });
}

function Undo() {
    document.getElementById('codeEditor').value = document.getElementById('codeEditor').value.slice(0, -1);
}

// EL TEXTO SE GUARDA AUTOMATICAMENTE CADA 5 SEGUNDOS
setInterval(() => {
    const textToSave = document.getElementById('codeEditor').value;
    localStorage.setItem('autosave', textToSave);
}, 1000);

// AL CARGAR LA PAGINA, SE RECUPERA EL TEXTO GUARDADO
document.addEventListener('DOMContentLoaded', () => {
    const savedText = localStorage.getItem('autosave');
    if (savedText) {
        document.getElementById('codeEditor').value = savedText;
    }
});

