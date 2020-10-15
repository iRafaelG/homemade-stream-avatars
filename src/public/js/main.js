// initializations
const socket = io();

// socket events
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('addUser', (user) => {
    addUser(user);
});

socket.on('deleteUser', (user) => {
    deleteUser(user);
});

socket.on('emotes', (urls) => {
    for (const url of urls) {
        setTimeout(fireworks(url), 100);
    }
});

// variables
const animals = [
    'useravatar-elephant',
    'useravatar-dog',
    'useravatar-gecko-reptile',
    'useravatar-gull-bird',
    'useravatar-kangaroo',
    'useravatar-rabbit',
    'useravatar-seahorse',
    'useravatar-fly',
    'useravatar-rat',
    'useravatar-deer'
];

// functions
function addUser(user) {
    if (animals.length > 0) {

        // Create elements
        const wrapper = document.createElement('div');
        const userName = document.createElement('p');
        const avatarWrapper = document.createElement('div');
        const userAvatar = document.createElement('div');
        
        // Add classes
        wrapper.classList.add('wrapper');
        userName.classList.add('username');
        avatarWrapper.classList.add('avatarwrapper');

        const classSelected = Math.floor(Math.random() * animals.length);
        userAvatar.classList.add(animals[classSelected]);
        animals.splice(classSelected, 1);

        // Add text
        userName.innerText = user;
        
        // Set attribute
        wrapper.setAttribute('id', user);
        userAvatar.setAttribute('id', `useravatar-${user}`);
    
        wrapper.appendChild(userName);
        wrapper.appendChild(avatarWrapper);
        avatarWrapper.appendChild(userAvatar);
    
        const avatars = document.getElementById('avatars');
        avatars.appendChild(wrapper);
    }
}

function deleteUser(user) {
    const userAvatarToDelete = document.getElementById(`useravatar-${user}`);
    animals.push(userAvatarToDelete.classList.value);

    const wrapperToDelete = document.getElementById(user);

    const avatars = document.getElementById('avatars');
    avatars.removeChild(wrapperToDelete);
}

function fireworks(url) {
    // source display
    const widthDisplay = window.innerWidth;
    const heightDisplay = window.innerHeight;

    for (let index = 0; index < 50; index++) {
    // mini display
    const widthDisplayRandom = randomNumbers((Math.random() - 1), Math.random(), widthDisplay);
    const heightDisplayRandom = randomNumbers((Math.random() - 1), Math.random(), heightDisplay);

    const firework = document.createElement('firework');

    const widthFirework = Math.floor(Math.random() * 40) + 16;
    const heightFirework = widthFirework;

    const destinationXFirework = randomNumbers(Math.random(), -0.5, 800);
    const destinationYFirework = randomNumbers(Math.random(), -0.5, 800);  
    const rotation = (Math.random() * 500) + 720;
    const delay = (Math.random() * 500);

    // firework style
    firework.style.width = `${widthFirework}px`;
    firework.style.height = `${heightFirework}px`;
    firework.style.background = `url(${url})`;
    firework.style.position = 'absolute';
    firework.style.backgroundRepeat = 'no-repeat';

    const animation = firework.animate([
        {
            transform: `translate(-50%, -50%) translate(${widthDisplayRandom}px, ${heightDisplayRandom}px) rotate(0deg)`,
            opacity: 1
        },
        {
            transform: `translate(-50%, -50%) translate(${widthDisplayRandom + destinationXFirework}px, ${heightDisplayRandom + destinationYFirework}px) rotate(${rotation}deg)`,
            opacity: 0
        }
    ], {
        duration: (Math.random() * 3000) + 8000,
        delay,
        easing: 'ease'
    });

    animation.onfinish = (e) => {
        e.target.effect.target.remove();
    }

    document.body.appendChild(firework);
        
    }
}

function randomNumbers(...args) {
    return (args[0] + args[1]) * args[2];
}