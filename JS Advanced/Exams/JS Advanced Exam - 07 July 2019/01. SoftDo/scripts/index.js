function mySolution(){
    const input = document.querySelector('textarea');
    const sendBtn = document.querySelector('button');

    const pending = document.querySelector('#pendingQuestions');
    const open = document.querySelector('#openQuestions');

    const name = document.querySelector('input[type="username"]');

    let div = document.createElement('div');
    div.classList.add('pendingQuestion');

    
    let span = document.createElement('span');
    let divActions = document.createElement('div');
    let btnArchive = document.createElement('button');
    let btnOpen = document.createElement('button');

    sendBtn.addEventListener('click', function (e) {
        // let div = document.createElement('div');

        let imgClient = document.createElement('img');
        imgClient.src = './images/user.png';
        imgClient.width = "32";
        imgClient.height = "32";

        // let span = document.createElement('span');
        if (name.value === '') {
            span.textContent = 'Anonymous';
        } else {
            span.textContent = `${name.value}`;
        }

        let p = document.createElement('p');
        p.textContent = input.value;

        // let divActions = document.createElement('div');
        divActions.classList.add("actions");
        // let btnArchive = document.createElement('button');
        btnArchive.classList.add('archive');
        btnArchive.textContent = 'Archive';
        // let btnOpen = document.createElement('button');
        btnOpen.classList.add('open');
        btnOpen.textContent = 'Open';

        divActions.appendChild(btnArchive);
        divActions.appendChild(btnOpen);

        div.appendChild(imgClient);
        div.appendChild(span);
        div.appendChild(p);
        div.appendChild(divActions);

        pending.appendChild(div);

        input.value = '';
        name.value = '';
    });

    btnArchive.addEventListener('click', function () {
        span.parentElement.remove(div);
    });

    let btnReply = document.createElement('button');
    let divElement = document.createElement('div');
    let inp = document.createElement('input');
    let but = document.createElement('button');
    let ol = document.createElement('ol');

    btnOpen.addEventListener('click', function () {
        document.querySelector('.pendingQuestion').classList.remove('pendingQuestion');
        div.classList.add('openQuestion');
        open.appendChild(div);

        btnArchive.parentElement.removeChild(btnArchive);
        btnOpen.parentElement.removeChild(btnOpen);

        // let btnReply = document.createElement('button');
        btnReply.classList.add('reply');
        btnReply.textContent = 'Reply';

        divActions.appendChild(btnReply);

        // let divElement = document.createElement('div');
        divElement.classList.add('replySection');
        // let inp = document.createElement('input');
        inp.classList.add('replyInput');
        inp.type = 'text';
        inp.placeholder = 'Reply to this question here';
        // let but = document.createElement('button');
        but.classList.add('replyButton');
        but.textContent = 'Send';
        // let ol = document.createElement('ol');
        ol.classList.add('reply');
        ol.type = '1';

        divElement.appendChild(inp);
        divElement.appendChild(but);
        divElement.appendChild(ol);

        divElement.style.display = 'none';

        div.appendChild(divElement);
    });

    btnReply.addEventListener('click', function () {
        divElement.style.display = 'block';
        btnReply.textContent = 'Back';

        if (btnReply.textContent === 'Back') {
            btnReply.addEventListener('click', function () {
                divElement.style.display = 'none';
                btnReply.textContent = 'Reply';
            });
        }
    });

    but.addEventListener('click', function () {
        if (inp.value !== '') {
            let li = document.createElement('li');
            li.textContent = inp.value;
            ol.appendChild(li);
        }
    });
    

}
