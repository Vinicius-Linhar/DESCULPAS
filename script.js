document.addEventListener('DOMContentLoaded', () => {

    const siteWrapper = document.querySelector('.site-wrapper');
    const backgroundMusic = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const forgiveButton = document.getElementById('forgive-button');
    const heartsContainer = document.getElementById('hearts-rain-container');

    // 1. Animação de entrada suave do conteúdo
    gsap.to(siteWrapper, {
        duration: 1.5,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        delay: 0.5
    });

    // 2. Animação de pétalas caindo
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 8 + 7; // Duração entre 7 e 15 segundos
        const rotation = Math.random() * 360;
        const sway = Math.random() * 100 - 50; // Movimento lateral

        document.body.appendChild(petal);

        gsap.fromTo(petal, 
            { x: startX, y: -20, rotation: rotation }, 
            {
                y: window.innerHeight + 20,
                x: startX + sway,
                rotation: rotation + (Math.random() * 720 - 360),
                duration: duration,
                ease: 'none',
                onComplete: () => {
                    petal.remove();
                }
            }
        );
    }

    // Cria uma nova pétala a cada 800ms
    setInterval(createPetal, 800);

    // 3. Controle da música de fundo
    let isPlaying = false;
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            backgroundMusic.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // 4. Lógica do botão "Sim, eu te perdoo"
    forgiveButton.addEventListener('click', () => {
        // Esconde o site principal com uma animação suave
        gsap.to(siteWrapper, {
            duration: 1,
            opacity: 0,
            scale: 0.9,
            ease: 'power2.in',
            onComplete: () => {
                siteWrapper.classList.add('hidden');
                
                // Mostra a tela de chuva de corações
                heartsContainer.classList.remove('hidden');
                gsap.to(heartsContainer, {
                    duration: 0.5,
                    opacity: 1
                });
                
                // Inicia a chuva de corações
                startHeartsRain();
            }
        });
    });

    // Função para a animação da chuva de corações
    function startHeartsRain() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // Duração de 3 a 5 segundos
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heartsContainer.appendChild(heart);

            // Remove o coração depois que a animação termina para não sobrecarregar
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 100);
    }
    
    // CSS para a animação dos corações
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .heart {
            position: fixed;
            top: -10%;
            z-index: 201;
            animation: fall linear forwards;
            pointer-events: none;
        }
        @keyframes fall {
            to {
                transform: translateY(110vh);
            }
        }
    `;
    document.head.appendChild(styleSheet);
});