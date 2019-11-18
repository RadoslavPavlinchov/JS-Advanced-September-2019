import { fetchData } from "./data.js";

function withCache(fn) {
    fn.cache = new Map();
    return function () {
        let key = JSON.stringify(arguments);
        if (!fn.cache.has(key)) {
            fn.cache.set(key, fn(...arguments))
        }
        return fn.cache.get(key);
    }
}

const baseUrl = 'https://blog-apps-c12bf.firebaseio.com/';
const makeUrl = x => `${baseUrl}${x}/.json`;

const cachedFetch = withCache(fetchData.bind(window, undefined, undefined));

const getPosts = () => cachedFetch(makeUrl('posts'));
const getPost = id => cachedFetch(makeUrl(`posts/${id}`));
const getComments = () => cachedFetch(makeUrl('comments'));

function displayPosts(posts) {
    html.select().innerHTML = '';

    let fragment = document.createDocumentFragment();
    Object.keys(posts).forEach(x => {
        let option = document.createElement('option');
        option.value = x;
        option.innerHTML = posts[x].title;
        fragment.appendChild(option);
    });
    html.select().appendChild(fragment);
}

function displayPost(comments, post) {
    displayComments(comments, post);
    Object.keys(post).forEach(x => {
        if (typeof html[x] === 'function') {
            html[x]().innerHTML = post[x];
        }
    });
}

function displayComments(comments, post) {
    html.comments().innerHTML = '';
    Object
        .keys(comments)
        .filter(x => comments[x].postId === post.id)
        .map(x => comments[x])
        .map(x => {
            let li = document.createElement('li');
            li.innerHTML = x.text;
            return li;
        })
        .forEach(x => {
            html.comments().appendChild(x);
        });
}

const actions = {
    btnLoadPosts: async () => {
        displayPosts(await getPosts());
    },
    btnViewPost: async () => {
        const post = await getPost(html.select().value);
        const comments = await getComments();
        displayPost(comments, post);
    }
}

function handleEvent(e) {
    if (typeof actions[e.target.id] === 'function') {
        actions[e.target.id]()
    }
}

const html = {
    select: () => document.getElementById('posts'),
    title: () => document.getElementById('post-title'),
    body: () => document.getElementById('post-body'),
    comments: () => document.getElementById('post-comments')
}

function attachEvents() {
    document.addEventListener('click', handleEvent)
}

attachEvents();
