import { get, post, put, del } from "./requester.js";

const app = Sammy('#rooter', function () {
    // Important
    this.use('Handlebars', 'hbs');

    // GET: HOME page
    this.get('#/home', function (ctx) {
        setHeaderInfo(ctx);

        this.loadPartials(getPartials())
            .partial('./views/home/home.hbs')
    })

    // GET: Register page
    this.get('#/register', function (ctx) {
        this.loadPartials(getPartials())
            .partial('./views/user/register.hbs')
    })

    // POST: Register page
    this.post('#/register', function (ctx) {
        const { firstName, lastName, username, password, repeatPassword } = ctx.params;

        if (firstName && lastName && username && password && password === repeatPassword) {
            post('user', '', { firstName, lastName, username, password }, 'Basic')
                .then((userInfo) => {
                    saveAuthInfo(userInfo);
                    ctx.redirect('#/home')
                })
                .catch(console.error)
        }
    })

    // GET: Login page
    this.get('#/login', function (ctx) {
        this.loadPartials(getPartials())
            .partial('./views/user/login.hbs')
    })

    // POST: Login page
    this.post('#/login', function (ctx) {
        const {username, password} = ctx.params;

        if (username && password){
            post('user', 'login', {username, password}, 'Basic')
            .then((userInfo) => {
                saveAuthInfo(userInfo);
                ctx.redirect('#/home')
            })
            .catch(console.error)
        }
    })

    // GET: Logout page
    this.get('#/logout', function (ctx) {
        post('user', '_logout', {}, 'Kinvey')
            .then(() => {
                sessionStorage.clear()
                ctx.redirect('#/home')
            })
            .catch(console.error)
    })

    // Partials: Header and Footer
    function getPartials() {
        return {
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }
    }

    function setHeaderInfo(ctx) {
        ctx.isLogged = sessionStorage.getItem('authtoken') !== null;
        ctx.names = sessionStorage.getItem('names')
    }

    function saveAuthInfo(userInfo) {
        sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
        sessionStorage.setItem('names', `${userInfo.firstName} ${userInfo.lastName}`);
    }

})

app.run('#/home');