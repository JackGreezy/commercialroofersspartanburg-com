#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || process.cwd());
const publicDir = path.join(root, "public");
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["assets-f", "ours", "images"].includes(entry.name)) continue;
    const item = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(item);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(item);
  }
}

walk(publicDir);

const stylesheet = '<link href="/spartanburg-funnel.css" id="spartanburg-funnel-css" rel="stylesheet"/>';
const mobileCta = '<a class="sp-mobile-roof-help" href="/contact?request=roof-help">Roof Help</a>';

const paths = `<!-- SP_PATHS_START --><section class="sp-paths"><div class="sp-paths__inner"><p class="sp-kicker">Start with the problem in front of you</p><h2>Get the roof under control. Then make the right capital call.</h2><div class="sp-paths__grid"><article class="sp-path"><strong>Water is getting into the building</strong><p>Protect people, inventory, equipment, and occupied space. We will start with leak tracing, stabilization, and a documented repair path.</p><a href="/contact?request=emergency-roof-repair">Request Emergency Roof Help</a></article><article class="sp-path"><strong>You need the truth before replacement</strong><p>A flat roof replacement inspection should define wet insulation, deck concerns, drainage, recover feasibility, and the limits of repair.</p><a href="/contact?request=flat-roof-replacement-inspection">Request a Flat Roof Inspection</a></article><article class="sp-path"><strong>You want fewer surprise calls</strong><p>A commercial roof service agreement keeps inspections, drainage checks, small repairs, photos, and budget priorities in one running roof record.</p><a href="/services/preventive-maintenance-programs">See Service Agreement Support</a></article></div></div></section><!-- SP_PATHS_END -->`;

const decision = `<!-- SP_DECISION_START --><section class="sp-decision"><div class="sp-decision__inner"><figure><img src="/ours/services/commercial-roof-tear-off-replacement-commercial-roofers-spartanburg-sc.webp" alt="Flat commercial roof replacement inspection in Spartanburg South Carolina" loading="lazy" decoding="async"></figure><div class="sp-decision__copy"><p class="sp-kicker">Repair, coat, recover, or replace</p><h2>Do not buy more roof than the building needs.</h2><p>A leak does not automatically mean replacement. A coating does not rescue wet insulation. A recover is not right for every deck or assembly. The inspection has to settle those questions first.</p><ul class="sp-decision__list"><li><strong>Repair</strong> when failure is isolated and the surrounding roof remains serviceable.</li><li><strong>Coat</strong> when the existing system is dry, compatible, and worth extending.</li><li><strong>Recover</strong> when code, moisture, attachment, and deck conditions support another assembly.</li><li><strong>Replace</strong> when moisture, recurring failure, or capital timing makes continued patching the expensive choice.</li></ul><a href="/contact?request=repair-coating-replacement-review">Compare My Roof Options</a></div></div></section><!-- SP_DECISION_END -->`;

const close = `<!-- SP_CLOSE_START --><section class="sp-close"><div class="sp-close__inner"><div><p class="sp-kicker">One roof problem. One clear next move.</p><h2>Leak today, replacement next year, or a portfolio that needs a plan?</h2><p>Tell us what is happening at the building. We will help route the request toward emergency repair, a flat roof inspection and report, a service agreement, coating review, recover, or full reroofing.</p></div><div class="sp-close__actions"><a href="/contact?request=roof-review">Request a Roof Review</a><a href="/contact?request=emergency-roof-repair">Emergency Roof Help</a></div></div></section><!-- SP_CLOSE_END -->`;

