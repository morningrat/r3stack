# [R3stack](http://r3stack.com) - Get that shit done!
##### Whether you want to learn or quickly start your project - R3stack allows you to dive right in! 
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

<img src="https://raw.githubusercontent.com/r3stack/r3stack/master/r3stack.png" width="600">

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

###### If you like to watch / something doesnt work
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

* It's possible that the precess might not go exactly as planned, but fear not, should something odd happen, like this:


```
remote: azk: Error: HTTP code is 500 which indicates error: server error - failed to create endpoint dev.azk.io_type.daemon_mid.c5363ad0b9_sys.rethinkdb_seq.1_uid.7334c800df on network bridge: Bind for 172.17.0.1:29015 failed: port is already allocated
remote:
remote: azk:     at /usr/lib/azk/node_modules/dockerode/node_modules/docker-modem/lib/modem.js:218:17
remote: azk:     at getCause (/usr/lib/azk/node_modules/dockerode/node_modules/docker-modem/lib/modem.js:246:7)
remote: azk:     at [object Object].Modem.buildPayload (/usr/lib/azk/node_modules/dockerode/node_modules/docker-modem/lib/modem.js:217:5)
remote: azk:     at IncomingMessage.<anonymous> (/usr/lib/azk/node_modules/dockerode/node_modules/docker-modem/lib/modem.js:193:14)
remote: azk:     at IncomingMessage.emit (events.js:117:20)
remote: azk:     at _stream_readable.js:944:16
remote: azk:     at process._tickCallback (node.js:448:13)
remote: azk: Sorry, an error has occurred.
remote: azk: A crash report about this error will be sent to azk team in order to make azk better.
remote: azk: Sending bug report to Azuki...
remote: azk: Bug report was sent. Thanks.
To ssh://git@45.55.27.195:22/home/git/94b279a.git
 * [new branch]      master -> master

App successfully deployed at http://r3stack.com (45.55.27.195)
```
Do this:
>azk deploy ssh

It will log you onto your server through azk agent and and when you use `ls` command you'll notice few directories, such as for example:
```
94b279a  94b279a.git  bin
```
Go into the one without .git, then enter 'azk status' and you should see something like this:
```
┌───┬───────────┬───────────┬──────────────────────┬─────────────────┬─────────────┐
│   │ System    │ Instances │ Hostname/url         │ Instances-Ports │ Provisioned │
├───┼───────────┼───────────┼──────────────────────┼─────────────────┼─────────────┤
│ − │ deploy    │ 0         │ dev.azk.io           │ -               │ -           │
├───┼───────────┼───────────┼──────────────────────┼─────────────────┼─────────────┤
│ ↓ │ rethinkdb │ 0         │ rethinkdb.dev.azk.io │ -               │ -           │
├───┼───────────┼───────────┼──────────────────────┼─────────────────┼─────────────┤
│ ↓ │ r3stack   │ 0         │ r3stack.com          │ -               │ -           │
└───┴───────────┴───────────┴──────────────────────┴─────────────────┴─────────────┘
```
As you can see, the deployment did not finish in its entirety, so we have to resume it by executing the `azk restart` command.
This should be the last step that you might have to take to deploy your app. Once it's completed you'll know your app is up when:
```
┌───┬───────────┬───────────┬─────────────────────────────┬───────────────────────────┬───────────────────┐
│   │ System    │ Instances │ Hostname/url                │ Instances-Ports           │ Provisioned       │
├───┼───────────┼───────────┼─────────────────────────────┼───────────────────────────┼───────────────────┤
│ − │ deploy    │ 0         │ dev.azk.io                  │ -                         │ -                 │
├───┼───────────┼───────────┼─────────────────────────────┼───────────────────────────┼───────────────────┤
│ ↑ │ rethinkdb │ 1         │ http://rethinkdb.dev.azk.io │ 1-http:8080, 1-data:28015 │ -                 │
│   │           │           │                             │ 1-cluster:29015           │                   │
├───┼───────────┼───────────┼─────────────────────────────┼───────────────────────────┼───────────────────┤
│ ↑ │ r3stack   │ 1         │ http://r3stack.com          │ 1-http:32768              │ a few seconds ago │
└───┴───────────┴───────────┴─────────────────────────────┴───────────────────────────┴───────────────────┘
```


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
>“Coming together is a beginning. Keeping together is progress. Working together is success.”
- Henry Ford

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
