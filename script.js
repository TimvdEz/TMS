const ASSETS={"postcard":"assets/postcard.jpg","boarding":"assets/boarding.jpg"};
document.getElementById('refPostcard').src=ASSETS.postcard;document.getElementById('refBoarding').src=ASSETS.boarding;
const COUNTRIES=['Netherlands','Germany','Portugal','Spain','Ireland','Turkey'];
const FLAGS={'Netherlands':'🇳🇱','Germany':'🇩🇪','Portugal':'🇵🇹','Spain':'🇪🇸','Ireland':'🇮🇪','Turkey':'🇹🇷','France':'🇫🇷','Italy':'🇮🇹','Poland':'🇵🇱','Belgium':'🇧🇪','Sweden':'🇸🇪','Denmark':'🇩🇰','United Kingdom':'🇬🇧','Other':'🌍'};
const seed=[
{id:'s1',name:'Mila',country:'Netherlands',title:'The icon-first help map',persona:'Noor',barrier:'Language',idea:'A simple printed city map with recognisable symbols and QR codes that lead to audio instructions in different languages.',why:'People can start with paper, even if their phone is old or they do not read the local language.',likes:12,comments:[{name:'João',country:'Portugal',text:'What if the map also worked without scanning anything?'}],created:1},
{id:'s2',name:'João',country:'Portugal',title:'The friendly sound stations',persona:'Noor',barrier:'Technology',idea:'Small help points in community centres play short multilingual audio messages when you press a colourful symbol.',why:'A person can access guidance without a smartphone.',likes:18,comments:[{name:'Lena',country:'Germany',text:'Love the offline approach. Could the buttons use tactile shapes too?'}],created:2},
{id:'s3',name:'Lena',country:'Germany',title:'One tap, one clear step',persona:'Noor',barrier:'Complexity',idea:'A support-service finder that shows one action at a time with clear icons, high contrast and an optional voice guide.',why:'Reducing choices helps people feel confident when the interface is overwhelming.',likes:9,comments:[],created:3},
{id:'s4',name:'Sofía',country:'Spain',title:'The neighbourhood welcome cards',persona:'Noor',barrier:'Language',idea:'Illustrated pocket cards show everyday situations. Point to a picture to ask for directions, help or information.',why:'Visual communication works across languages and without internet.',likes:15,comments:[{name:'Mila',country:'Netherlands',text:'These could connect to the icon map!'}],created:4},
{id:'s5',name:'Ece',country:'Turkey',title:'Playful wayfinding footprints',persona:'Noor',barrier:'Complexity',idea:'Colourful floor paths and friendly symbols guide newcomers towards the right local support desk, without requiring an app.',why:'People can navigate without reading long instructions or using an app.',likes:11,comments:[],created:5},
{id:'s6',name:'Aoife',country:'Ireland',title:'Ask a symbol',persona:'Noor',barrier:'Technology',idea:'A set of durable pictogram cards at the information desk lets visitors show what they need without speaking the same language.',why:'Human support becomes easier to access, even without a device.',likes:7,comments:[],created:6}
];
const key='projectinc_demo_v2';let state;try{state=JSON.parse(localStorage.getItem(key))||{posts:[],likes:[],comments:{}}}catch(e){state={posts:[],likes:[],comments:{}}}state.posts=Array.isArray(state.posts)?state.posts:[];state.likes=Array.isArray(state.likes)?state.likes:[];state.comments=state.comments&&typeof state.comments==='object'?state.comments:{};
function persist(){try{localStorage.setItem(key,JSON.stringify(state));return true}catch(e){console.warn('Local browser storage unavailable',e);return false}}

