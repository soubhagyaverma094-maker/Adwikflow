/* ═══════════════════════════════════════════════════════════════
   ADWIKFLOW LEAD WIDGET  —  widget.js

   Client apni website mein bas ye do lines lagata hai:

     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"><\/script>
     <script src="https://YOUR-DOMAIN/widget.js" data-company="THEIR-COMPANY-ID"><\/script>

   Ek hi file — har client apna data-company deta hai.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const SUPABASE_URL = 'https://jytgogooniceczmukjyy.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_sYReBaX4jW9Vgzfut0ZVxw_TYmMif41';

  // script tag se company id nikalo
  const thisScript = document.currentScript;
  const COMPANY_ID = thisScript && thisScript.getAttribute('data-company');

  if (!COMPANY_ID) {
    console.error('[AdwikFlow] Missing data-company attribute on widget script tag.');
    return;
  }
  if (typeof supabase === 'undefined') {
    console.error('[AdwikFlow] Supabase library not loaded. Add the supabase-js script before widget.js');
    return;
  }

  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // optional customisation via data attributes
  const BTN_TEXT = thisScript.getAttribute('data-button') || '💬 Enquire Now';
  const TITLE    = thisScript.getAttribute('data-title')  || 'Get in Touch';
  const SUBTITLE = thisScript.getAttribute('data-subtitle') || "We'll call you back within 10 minutes.";

  // ── STYLES ──
  const css = `
  #afw-btn{position:fixed;bottom:22px;right:22px;z-index:2147483000;background:linear-gradient(135deg,#5B5FFF,#A259FF);color:#fff;padding:.85rem 1.4rem;border-radius:100px;font-family:'Inter',system-ui,-apple-system,sans-serif;font-weight:600;font-size:.9rem;cursor:pointer;box-shadow:0 8px 28px rgba(91,95,255,.42);transition:transform .2s;user-select:none;line-height:1}
  #afw-btn:hover{transform:translateY(-2px)}
  #afw-overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(6px);z-index:2147483001;display:none;align-items:center;justify-content:center;padding:1rem;font-family:'Inter',system-ui,-apple-system,sans-serif}
  #afw-overlay.afw-on{display:flex}
  #afw-box{background:#0E1020;border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:2rem;max-width:400px;width:100%;position:relative;max-height:90vh;overflow-y:auto;box-shadow:0 24px 70px rgba(0,0,0,.55);animation:afwPop .28s ease;box-sizing:border-box}
  @keyframes afwPop{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
  #afw-close{position:absolute;top:.9rem;right:.9rem;background:#131629;border:1px solid rgba(255,255,255,.1);color:#7B80A8;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:.9rem;line-height:1;padding:0}
  #afw-close:hover{color:#fff}
  .afw-title{font-size:1.3rem;font-weight:800;color:#fff;margin:0 0 .3rem;text-align:center}
  .afw-sub{color:#7B80A8;font-size:.84rem;text-align:center;margin:0 0 1.5rem;line-height:1.6}
  .afw-lbl{display:block;font-size:.68rem;font-weight:700;text-transform:uppercase;color:#7B80A8;margin-bottom:.32rem;letter-spacing:.05em}
  .afw-in{width:100%;background:#131629;border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:.68rem .95rem;color:#E8EAF6;font-size:.86rem;outline:none;margin-bottom:.9rem;font-family:inherit;box-sizing:border-box}
  .afw-in:focus{border-color:#5B5FFF}
  .afw-in::placeholder{color:#7B80A8}
  .afw-ta{resize:vertical;min-height:78px}
  .afw-btn{width:100%;background:linear-gradient(135deg,#5B5FFF,#A259FF);color:#fff;border:none;padding:.82rem;border-radius:10px;font-weight:700;font-size:.9rem;cursor:pointer;box-shadow:0 6px 22px rgba(91,95,255,.35);font-family:inherit}
  .afw-btn:disabled{opacity:.55;cursor:not-allowed}
  .afw-msg{margin-top:.85rem;padding:.65rem .9rem;border-radius:8px;font-size:.8rem;display:none;background:rgba(255,92,122,.1);border:1px solid rgba(255,92,122,.3);color:#FF5C7A}
  .afw-msg.afw-show{display:block}
  .afw-priv{text-align:center;font-size:.7rem;color:#7B80A8;margin-top:1rem}
  #afw-done{display:none;text-align:center;padding:1rem 0}
  .afw-ic{width:64px;height:64px;background:rgba(0,229,160,.12);border:2px solid #00E5A0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.7rem;color:#00E5A0;margin:0 auto 1.1rem}
  .afw-out{background:#131629;color:#7B80A8;border:1px solid rgba(255,255,255,.1);padding:.65rem 1.3rem;border-radius:9px;font-weight:600;font-size:.83rem;cursor:pointer;margin-top:.6rem;font-family:inherit}
  .afw-out:hover{color:#fff}`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── HTML ──
  const html = `
  <div id="afw-btn">${BTN_TEXT}</div>
  <div id="afw-overlay">
    <div id="afw-box">
      <button id="afw-close" type="button">✕</button>
      <div id="afw-form">
        <div class="afw-title">${TITLE}</div>
        <div class="afw-sub">${SUBTITLE}</div>
        <label class="afw-lbl">Full Name *</label>
        <input class="afw-in" id="afw-name" placeholder="Your name">
        <label class="afw-lbl">Phone / WhatsApp *</label>
        <input class="afw-in" id="afw-phone" type="tel" placeholder="+91 98765 43210">
        <label class="afw-lbl">Email</label>
        <input class="afw-in" id="afw-email" type="email" placeholder="you@email.com">
        <label class="afw-lbl">Message</label>
        <textarea class="afw-in afw-ta" id="afw-msg" placeholder="Tell us what you need…"></textarea>
        <button class="afw-btn" id="afw-submit" type="button">Send Enquiry →</button>
        <div class="afw-msg" id="afw-err"></div>
        <div class="afw-priv">🔒 Your details are safe with us.</div>
      </div>
      <div id="afw-done">
        <div class="afw-ic">✓</div>
        <div class="afw-title">Thank you, <span id="afw-dname">friend</span>!</div>
        <div class="afw-sub">We've received your enquiry.<br>Our team will call you shortly.</div>
        <button class="afw-out" id="afw-again" type="button">Send another</button>
      </div>
    </div>
  </div>`;

  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  document.body.appendChild(wrap);

  // ── ELEMENTS ──
  const $ = id => document.getElementById(id);
  const overlay = $('afw-overlay');

  const open  = () => overlay.classList.add('afw-on');
  const close = () => overlay.classList.remove('afw-on');

  $('afw-btn').addEventListener('click', open);
  $('afw-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  function fail(t){
    const err = $('afw-err');
    err.textContent = t;
    err.classList.add('afw-show');
  }

  // ── SUBMIT ──
  $('afw-submit').addEventListener('click', async () => {
    const name  = $('afw-name').value.trim();
    const phone = $('afw-phone').value.trim();
    const email = $('afw-email').value.trim();
    const note  = $('afw-msg').value.trim();

    $('afw-err').classList.remove('afw-show');

    if (!name)  return fail('Please enter your name.');
    if (!phone) return fail('Please enter your phone number.');
    if (phone.replace(/\D/g, '').length < 10) return fail('Please enter a valid phone number.');

    const btn = $('afw-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    const { error } = await sb.from('leads').insert({
      company_id: COMPANY_ID,
      name, phone,
      email: email || null,
      source: 'Website',
      status: 'notpicked',
      note: note || 'Website widget enquiry',
    });

    // Duplicate phone → trigger row block karta hai. Ye error nahi hai.
    const isRealError = error && !/no rows|0 rows|returned no/i.test(error.message || '');

    if (isRealError) {
      btn.disabled = false;
      btn.textContent = 'Send Enquiry →';
      fail('Something went wrong. Please try again.');
      console.error('[AdwikFlow]', error);
      return;
    }

    $('afw-dname').textContent = name.split(' ')[0];
    $('afw-form').style.display = 'none';
    $('afw-done').style.display = 'block';
  });

  // ── RESET ──
  $('afw-again').addEventListener('click', () => {
    ['afw-name', 'afw-phone', 'afw-email', 'afw-msg'].forEach(id => $(id).value = '');
    const btn = $('afw-submit');
    btn.disabled = false;
    btn.textContent = 'Send Enquiry →';
    $('afw-err').classList.remove('afw-show');
    $('afw-form').style.display = 'block';
    $('afw-done').style.display = 'none';
  });

})();