function stripPlaceholderPhone(html) {
  return html
    .replace(/<li[^>]*>\s*<a[^>]+href=["']tel:5555556136["'][^>]*>\s*555-555-6136\s*<\/a>\s*<\/li>/gi, "")
    .replace(/<a[^>]+href=["']tel:5555556136["'][^>]*>\s*555-555-6136\s*<\/a>/gi, "")
    .replace(/555-555-6136/g, "")
    .replace(/5555556136/g, "");
}

function transformHome(html) {
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, "<title>Commercial Roofers Spartanburg, SC | Emergency Repair &amp; Flat Roof Inspections</title>")
    .replace(/<meta[^>]+name=["']description["'][^>]*>/i, '<meta name="description" content="Commercial roofers in Spartanburg for emergency roof repair, flat roof replacement inspections and reports, service agreements, coatings, recover systems, and reroofing.">')
    .replace(/<meta[^>]+property=["']og:title["'][^>]*>/i, '<meta property="og:title" content="Commercial Roofers Spartanburg, SC | Emergency Repair &amp; Flat Roof Inspections">')
    .replace(/<meta[^>]+property=["']og:description["'][^>]*>/i, '<meta property="og:description" content="Emergency roof help, flat roof inspections, service agreements, coatings, recover systems, and commercial roof replacement across Spartanburg.">')
    .replace(/<meta[^>]+name=["']twitter:title["'][^>]*>/i, '<meta name="twitter:title" content="Commercial Roofers Spartanburg, SC | Emergency Repair &amp; Flat Roof Inspections">')
    .replace(/<meta[^>]+name=["']twitter:description["'][^>]*>/i, '<meta name="twitter:description" content="Emergency roof help, flat roof inspections, service agreements, coatings, recover systems, and commercial roof replacement across Spartanburg.">')
    .replace(/<h1>COMMERCIAL ROOFING IN SPARTANBURG<\/h1>/i, "<h1>COMMERCIAL ROOF HELP IN SPARTANBURG</h1>")
    .replace(/<div class="large-hero-random-video__copy">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i, `<div class="large-hero-random-video__copy"><div class="sp-hero-actions"><a class="btn btn-primary" href="/contact?request=emergency-roof-repair">Emergency Roof Help</a><a class="btn btn-primary-green" href="/contact?request=flat-roof-replacement-inspection">Request a Flat Roof Inspection</a></div><p class="sp-hero-note">Repair the active problem. Get a clear report. Make the coating, recover, or replacement decision with evidence.</p></div></div></div></div></section>`)
    .replace(/<p class="h6">Commercial Roofers of Spartanburg reviews the roof as a working building system\.[\s\S]*?<\/p>\s*<p>The result is a scope[\s\S]*?<\/p>/i, '<p class="h6">A roof issue can stop production, damage inventory, disrupt tenants, and turn a planned expense into an emergency. Start with what is happening at the building right now.</p><p>We help Spartanburg owners and facility teams move from leak control to a documented roof plan, including repair, flat roof replacement inspections, coatings, recover systems, service agreements, and complete reroofing.</p>')
    .replace(/<h2>Our commercial roofing scopes<\/h2>/i, "<h2>Start with what the roof needs now</h2>")
    .replace(/<h3 class="h6">Commercial roofing services<\/h3>[\s\S]*?<a class="btn btn-outline-primary-green" href="\/services" target="">Explore services<\/a>/i, '<h3 class="h6">Emergency commercial roof repair</h3><p>Trace active leaks, stabilize vulnerable areas, protect the building below, and document what must happen next.</p></div><div class="content-cta"><a class="btn btn-outline-primary-green" href="/contact?request=emergency-roof-repair" target="">Request roof help</a>')
    .replace(/<h3 class="h6">Roof systems<\/h3>[\s\S]*?<a class="btn btn-outline-primary-green" href="\/roof-systems" target="">Compare systems<\/a>/i, '<h3 class="h6">Flat roof inspection and report</h3><p>See membrane, seams, drainage, penetrations, wet insulation indicators, deck concerns, photos, and practical next steps.</p></div><div class="content-cta"><a class="btn btn-outline-primary-green" href="/services/commercial-roof-inspection" target="">See inspection support</a>')
    .replace(/<h3 class="h6">Industries we serve<\/h3>[\s\S]*?<a class="btn btn-outline-primary-green" href="\/industries" target="">View industries<\/a>/i, '<h3 class="h6">Commercial roof replacement</h3><p>Plan tear-off, recover, insulation, drainage, phasing, occupied-space protection, system selection, and closeout.</p></div><div class="content-cta"><a class="btn btn-outline-primary-green" href="/services/commercial-roof-tear-off-replacement" target="">Plan a replacement</a>')
    .replace(/<h2 class="h3">Roof decisions that protect the building below<\/h2>\s*<p>[\s\S]*?<\/p>/i, '<h2 class="h3">Keep small roof problems from becoming capital emergencies</h2><p>A commercial roof service agreement creates a schedule for inspections, drains, minor repairs, storm reviews, photo reporting, and replacement forecasting.</p>')
    .replace(/<a class="btn btn-primary" href="\/manufacturers" role="link" target="">Compare manufacturers<\/a>/i, '<a class="btn btn-primary" href="/services/preventive-maintenance-programs" role="link" target="">Explore service agreements</a>');

  const introEnd = /(<section class="wysiwyg white-bg" id="wysiwyg-block_3626eaef21b9d12769ace3b2430128c9"[\s\S]*?<\/section>)/i;
  html = html.replace(introEnd, `$1${paths}`);

  const largeCtaEnd = /(<section class="large-full-width-cta[\s\S]*?<\/section>)/i;
  html = html.replace(largeCtaEnd, `$1${decision}`);

  html = html.replace(/<\/main>/i, `${close}</main>`);
  return html;
}

let changed = 0;
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = html
    .replace(/<!-- SP_PATHS_START -->[\s\S]*?<!-- SP_PATHS_END -->/g, "")
    .replace(/<!-- SP_DECISION_START -->[\s\S]*?<!-- SP_DECISION_END -->/g, "")
    .replace(/<!-- SP_CLOSE_START -->[\s\S]*?<!-- SP_CLOSE_END -->/g, "")
    .replace(/<a class="sp-mobile-roof-help"[\s\S]*?<\/a>/g, "");
  html = stripPlaceholderPhone(html);
  html = html.replace(/(<img\b[^>]*class="rr-footer-brand-logo"[^>]*src=")\/images\/brand\/logo-on-light\.png("[^>]*>)/gi, '$1/images/brand/logo-on-dark.png$2');
  if (!html.includes('id="spartanburg-funnel-css"')) html = html.replace(/<\/head>/i, `${stylesheet}</head>`);
  if (/public\/(?:home|index)\.html$/.test(file.replace(/\\/g, "/"))) html = transformHome(html);
  if (!html.includes('class="sp-mobile-roof-help"')) html = html.replace(/<\/body>/i, `${mobileCta}</body>`);
  html = html.replace(/(?:\s*—\s*|&mdash;|&#8212;|&#x2014;)/gi, ", ");
  if (html !== before) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

const dataPath = path.join(root, "data", "content.normalized.json");
if (fs.existsSync(dataPath)) {
  const source = fs.readFileSync(dataPath, "utf8");
  const clean = source.replace(/555-555-6136/g, "").replace(/5555556136/g, "").replace(/(?:\s*—\s*|&mdash;|&#8212;|&#x2014;)/gi, ", ");
  if (clean !== source) fs.writeFileSync(dataPath, clean);
}

console.log(`Spartanburg conversion pass updated ${changed} HTML pages.`);