function allPosts(){return [...state.posts,...seed].map(p=>({...p,comments:[...(p.comments||[]),...(state.comments[p.id]||[])]}))}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function go(id){document.querySelectorAll('.section').forEach(s=>s.classList.toggle('active',s.id===id));document.querySelectorAll('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===id));window.scrollTo(0,0);if(id==='challenge')renderStep();if(id==='gallery')renderGallery();if(id==='apply')renderCountryOptions()}
function toast(t){let e=document.getElementById('toast');e.textContent=t;e.style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>e.style.display='none',3200)}
let step=0;let missionData={persona:'Noor',barrier:'',need:'',title:'',idea:'',why:'',name:'',country:''};
const travellers=[
{id:'Noor',icon:'🧳',desc:'Noor just moved to a new city. They need to find a local support service but do not speak the local language well. Their phone is old and mobile data is limited.'},
{id:'Alex',icon:'🧭',desc:'Noor needs accessible information about local services.'}
];
const barriers=[['Language','Words are not always understood'],['Technology','A device or internet may be unavailable'],['Complexity','Too many steps can be overwhelming'],['Confidence','Asking for help can feel difficult']];
function renderStep(){
document.querySelectorAll('#steps li').forEach((li,i)=>{li.className=i===step?'current':i<step?'done':''});document.getElementById('progressbar').style.width=((step+1)*25)+'%';
let w=document.getElementById('workspace'),s='';
if(step===0)s=`<div class="eyebrow orange">STEP 01 / EMPATHISE</div><h2>Meet Noor. One shared challenge.</h2><p class="muted">Everyone starts with the same real-world inspired situation. Your ideas can be completely different.</p><div class="noor-layout">

  <div class="prompt noor-story">
    <strong>🧳 NOOR'S STORY</strong>

    Noor has just arrived in a new city and needs to
    find a local support service. She don't speak
    the local language well, has an older phone
    and limited mobile data.

    Where should she go? Who can she ask?
    How can she trust the information?
  </div>

  <img
    src="assets/noor.png"
    alt="Portrait of Noor"
    class="noor-photo"
  >

</div><p><strong>Your mission:</strong> Design a playful, inclusive way for Noor to find reliable help, even without a modern smartphone.</p><p class="smallnote">Click the purple start button below to begin.</p><div class="bottom-actions"><span class="smallnote">Look through Noor's eyes before solving the problem.</span><button class="btn" onclick="missionData.persona='Noor';nextStep()">Start the mission →</button></div>`;
if(step===1)s=`<div class="eyebrow orange">STEP 02 / DEFINE</div><h2>What's the real barrier?</h2><p class="muted">You are designing for <b>${esc(missionData.persona)}</b>. Identify the most important barrier in Noor’s situation, then complete one simple need statement.</p><div class="choicegrid">${barriers.map(b=>`<button class="choice ${missionData.barrier===b[0]?'selected':''}" onclick="missionData.barrier='${b[0]}';renderStep()"><b>${b[0]}</b><br><span style="font-size:13px;font-weight:400">${b[1]}</span></button>`).join('')}</div><div class="field"><label for="need">Complete: "${esc(missionData.persona)} needs a way to…"</label><textarea id="need" maxlength="220" placeholder="e.g. find trusted help without relying on translated text" oninput="missionData.need=this.value">${esc(missionData.need)}</textarea><div class="hint">Stay specific: what would make her next step easier?</div></div><div class="bottom-actions"><button class="btn light" onclick="prevStep()">← Back</button><button id="next" class="btn" onclick="nextStep()" >Continue →</button></div>`;
if(step===2)s=`<div class="eyebrow orange">STEP 03 / IDEATE</div><h2>Make it playful. Make it inclusive.</h2><p class="muted">Imagine a solution that helps <b>${esc(missionData.persona)}</b>. It could be a physical object, a digital experience, a game, a service or something unexpected.</p><div class="prompt"><strong>✳ YOUR DESIGN TWIST</strong>Make your solution work even when someone has limited digital access. Bonus: use play, visuals, storytelling or human connection.</div><div class="field"><label for="ideaTitle">Give your idea a title *</label><input id="ideaTitle" maxlength="75" placeholder="e.g. The Welcome Compass" value="${esc(missionData.title)}" oninput="missionData.title=this.value;updateIdeaButton()"></div><div class="field"><label for="ideaText">Describe your idea in 2–4 sentences *</label><textarea id="ideaText" maxlength="650" placeholder="What does the person do? What makes your idea creative?" oninput="missionData.idea=this.value;updateIdeaButton()">${esc(missionData.idea)}</textarea></div><div class="field"><label for="ideaWhy">Why would this help? *</label><textarea id="ideaWhy" maxlength="320" placeholder="Explain how your idea removes the barrier." oninput="missionData.why=this.value;updateIdeaButton()">${esc(missionData.why)}</textarea></div><div class="bottom-actions"><button class="btn light" onclick="prevStep()">← Back</button><button id="next" class="btn" onclick="nextStep()" >Review idea →</button></div>`;
if(step===3)s=`<div class="eyebrow orange">STEP 04 / SHARE</div><h2>Stamp your passport.</h2><p class="muted">Your idea is ready for take-off. Add your name and nationality so others can explore different perspectives.</p><div class="prompt"><strong>${esc(missionData.title)}</strong><div style="margin:8px 0">${esc(missionData.idea)}</div><small><b>Why it helps:</b> ${esc(missionData.why)}</small></div><div class="field"><label for="authorName">Your name or nickname *</label><input id="authorName" maxlength="45" placeholder="How should your idea be credited?" value="${esc(missionData.name)}" oninput="missionData.name=this.value;updatePublishButton()"></div><div class="field"><label for="authorCountry">Nationality / country *</label><select id="authorCountry" onchange="missionData.country=this.value;updatePublishButton()"><option value="">Select your country</option>${COUNTRIES.map(c=>`<option ${missionData.country===c?'selected':''}>${esc(c)}</option>`).join('')}</select></div><p class="smallnote">Your idea and chosen name will appear in Idea Arrivals. Please avoid sharing personal contact details. </p><div class="bottom-actions"><button class="btn light" onclick="prevStep()">← Back</button><button id="publish" class="btn yellow" onclick="publish()" >Publish my idea ✈</button></div>`;
w.innerHTML=s;
}
function updateIdeaButton(){}
function ideaValid(){return missionData.title.trim().length>=3&&missionData.idea.trim().length>=20&&missionData.why.trim().length>=10}
function updatePublishButton(){}
function nextStep(){
 if(step===0){missionData.persona='Noor';step=1;renderStep();return;}
 if(step===1){let el=document.getElementById('need');missionData.need=el?el.value.trim():missionData.need;if(!missionData.barrier){toast('Choose one barrier before continuing.');return;}if(missionData.need.length<10){toast('Describe Noor’s need in at least 10 characters.');return;}}
 if(step===2){missionData.title=document.getElementById('ideaTitle').value.trim();missionData.idea=document.getElementById('ideaText').value.trim();missionData.why=document.getElementById('ideaWhy').value.trim();if(!ideaValid()){toast('Add a title (3+ characters), an idea (20+), and why it helps (10+).');return;}}
 if(step<3){step++;renderStep();}
}
function prevStep(){if(step>0)step--;renderStep()}
function publish(){let n=document.getElementById('authorName'),c=document.getElementById('authorCountry');missionData.name=n.value.trim();missionData.country=c.value;if(!missionData.name||!missionData.country||!ideaValid()){toast('Enter your name and select a participating country.');return;}let p={id:'u'+Date.now(),name:missionData.name,country:missionData.country,title:missionData.title,persona:missionData.persona,barrier:missionData.barrier,idea:missionData.idea,why:missionData.why,need:missionData.need,likes:0,comments:[],created:Date.now()};state.posts.unshift(p);persist();missionData={persona:'Noor',barrier:'',need:'',title:'',idea:'',why:'',name:'',country:''};step=0;go('gallery');toast('Idea received. It is now on the arrivals board.');openPost(p.id)}
function renderGallery(){let country=document.getElementById('countryFilter'),current=country.value;let all=allPosts(),available=[...new Set(all.map(p=>p.country))].sort();country.innerHTML='<option value="">All nationalities</option>'+available.map(c=>`<option value="${esc(c)}">${FLAGS[c]||'🌍'} ${esc(c)}</option>`).join('');country.value=available.includes(current)?current:'';let q=document.getElementById('search').value.toLowerCase().trim(),sort=document.getElementById('sort').value;let posts=all.filter(p=>(!country.value||p.country===country.value)&&(!q||[p.title,p.idea,p.name,p.country].some(x=>String(x).toLowerCase().includes(q))));posts.sort((a,b)=>sort==='likes'?(b.likes+Number(state.likes.includes(b.id)))-(a.likes+Number(state.likes.includes(a.id))):sort==='comments'?b.comments.length-a.comments.length:b.created-a.created);document.getElementById('galleryCount').textContent=posts.length+' ideas at the terminal · '+available.length+' countries represented';document.getElementById('galleryGrid').innerHTML=posts.length?posts.map(p=>`<article class="idea-card"><div class="tag">${FLAGS[p.country]||'🌍'} ${esc(p.country)} · ${esc(p.barrier)}</div><h3>${esc(p.title)}</h3><p>${esc(p.idea.length>165?p.idea.slice(0,165)+'…':p.idea)}</p><div class="smallnote">By <b>${esc(p.name)}</b> · ${esc(p.persona)}'s challenge</div><footer><button class="iconbtn ${state.likes.includes(p.id)?'liked':''}" onclick="toggleLike('${p.id}')">♥ ${p.likes+Number(state.likes.includes(p.id))}</button><button class="iconbtn" onclick="openPost('${p.id}')">💬 ${p.comments.length} · View ↗</button></footer></article>`).join(''):'<div class="empty" style="grid-column:1/-1">Nothing on this board yet. Clear a filter or check another country.</div>'}
function toggleLike(id){let i=state.likes.indexOf(id);i<0?state.likes.push(id):state.likes.splice(i,1);persist();renderGallery();if(document.getElementById('modalshade').classList.contains('open'))openPost(id)}
let currentPost=null;
function openPost(id){
 const p=allPosts().find(x=>x.id===id);if(!p)return;
 currentPost=id;
 const priorName=sessionStorageSafe('inc_reply_name')||'';
 const priorCountry=sessionStorageSafe('inc_reply_country')||'';
 const commentsHTML=p.comments.length?p.comments.map(c=>`<div class="comment"><div class="comment-head"><b>${FLAGS[c.country]||'🌍'} ${esc(c.name)}${c.country?' · '+esc(c.country):''}</b></div><p>${esc(c.text)}</p></div>`).join(''):'<p class="muted">No replies yet. What could you add to this idea?</p>';
 document.getElementById('modalContent').innerHTML=`
 <div class="pill">${FLAGS[p.country]||'🌍'} ${esc(p.country)} · ${esc(p.barrier)}</div>
 <h2 id="modalTitle" style="font-size:34px;margin-top:15px">${esc(p.title)}</h2>
 <p class="smallnote">By ${esc(p.name)} · Designing for ${esc(p.persona)}</p>
 <h3>The idea</h3><p>${esc(p.idea)}</p><h3>Why it helps</h3><p>${esc(p.why)}</p>
 <div class="actions" style="margin:15px 0"><button class="iconbtn ${state.likes.includes(p.id)?'liked':''}" onclick="toggleLike('${p.id}')">♥ ${p.likes+Number(state.likes.includes(p.id))} likes</button><button class="iconbtn" onclick="closeModal();go('challenge')">Try the challenge yourself ↗</button></div>
 <hr style="border:0;border-top:1px solid var(--line);margin:25px 0">
 <h3>Across borders · <span id="replyCount">${p.comments.length}</span> comments</h3>
 <div id="replyList">${commentsHTML}</div>
 <div class="reply-composer"><div class="eyebrow orange" style="margin-bottom:8px">JOIN THE CONVERSATION</div>
 <label for="commentText" style="font-weight:800;display:block;margin-bottom:8px">Your response *</label>
 <textarea id="commentText" rows="4" maxlength="450" placeholder="A different angle? An idea to build on? Write it here…" style="width:100%;border:1px solid #bcb0c7;border-radius:4px;padding:12px;background:#fff;resize:vertical"></textarea>
 <div class="reply-row"><div class="field"><label for="commentName">Name (optional)</label><input id="commentName" maxlength="45" placeholder="Guest traveller" value="${esc(priorName)}"></div><div class="field"><label for="commentCountry">Country (optional)</label><select id="commentCountry"><option value="">Not specified</option>${COUNTRIES.map(c=>`<option value="${esc(c)}" ${priorCountry===c?'selected':''}>${esc(c)}</option>`).join('')}</select></div></div>
 <div class="reply-actions"><button class="btn" id="sendReply" type="button">POST RESPONSE →</button><span class="smallnote">Your reply appears instantly on this board.</span></div>
 <p id="replyFeedback" role="status" aria-live="polite" class="comment-confirm" style="display:none"></p></div>`;
 document.getElementById('modalshade').classList.add('open');document.body.style.overflow='hidden';
 document.getElementById('sendReply').addEventListener('click',()=>submitReply(id));
}
function sessionStorageSafe(key){try{return sessionStorage.getItem(key)}catch(e){return ''}}
function closeModal(){document.getElementById('modalshade').classList.remove('open');document.body.style.overflow=''}
function submitReply(id){
 const message=document.getElementById('commentText').value.trim();
 const name=document.getElementById('commentName').value.trim()||'Guest traveller';
 const country=document.getElementById('commentCountry').value;
 const feedback=document.getElementById('replyFeedback');
 if(message.length<3){feedback.style.display='block';feedback.style.color='#a83d41';feedback.textContent='Write a short comment before posting.';document.getElementById('commentText').focus();return;}
 const entry={name,country,text:message,created:Date.now()};
 if(!Array.isArray(state.comments[id]))state.comments[id]=[];
 state.comments[id].push(entry);
 try{sessionStorage.setItem('inc_reply_name',name==='Guest traveller'?'':name);sessionStorage.setItem('inc_reply_country',country)}catch(e){}
 const saved=persist();
 renderGallery();
 // Update only the discussion panel, keeping the user's context and focus.
 const list=document.getElementById('replyList');
 const empty=list.querySelector('.muted');if(empty)empty.remove();
 const comment=document.createElement('div');comment.className='comment';
 const head=document.createElement('div');head.className='comment-head';
 const author=document.createElement('b');author.textContent=(FLAGS[country]||'🌍')+' '+name+(country?' · '+country:'');head.appendChild(author);
 const paragraph=document.createElement('p');paragraph.textContent=message;
 comment.append(head,paragraph);list.appendChild(comment);
 document.getElementById('replyCount').textContent=allPosts().find(p=>p.id===id).comments.length;
 document.getElementById('commentText').value='';
 feedback.style.display='block';feedback.style.color='#367966';feedback.textContent=saved?'Response posted and saved in this browser.':'Response posted. Your browser does not allow permanent local storage.';
 comment.scrollIntoView({block:'nearest',behavior:'smooth'});
}
function renderCountryOptions(){let e=document.getElementById('applyCountry');if(e.options.length>0)return;e.innerHTML='<option value="">Choose your country</option>'+COUNTRIES.map(c=>`<option>${esc(c)}</option>`).join('')}

function submitInterest(e) {
  e.preventDefault();

  const name = document.getElementById("applyName").value.trim();
  const email = document.getElementById("applyEmail").value.trim();
  const university = document.getElementById("applyUni").value.trim();
  const country = document.getElementById("applyCountry").value;

  const reference = "INC-" + Date.now()
    .toString(36)
    .toUpperCase();

  // Hide the form
  document.getElementById("applyForm").style.display = "none";

  const success = document.getElementById("applySuccess");
  success.style.display = "block";

  // Create the boarding pass
  success.innerHTML = `
    <div class="boarding-pass">

      <div class="boarding-top">
        <div class="boarding-brand">
  <img
    src="assets/logo.png"
    alt="ProjectINc logo"
    class="boarding-logo"
  >
  <span>CREATIVE FLIGHT · INC–001</span>
</div>

        <h2>YOUR BOARDING PASS</h2>
        <p>YOUR NEXT IDEA TAKES OFF HERE.</p>
      </div>

      <div class="boarding-body">

        <div class="boarding-route">
          <div>
            <small>DEPARTURE</small>
            <strong>${esc(university)}</strong>
          </div>

          <div class="boarding-plane">✈</div>

          <div>
            <small>DESTINATION</small>
            <strong>PROJECTINC</strong>
          </div>
        </div>

        <div class="boarding-details">

          <div>
            <small>PASSENGER</small>
            <strong>${esc(name)}</strong>
          </div>

          <div>
            <small>COUNTRY</small>
            <strong>${esc(country)}</strong>
          </div>

          <div>
            <small>FLIGHT NO.</small>
            <strong>INC–001</strong>
          </div>

          <div>
            <small>SEAT</small>
            <strong>CREATIVE CLASS</strong>
          </div>

          <div class="boarding-email">
            <small>STUDENT EMAIL</small>
            <strong>${esc(email)}</strong>
          </div>

          <div>
            <small>REFERENCE</small>
            <strong>${esc(reference)}</strong>
          </div>

        </div>

      </div>

      <div class="boarding-bottom">
        <span>ONE BRIEF. SIX COUNTRIES.</span>
        <span>✈ READY FOR TAKE-OFF</span>
      </div>

    </div>

    <div class="boarding-notice">
      <h3>Your interest boarding pass is ready!</h3>

      <p>
        This is a personal souvenir of your interest
        in ProjectINc, not a confirmed registration.
        Contact your university coordinator to
        complete the official application.
      </p>
    </div>

    <div class="boarding-actions">
      <button
        class="btn yellow"
        type="button"
        onclick="window.print()"
      >
        ✈ Print / save boarding pass
      </button>

      <button
        class="btn light"
        type="button"
        onclick="resetInterestForm()"
      >
        Start again
      </button>
    </div>
  `;

  // Open the browser's print dialog
  window.print();
}

function resetInterestForm() {
  const form = document.getElementById("applyForm");

  form.reset();
  form.style.display = "block";

  document.getElementById("applySuccess").style.display = "none";
  document.getElementById("applySuccess").innerHTML = "";
}

document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});renderStep();

