# [R3stack](http://r3stack.com) - Get that shit done!
<img src="https://raw.githubusercontent.com/r3stack/r3stack/master/r3stack.png" width="800"> 
##### Whether you want to learn or quickly start your project - R3stack allows you to dive right in! 
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

| Problem           | Solution                                                                 | Result                                                              |
|-------------------|--------------------------------------------------------------------------|---------------------------------------------------------------------|
| Database          | [RethinkDB](https://www.rethinkdb.com/)                                  | Built in reactivity, but you can use any DB you like                |
| Database schema   | [GraphQL](https://github.com/graphql/graphql-js)                         | Can't have a hipster webapp without GraphQL!                        |
| Client validation | [Joi](https://github.com/hapijs/joi)                                     | Clean API for client validation, although the package is HUGE       |
| Database hooks    | [GraphQL](https://github.com/graphql/graphql-js)                         | GraphQL is awesome                                                  |
| Forms             | [redux-form](https://github.com/erikras/redux-form)                      | State tracking awesomeness that works beautifully with react        |
| Client-side cache | [redux](http://redux.js.org/)                                            | Bonus logging, time traveling, and undo functionality               |
| Socket server     | [socketcluster](http://socketcluster.io/#!/)                             | Super easy scaling, pubsub, auth, middleware                        |
| Authentication    | [JWTs](https://jwt.io)                                                   | JWTs can also serve to authorize actions, too                       |
| Auth-transport    | [GraphQL](https://github.com/graphql/graphql-js) (via HTTP)              | Don't use sockets until you need to                                 |
| Front-end         | [React](https://facebook.github.io/react/)                               | Vdom, server-side rendering, async router, etc.                     |
| Build system      | [webpack](https://webpack.github.io/)                                    | Using webpack inside meteor is very limited                         |
| CSS               | [css-modules](https://github.com/css-modules/css-modules)                | Component-scoped css with variables available in a file or embedded |
| Optimistic UI     | [redux-optimistic-ui](https://github.com/mattkrick/redux-optimistic-ui)  | A reducer enhancer to enable type-agnostic optimistic updates       |
| Testing           | [AVA](https://github.com/sindresorhus/ava)                               | Awesome es2016 concurrent testing                                   |
| Linting           | [xo](https://www.npmjs.com/package/xo)                                   | No dotfiles, fixes errors                                           |
| Routing           | [redux-simple-router](https://github.com/reactjs/react-router-redux)     | Stick the route in the state, react-router SSR, async routes        |
| Server            | [Node 5](https://nodejs.org/en/)                                         | Faster, maintained, not a dinosaur...                               |
##### Structure, Security, Development and Deployment; everything you need is here!

## Minimum requirements

- 64-bit architecture machine
- Mac OSX or Linux (Windows: planned)
- bash (command-line tool available on virtually all unix systems)
- Internet connection (only needed while downloading images)
- [redux-devtools Chrome Addon](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

## R3stack utilizes [azk](http://www.azk.io/) orchestrated development environment!
###### Should you already have it, feel free to skip the first step. 

##### Step 1 - azk installation
###### Mac OSX:
- curl -sSL http://azk.io/install.sh | bash

###### Linux:
- wget -nv http://azk.io/install.sh -O- -t 2 -T 10 | bash

##### Step 2 - new r3stack installation
- git clone git@github.com:r3stack/r3stack.git
- cd r3stack
- azk start

* Please note that this process can take a while * 
  If you need to know whats going on instead of patiently waiting for provisioning to finish silently, use the command below.
  This is also very useful for troubleshooting when something doesn't work:
  
- azk start -vv && azk logs --follow

## Execution of commands

- 'azk shell r3stack -- //commands//'

For example:

- 'azk shell r3stack -- npm run start:dev'
- 'azk shell r3stack -- npm run start'
- 'azk shell r3stack -- npm run build'

To completely rebuild the r3stack system while keeping the database:

- 'azk restart r3stack --rebuild'

#### Client-side development
- `azk shell r3stack -- npm run start:dev`
- http://r3stack.dev.azk.io

Rebuilds the client code in-memory & uses hot module reload so you can develop more efficiently!

#### Server-side development
- `azk shell r3stack -- npm run start`
- http://r3stack.dev.azk.io
- If you edit any client or universal files, run `azk shell r3stack -- npm run build` to rebuild & serve the bundle

This mode is great because you can make changes to the server ***without having to recompile the client code***
That means you only wait for the server to restart! GAME CHANGER!

##Database development
- You can use Azk to only start the database by `azk start rethinkdb`
- http://rethinkdb.dev.azk.io for RethinkDB
- All tables are managed in `./src/server/setupDB.js`. Just add your tables & indices to that file and rerun
- A standard ORM would check for tables & ensure indices at least once per build, doing it this way keeps your build times down
- http://r3stack.dev.azk.io/graphql for testing out new queries/mutations

##Deployment
####Currently we recommend deployment on [DigitalOcean](www.digitalocean.com/?refcode=ce49c40dc881)
######By using the above referral link you are helping us run [r3stack](http://r3stack.com/)
Make sure that you create first and have .env file in the root folder of r3stack. (It should NEVER be uploaded to github btw)
The file should looks like this:
```
DEPLOY_API_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
HOST_DOMAIN=hostname.com
HOST_IP=12.34.56.78
```
In addition, in the Azkfile.js file under the envs section, set the `REMOTE_HOST:` to be the IP address of your server!

Once these conditions are meet you can execute the deployment command: `azk shell deploy`
After the first deployment is completed, all consecutive deployments can be done either via 'git push': `git push azk_deploy master`
or continuing via 'azk shell deploy': `azk shell deploy` which is more robust (it performs droplet configuration verification) albeit it takes a little bit longer.

##Webpack configs
####Development config
When the page is opened, a basic HTML layout is sent to the client along with a stringified redux store and a request for the common chunk of the JS.
The client then injects the redux store & router to create the page.
The redux devtools & logger are also loaded so you track your every state-changing action. 
The routes are loaded async, check your networks tab in chrome devtools and you'll see funny js files load now & again. 

####Production config
Builds the website & saves it to the `build` folder.
Maps the styles to the components, but uses the prerendered CSS from the server config (below)
Separates the `vendor` packages and the `app` packages for a super quick, cachable second visit.
Creates a webpack manifest to enable longterm caching (eg can push new vendor.js without pushing a new app.js)
Optimizes the number of chunks, sometimes it's better to have the modules of 2 routes in the same chunk if they're small

####Server config
A webpack config builds the entire contents of the routes on the server side.
This is required because node doesn't know how to require `.css`.
When a request is sent to the server, react-router matches the url to the correct route & sends it to the client.
Any browser dependency is ignored & uglified away.
To test this, disable javascript in the browser. You'll see the site & css loads without a FOUC.

##How it works
When the page loads, it checks your localStorage for `R3stack.token` & will automatically log you in if the token is legit. 
If not, just head to the 'Sign up' page. The 'Sign up' page uses redux-form, which handles all errors, schema validation,
and submissions. Your credentials are set as variables in a GraphQL mutation & sent to the GraphQL endpoint and a user document (similar to Meteor's) and authToken is returned to your state.

The 'Kanban' app requires a login & websocket, so when you enter, your token will be used to authenticate a websocket.
That token is stored on the server so it is only sent during the handshake (very similar to DDP). Socket state is managed
by `redux-socket-cluster`, just clicking `socket` in the devtools let's you explore its current state. 

When you enter the route, reducers are lazily loaded to the redux store and the `redux-optimistic-ui` reducer enhancer is applied to the store to enable an optimistic UI. To work, it requires some middleware that scans each redux action for an `isOptimistic` prop and reverts actions that fail server side.

When the kanban component loads, it subscribes to `lanes` & `notes`, which starts your personalized changefeed.
When you do something that changes the persisted state (eg add a kanban lane) that action is executed
optimistically on the client & emitted to the server where it is validated & sent to the database. 
The database then emits a changefeed doc to all subscribed viewers.
Since the DB doesn't know which client made the mutation, it always sends a changefeed to the server.
The server is smart enough to ignore sending that document back to the originator, but it does send an acknowledgement.

The kanban lane titles & notes are really basic, you click them & they turn into input fields. 
The notes can be dragged from lane to lane. This is to showcase a local state change that doesn't affect the persisted state.
When the note is dropped to its new location, the change is persisted. 

##Tutorials
 - [A production-ready realtime SaaS with webpack](https://medium.com/@matt.krick/a-production-ready-realtime-saas-with-webpack-7b11ba2fa5b0#.bifdf5iz8)
 - [GraphQL Field Guide to Auth](https://medium.com/@matt.krick/graphql-field-guide-to-auth-ead84f657ab#.f3tg2sf3d)

##Similar Projects
 - https://github.com/erikras/react-redux-universal-hot-example (Really nice, but no auth or DB)
 - https://github.com/kriasoft/react-starter-kit (nice, I borrowed their layout, but no sockets, no DB)
 - https://github.com/GordyD/3ree (uses RethinkDB, but no optimistic UI)
 - http://survivejs.com/ (A nice alt-flux & react tutorial for a kanban)

##In Action 
[R3stack](http://r3stack.com)

##Contributing
 - Pull requests welcomed!
 - Use the gitter for any questions

##Changelog
- 0.11
 - Updated all dependencies

- 0.10
 - Added Azk.io orchestrate development environments

# Acknowledgments

##### This project, as well as the group behind it, is dedicated in memory of [__Aaron Swartz__](http://www.rememberaaronsw.com/memories/).
<img src="https://raw.githubusercontent.com/r3stack/r3stack/master/aaron_swartz.png" width="800">
>“With enough of us, around the world, we’ll not just send a strong message opposing the privatization of knowledge — we’ll make it a thing of the past. Will you join us?”
- Aaron Swartz

##### Huge Thanks go to all the fantastic people that made all of this possible, especially:



- [__Matt Krick__](https://github.com/mattkrick) for making Meatier and putting up with my never ending stream of questions and crazy ideas, 
- [__Jonathan Gros-Dubois__](https://github.com/jondubois) for making SocketCluster and being the voice of reason to my own madness, 
- [__Julio Makdisse Saito__](https://github.com/saitodisse), [__Felipe Arenales Santos__](https://github.com/fearenales), [__Gullit Miranda__](https://github.com/gullitmiranda) and the rest of the amazing [__Azk.io team__](https://github.com/azukiapp) for all their hard work and support!
 
- Plus all the people involved in [__open source software__](https://github.com/) who tirelessly and continually contribute in making world a better place. One commit at a time. ;)

>“Individually, we are one drop. Together, we are an ocean.”
- Ryunosuke Satoro

 Sincere and deep thank you from your friend in [Araphel](https://github.com/araphel),
>[Bartek Kus](https://github.com/Bartekus)

##License
MIT
