/**
 * Minified by jsDelivr using Terser v5.3.5.
 * Original file: /npm/socket.io@4.0.1/dist/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
 "use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,s,r){void 0===r&&(r=s),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[s]}})}:function(e,t,s,r){void 0===r&&(r=s),e[r]=t[s]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)"default"!==s&&Object.prototype.hasOwnProperty.call(e,s)&&__createBinding(t,e,s);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Namespace=exports.Socket=exports.Server=void 0;const http=require("http"),fs_1=require("fs"),zlib_1=require("zlib"),accepts=require("accepts"),stream_1=require("stream"),path=require("path"),engine=require("engine.io"),client_1=require("./client"),events_1=require("events"),namespace_1=require("./namespace");Object.defineProperty(exports,"Namespace",{enumerable:!0,get:function(){return namespace_1.Namespace}});const parent_namespace_1=require("./parent-namespace"),socket_io_adapter_1=require("socket.io-adapter"),parser=__importStar(require("socket.io-parser")),debug_1=__importDefault(require("debug")),socket_1=require("./socket");Object.defineProperty(exports,"Socket",{enumerable:!0,get:function(){return socket_1.Socket}});const typed_events_1=require("./typed-events"),debug=debug_1.default("socket.io:server"),clientVersion=require("../package.json").version,dotMapRegex=/\.map/;class Server extends typed_events_1.StrictEventEmitter{constructor(e,t={}){super(),this._nsps=new Map,this.parentNsps=new Map,"object"==typeof e&&e instanceof Object&&!e.listen&&(t=e,e=void 0),this.path(t.path||"/socket.io"),this.connectTimeout(t.connectTimeout||45e3),this.serveClient(!1!==t.serveClient),this._parser=t.parser||parser,this.encoder=new this._parser.Encoder,this.adapter(t.adapter||socket_io_adapter_1.Adapter),this.sockets=this.of("/"),this.opts=t,e&&this.attach(e)}serveClient(e){return arguments.length?(this._serveClient=e,this):this._serveClient}_checkNamespace(e,t,s){if(0===this.parentNsps.size)return s(!1);const r=this.parentNsps.keys(),i=()=>{const n=r.next();if(n.done)return s(!1);n.value(e,t,((t,r)=>{t||!r?i():s(this.parentNsps.get(n.value).createChild(e))}))};i()}path(e){if(!arguments.length)return this._path;this._path=e.replace(/\/$/,"");const t=this._path.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");return this.clientPathRegex=new RegExp("^"+t+"/socket\\.io(\\.min|\\.msgpack\\.min)?\\.js(\\.map)?$"),this}connectTimeout(e){return void 0===e?this._connectTimeout:(this._connectTimeout=e,this)}adapter(e){if(!arguments.length)return this._adapter;this._adapter=e;for(const e of this._nsps.values())e._initAdapter();return this}listen(e,t={}){return this.attach(e,t)}attach(e,t={}){if("function"==typeof e){throw new Error("You are trying to attach socket.io to an express request handler function. Please pass a http.Server instance.")}if(Number(e)==e&&(e=Number(e)),"number"==typeof e){debug("creating http server and binding to %d",e);const t=e;(e=http.createServer(((e,t)=>{t.writeHead(404),t.end()}))).listen(t)}return Object.assign(t,this.opts),t.path=t.path||this._path,this.initEngine(e,t),this}initEngine(e,t){debug("creating engine.io instance with opts %j",t),this.eio=engine.attach(e,t),this._serveClient&&this.attachServe(e),this.httpServer=e,this.bind(this.eio)}attachServe(e){debug("attaching client serving req handler");const t=e.listeners("request").slice(0);e.removeAllListeners("request"),e.on("request",((s,r)=>{if(this.clientPathRegex.test(s.url))this.serve(s,r);else for(let i=0;i<t.length;i++)t[i].call(e,s,r)}))}serve(e,t){const s=e.url.replace(this._path,""),r=dotMapRegex.test(s),i=r?"map":"source",n='"'+clientVersion+'"',o="W/"+n,a=e.headers["if-none-match"];if(a&&(n===a||o===a))return debug("serve client %s 304",i),t.writeHead(304),void t.end();debug("serve client %s",i),t.setHeader("Cache-Control","public, max-age=0"),t.setHeader("Content-Type","application/"+(r?"json":"javascript")),t.setHeader("ETag",n),r||t.setHeader("X-SourceMap",s.substring(1)+".map"),Server.sendFile(s,e,t)}static sendFile(e,t,s){const r=fs_1.createReadStream(path.join(__dirname,"../client-dist/",e)),i=e=>{e&&s.end()};switch(accepts(t).encodings(["br","gzip","deflate"])){case"br":s.writeHead(200,{"content-encoding":"br"}),r.pipe(zlib_1.createBrotliCompress()).pipe(s),stream_1.pipeline(r,zlib_1.createBrotliCompress(),s,i);break;case"gzip":s.writeHead(200,{"content-encoding":"gzip"}),stream_1.pipeline(r,zlib_1.createGzip(),s,i);break;case"deflate":s.writeHead(200,{"content-encoding":"deflate"}),stream_1.pipeline(r,zlib_1.createDeflate(),s,i);break;default:s.writeHead(200),stream_1.pipeline(r,s,i)}}bind(e){return this.engine=e,this.engine.on("connection",this.onconnection.bind(this)),this}onconnection(e){debug("incoming connection with id %s",e.id);const t=new client_1.Client(this,e);return 3===e.protocol&&t.connect("/"),this}of(e,t){if("function"==typeof e||e instanceof RegExp){const s=new parent_namespace_1.ParentNamespace(this);return debug("initializing parent namespace %s",s.name),"function"==typeof e?this.parentNsps.set(e,s):this.parentNsps.set(((t,s,r)=>r(null,e.test(t))),s),t&&s.on("connect",t),s}"/"!==String(e)[0]&&(e="/"+e);let s=this._nsps.get(e);return s||(debug("initializing namespace %s",e),s=new namespace_1.Namespace(this,e),this._nsps.set(e,s)),t&&s.on("connect",t),s}close(e){for(const e of this.sockets.sockets.values())e._onclose("server shutting down");this.engine.close(),this.httpServer?this.httpServer.close(e):e&&e()}use(e){return this.sockets.use(e),this}to(e){return this.sockets.to(e)}in(e){return this.sockets.in(e)}except(e){return this.sockets.except(e),this}send(...e){return this.sockets.emit("message",...e),this}write(...e){return this.sockets.emit("message",...e),this}allSockets(){return this.sockets.allSockets()}compress(e){return this.sockets.compress(e)}get volatile(){return this.sockets.volatile}get local(){return this.sockets.local}fetchSockets(){return this.sockets.fetchSockets()}socketsJoin(e){return this.sockets.socketsJoin(e)}socketsLeave(e){return this.sockets.socketsLeave(e)}disconnectSockets(e=!1){return this.sockets.disconnectSockets(e)}}exports.Server=Server;const emitterMethods=Object.keys(events_1.EventEmitter.prototype).filter((function(e){return"function"==typeof events_1.EventEmitter.prototype[e]}));emitterMethods.forEach((function(e){Server.prototype[e]=function(){return this.sockets[e].apply(this.sockets,arguments)}})),module.exports=(e,t)=>new Server(e,t),module.exports.Server=Server;
 //# sourceMappingURL=/sm/f54959158fa7ae94486a5a082df2fcbbbbcff9e604a299ff41929f2c64a6a2c3.map