// ProjectINc - Flying airplane animation

function createFlyingPlane(zone) {
  const canvas = document.createElement("canvas");
  canvas.className = "flight-canvas";
  canvas.setAttribute("aria-hidden", "true");
  zone.prepend(canvas);

  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let width = 0;
  let height = 0;
  let dots = [];
  let previousTime = 0;
  let previousProgress = 0;

  const duration = 14000;
  const trailLifetime = 2200;

  function resize() {
    const rect = zone.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    dots = [];
  }

  const observer = new ResizeObserver(resize);
  observer.observe(zone);
  resize();

  function getPosition(progress) {
    const x = -35 + progress * (width + 70);

    const y =
      height * 0.55 +
      Math.sin(progress * Math.PI * 2) * Math.min(48, height * 0.2) +
      Math.sin(progress * Math.PI * 4) * 12;

    return { x, y };
  }

  function animate(time) {
    if (reducedMotion.matches) {
      ctx.clearRect(0, 0, width, height);
      requestAnimationFrame(animate);
      return;
    }

    const progress = (time % duration) / duration;

    if (progress < previousProgress) {
      dots = [];
    }

    previousProgress = progress;

    const position = getPosition(progress);
    const next = getPosition(Math.min(progress + 0.001, 1));

    const angle = Math.atan2(
      next.y - position.y,
      next.x - position.x
    );

    ctx.clearRect(0, 0, width, height);

    // Add trail dots behind the airplane
    if (time - previousTime > 65) {
      dots.push({
        x: position.x - Math.cos(angle) * 23,
        y: position.y - Math.sin(angle) * 23,
        born: time
      });

      previousTime = time;
    }

    // Remove old dots
    dots = dots.filter(
      dot => time - dot.born < trailLifetime
    );

    // Draw slowly fading dots
    dots.forEach(dot => {
      const age = (time - dot.born) / trailLifetime;
      const opacity = 0.65 * (1 - age);

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(71, 42, 105, ${opacity})`;
      ctx.fill();
    });

    // Draw airplane
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(angle);

    ctx.fillStyle = "#61339c";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✈", 0, 0);

    ctx.restore();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Activate animation in selected sections
document.querySelectorAll(".flight-zone").forEach(zone => {
  createFlyingPlane(zone);
});


/* PROJECTINC — SKETCH YOUR IDEA */

(() => {
  const originalRenderStep = renderStep;
  const originalPublish = publish;
  const originalRenderGallery = renderGallery;
  const originalOpenPost = openPost;

  const isSketch = value =>
    typeof value === "string" &&
    /^data:image\/(webp|png|jpeg);base64,/.test(value);

  function sketchImage(data, extraClass = "") {
    if (!isSketch(data)) return null;

    const img = document.createElement("img");
    img.src = data;
    img.alt = "Drawing of the proposed idea";
    img.className = `idea-sketch ${extraClass}`;
    return img;
  }

  function addSketchPad() {
    const workspace = document.getElementById("workspace");
    const actions = workspace.querySelector(".bottom-actions");

    if (!actions) return;

    const panel = document.createElement("section");
    panel.className = "sketch-panel";

    panel.innerHTML = `
      <div class="sketch-heading">
        <div>
          <strong>SKETCH YOUR IDEA</strong>
          <p>Draw it. Don't overthink it. (optional)</p>
        </div>
        <span>✎ 2 MIN</span>
      </div>

      <div class="sketch-tools">
        <button type="button" class="sketch-tool is-active"
                data-draw="pen">✎ Pen</button>

        <button type="button" class="sketch-tool"
                data-draw="eraser">⌫ Eraser</button>

        <label>
          Ink
          <input type="color" value="#2E1B4D"
                 aria-label="Drawing colour">
        </label>

        <button type="button" class="sketch-tool"
                data-draw="clear">Clear sketch</button>
      </div>

      <canvas class="sketch-canvas"
              width="640"
              height="320"
              aria-label="Draw your idea here"></canvas>

      <p class="sketch-help">
        Works with a mouse, trackpad or touchscreen.
      </p>
    `;

    workspace.insertBefore(panel, actions);

    const canvas = panel.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    let drawing = false;
    let tool = "pen";
    let colour = "#2E1B4D";
    let last = null;

    function clearSurface() {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    clearSurface();

    // Restore a previous sketch when returning to step 3
    if (isSketch(missionData.sketch)) {
      const saved = new Image();

      saved.onload = () => {
        if (!canvas.isConnected || drawing) return;
        ctx.drawImage(saved, 0, 0, canvas.width, canvas.height);
      };

      saved.src = missionData.sketch;
    }

    function save() {
      missionData.sketch = canvas.toDataURL("image/webp", 0.65);
    }

    function position(event) {
      const rect = canvas.getBoundingClientRect();

      return {
        x: (event.clientX - rect.left) *
           canvas.width / rect.width,

        y: (event.clientY - rect.top) *
           canvas.height / rect.height
      };
    }

    canvas.addEventListener("pointerdown", event => {
      if (event.button !== undefined && event.button !== 0) return;

      drawing = true;
      canvas.setPointerCapture(event.pointerId);
      last = position(event);

      ctx.fillStyle =
        tool === "eraser" ? "#ffffff" : colour;

      ctx.beginPath();
      ctx.arc(
        last.x,
        last.y,
        tool === "eraser" ? 12 : 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    canvas.addEventListener("pointermove", event => {
      if (!drawing) return;

      const next = position(event);

      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(next.x, next.y);

      ctx.strokeStyle =
        tool === "eraser" ? "#ffffff" : colour;

      ctx.lineWidth = tool === "eraser" ? 24 : 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      last = next;
    });

    function finish() {
      if (!drawing) return;
      drawing = false;
      save();
    }

    canvas.addEventListener("pointerup", finish);
    canvas.addEventListener("pointercancel", finish);
    canvas.addEventListener("lostpointercapture", finish);

    // Pen, eraser and clear buttons
    panel.querySelectorAll("[data-draw]").forEach(button => {
      button.addEventListener("click", () => {
        const action = button.dataset.draw;

        if (action === "clear") {
          clearSurface();
          missionData.sketch = "";
          return;
        }

        tool = action;

        panel.querySelectorAll(
          '[data-draw="pen"], [data-draw="eraser"]'
        ).forEach(b => {
          b.classList.toggle("is-active", b === button);
        });
      });
    });

    // Colour picker
    panel.querySelector('input[type="color"]')
      .addEventListener("input", event => {
        colour = event.target.value;
      });
  }

  // Add sketch pad to Ideate and preview to Share
  renderStep = function () {
    originalRenderStep();

    if (step === 2) {
      addSketchPad();
    }

    if (step === 3 && isSketch(missionData.sketch)) {
      const img = sketchImage(
        missionData.sketch,
        "share-sketch"
      );

      const summary =
        document.querySelector("#workspace .prompt");

      if (summary && img) summary.appendChild(img);
    }
  };

  // Save sketch with the published idea
  publish = function () {
    const sketch = isSketch(missionData.sketch)
      ? missionData.sketch
      : "";

    const before = state.posts.length;

    originalPublish();

    if (state.posts.length === before + 1) {
      const post = state.posts[0];

      if (sketch) post.sketch = sketch;

      persist();
      renderGallery();
      openPost(post.id);
    }
  };

  // Show sketches on Idea Arrivals cards
  renderGallery = function () {
    originalRenderGallery();

    document.querySelectorAll("#galleryGrid .idea-card")
      .forEach(card => {
        const openButton =
          card.querySelector('button[onclick^="openPost("]');

        const match = openButton
          ?.getAttribute("onclick")
          ?.match(/openPost\('([^']+)'\)/);

        if (!match) return;

        const post = allPosts().find(
          item => item.id === match[1]
        );

        const img = sketchImage(
          post?.sketch,
          "card-sketch"
        );

        if (img) {
          card.insertBefore(img, card.querySelector("footer"));
        }
      });
  };

  // Show the sketch when opening an individual idea
  openPost = function (id) {
    originalOpenPost(id);

    const post = allPosts().find(item => item.id === id);

    const img = sketchImage(
      post?.sketch,
      "detail-sketch"
    );

    const content = document.getElementById("modalContent");

    if (img && content) {
      const heading = Array.from(
        content.querySelectorAll("h3")
      ).find(node => node.textContent.trim() === "The idea");

      if (heading) {
        heading.before(img);
      } else {
        content.prepend(img);
      }
    }
  };
})();
