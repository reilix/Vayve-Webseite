module.exports=[50227,(a,b,c)=>{b.exports=a.x("node:path",()=>require("node:path"))},2157,(a,b,c)=>{b.exports=a.x("node:fs",()=>require("node:fs"))},77973,28215,a=>{"use strict";let b;var c=a.x("node:sqlite",()=>require("node:sqlite"),!0),d=a.i(2157),e=a.i(50227);let f=process.env.DATA_DIR??e.default.join(process.cwd(),"data"),g=process.env.DATABASE_PATH??e.default.join(f,"vayve.db"),h=process.env.UPLOADS_DIR??e.default.join(f,"uploads");a.s(["DATABASE_PATH",0,g,"DATA_DIR",0,f,"UPLOADS_DIR",0,h],28215);let i=[{slug:"vayve-air-2026",title:"Vayve:Air",series:"vayve_air",starts_at:"2026-07-18T14:00:00.000Z",ends_at:null,doors:"14:00",location_name:"Thomas Read",location_address:null,city:"Bonn",lineup:null,genres:"Hard House · Trance · Bounce",description_de:"Unser Open Air unter freiem Himmel. Hard House, Trance und Bounce vom Nachmittag bis tief in die Nacht, gute Leute und beste Stimmung. Schnapp dir deine Crew und tanz mit uns in den Sommer.",description_en:"Our open air under the open sky. Hard House, Trance and Bounce from afternoon till deep into the night, good people and the best energy. Grab your crew and dance into summer with us.",cover_image:null,gallery:null,ticket_url:"https://shop.weeztix.com/c1017a81-64f7-11f1-8e27-d65b0659bc31/tickets?utm_source=ig&utm_medium=social&utm_content=link_in_bio",ticket_status:"on_sale",price_info:null,status:"published",featured:1},{slug:"vayve-run",title:"Vayve:Run",series:"vayve_run",starts_at:"2026-06-27T16:00:00.000Z",ends_at:null,doors:null,location_name:"Treffpunkt wird angekündigt",location_address:null,city:"",lineup:null,genres:"House · Bounce",description_de:"Ein DJ fährt voraus, du läufst hinterher – der Rave auf Beinen. Wir ziehen gemeinsam los, der Beat gibt das Tempo vor. Lockeres Tempo, große Vibes, alle sind eingeladen. Genauer Termin und Startpunkt folgen.",description_en:"A DJ rolls ahead, you run behind – the rave on legs. We set off together and the beat sets the pace. Easy tempo, big vibes, everyone is invited. Exact date and meeting point to follow.",cover_image:null,gallery:null,ticket_url:null,ticket_status:"free",price_info:"Kostenlos",status:"published",featured:0}],j=`
CREATE TABLE IF NOT EXISTS events (
  id              TEXT PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  series          TEXT NOT NULL DEFAULT 'other',
  starts_at       TEXT NOT NULL,
  ends_at         TEXT,
  doors           TEXT,
  location_name   TEXT NOT NULL,
  location_address TEXT,
  city            TEXT NOT NULL,
  lineup          TEXT,
  genres          TEXT,
  description_de  TEXT,
  description_en  TEXT,
  cover_image     TEXT,
  gallery         TEXT,
  ticket_url      TEXT,
  ticket_status   TEXT NOT NULL DEFAULT 'soon',
  price_info      TEXT,
  status          TEXT NOT NULL DEFAULT 'draft',
  featured        INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events(starts_at);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

CREATE TABLE IF NOT EXISTS submissions (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT,
  message     TEXT NOT NULL,
  created_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS meta (
  key   TEXT PRIMARY KEY,
  value TEXT
);
`;function k(a){let b=new Int32Array(new SharedArrayBuffer(4));for(let c=1;;c++)try{a();return}catch(d){let a=d.errcode;if(5!==a&&6!==a||c>=50)throw d;Atomics.wait(b,0,0,50+Math.floor(100*Math.random()))}}let l=globalThis.__vayveDb??(d.default.mkdirSync(f,{recursive:!0}),d.default.mkdirSync(h,{recursive:!0}),(b=new c.DatabaseSync(g)).exec("PRAGMA busy_timeout = 5000;"),k(()=>b.exec("PRAGMA journal_mode = WAL;")),b.exec("PRAGMA foreign_keys = ON;"),k(()=>b.exec(j)),k(()=>(function(a){try{if(a.prepare("SELECT value FROM meta WHERE key = 'seeded'").get())return;let b=new Date().toISOString(),c=a.prepare(`
      INSERT OR IGNORE INTO events (
        id, slug, title, series, starts_at, ends_at, doors,
        location_name, location_address, city, lineup, genres,
        description_de, description_en, cover_image, gallery, ticket_url,
        ticket_status, price_info, status, featured, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);for(let d of(a.exec("BEGIN IMMEDIATE"),i))c.run(crypto.randomUUID(),d.slug,d.title,d.series,d.starts_at,d.ends_at,d.doors,d.location_name,d.location_address,d.city,d.lineup,d.genres,d.description_de,d.description_en,d.cover_image,d.gallery,d.ticket_url,d.ticket_status,d.price_info,d.status,d.featured,b,b);a.prepare("INSERT OR IGNORE INTO meta (key, value) VALUES ('seeded', ?)").run(b),a.exec("COMMIT")}catch{try{a.exec("ROLLBACK")}catch{}}})(b)),b);a.s(["db",0,l],77973)},37936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"registerServerReference",{enumerable:!0,get:function(){return d.registerServerReference}});let d=a.r(11857)},13095,(a,b,c)=>{"use strict";function d(a){for(let b=0;b<a.length;b++){let c=a[b];if("function"!=typeof c)throw Object.defineProperty(Error(`A "use server" file can only export async functions, found ${typeof c}.
Read more: https://nextjs.org/docs/messages/invalid-use-server-value`),"__NEXT_ERROR_CODE",{value:"E352",enumerable:!1,configurable:!0})}}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"ensureServerEntryExports",{enumerable:!0,get:function(){return d}})},77463,a=>{"use strict";var b=a.i(37936),c=a.i(77973);async function d(a,b){let d=String(b.get("name")??"").trim(),e=String(b.get("email")??"").trim(),f=String(b.get("subject")??"").trim(),g=String(b.get("message")??"").trim();if(!d||!e||!g||!e.includes("@"))return{error:!0};try{var h;h={name:d,email:e,subject:f||null,message:g},c.db.prepare(`INSERT INTO submissions (id, name, email, subject, message, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`).run(crypto.randomUUID(),h.name,h.email,h.subject,h.message,new Date().toISOString())}catch{return{error:!0}}return{ok:!0}}(0,a.i(13095).ensureServerEntryExports)([d]),(0,b.registerServerReference)(d,"60f903f7fed5570ada1094512533688f3e9c75c9ca",null),a.s([],50979),a.i(50979),a.s(["60f903f7fed5570ada1094512533688f3e9c75c9ca",0,d],77463)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0zjahs_._.js.map