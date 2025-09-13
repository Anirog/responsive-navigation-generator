// generator.js for Responsive Navigation Generator
// Handles live preview, code generation, and export

// Utility: fetch base nav HTML/CSS from component folder
async function fetchBaseComponent() {
  const htmlResp = await fetch('component/index.html');
  const html = await htmlResp.text();
  const cssResp = await fetch('component/css/styles.css');
  const css = await cssResp.text();
  return { html, css };
}

// State
const config = {
  profileImgUrl: '',
  profileImgAlt: '',
  profileImgSize: 'medium',
  links: [
    { text: 'Home', url: '#' },
    { text: 'About', url: '#' }
  ],
  navAlign: 'left',
  hamburger: true,
  sticky: false,
  breakpoint: 768,
  headerBg: '#22223b',
  linkColor: '#4a4e69',
  linkHover: '#9a8c98',
  fontFamily: 'system-ui',
  fontSize: 16
};

// DOM refs
const form = document.getElementById('nav-config-form');
const previewFrame = document.getElementById('nav-preview');
const outputHtml = document.getElementById('output-html');
const outputCss = document.getElementById('output-css');
const copyHtmlBtn = document.getElementById('copy-html-btn');
const copyCssBtn = document.getElementById('copy-css-btn');
const downloadBtn = document.getElementById('download-btn');
const navLinksList = document.getElementById('nav-links-list');
const addLinkBtn = document.getElementById('add-link-btn');

// Render link inputs
function renderLinks() {
  navLinksList.innerHTML = '';
  config.links.forEach((link, i) => {
    const div = document.createElement('div');
    div.className = 'nav-link-item';
    div.innerHTML = `
      <input type="text" value="${link.text}" aria-label="Link text" data-idx="${i}" class="link-text">
      <input type="url" value="${link.url}" aria-label="Link URL" data-idx="${i}" class="link-url">
      <button type="button" class="remove-link" data-idx="${i}" aria-label="Remove link">Remove</button>
    `;
    navLinksList.appendChild(div);
  });
}

// Add/remove/edit links
addLinkBtn.addEventListener('click', () => {
  config.links.push({ text: 'New Link', url: '#' });
  renderLinks();
  updatePreview();
});
navLinksList.addEventListener('click', e => {
  if (e.target.classList.contains('remove-link')) {
    const idx = +e.target.dataset.idx;
    config.links.splice(idx, 1);
    renderLinks();
    updatePreview();
  }
});
navLinksList.addEventListener('input', e => {
  if (e.target.classList.contains('link-text')) {
    const idx = +e.target.dataset.idx;
    config.links[idx].text = e.target.value;
    updatePreview();
  }
  if (e.target.classList.contains('link-url')) {
    const idx = +e.target.dataset.idx;
    config.links[idx].url = e.target.value;
    updatePreview();
  }
});

// Form change handler
form.addEventListener('input', e => {
  switch (e.target.id) {
    case 'profile-img-url':
      config.profileImgUrl = e.target.value;
      break;
    case 'profile-img-alt':
      config.profileImgAlt = e.target.value;
      break;
    case 'profile-img-size':
      config.profileImgSize = e.target.value;
      break;
    case 'nav-align':
      config.navAlign = e.target.value;
      break;
    case 'hamburger-toggle':
      config.hamburger = e.target.checked;
      break;
    case 'sticky-toggle':
      config.sticky = e.target.checked;
      break;
    case 'breakpoint':
      config.breakpoint = +e.target.value;
      break;
    case 'header-bg':
      config.headerBg = e.target.value;
      break;
    case 'link-color':
      config.linkColor = e.target.value;
      break;
    case 'link-hover-color':
      config.linkHover = e.target.value;
      break;
    case 'font-family':
      config.fontFamily = e.target.value;
      break;
    case 'font-size':
      config.fontSize = +e.target.value;
      break;
  }
  updatePreview();
});

// Profile image upload
form.profileImgUpload = document.getElementById('profile-img-upload');
form.profileImgUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      config.profileImgUrl = evt.target.result;
      updatePreview();
    };
    reader.readAsDataURL(file);
  }
});

// Generate nav HTML/CSS from base + config
async function generateNavCode() {
  const { html: baseHtml, css: baseCss } = await fetchBaseComponent();
  // Apply config: replace profile image, links, alignment, colours, etc.
  let navHtml = baseHtml;
  let navCss = baseCss;
  // Profile image (match base component's class name)
    const imgSize = config.profileImgSize === 'small' ? 32 : config.profileImgSize === 'large' ? 64 : 48;
    navHtml = navHtml.replace(/<img[^>]*class="profile-image"[^>]*>/,
      `<img class="profile-image" src="${config.profileImgUrl}" alt="${config.profileImgAlt}" style="width:${imgSize}px;height:${imgSize}px;border-radius:50%;object-fit:cover;">`
    );
    // Remove base CSS .profile-image size
    navCss = navCss.replace(/\.profile-image\s*\{[^}]*\}/, '');
  // Links (replace <nav class="nav-links">...</nav> with custom links)
  navHtml = navHtml.replace(
    /<nav[^>]*class="nav-links"[^>]*>[\s\S]*?<\/nav>/,
    `<nav class="nav-links">${config.links.map(l => `<a href="${l.url}">${l.text}</a>`).join('')}</nav>`
  );
  // Alignment
  navCss += `\n.nav-header { justify-content: ${config.navAlign === 'center' ? 'center' : config.navAlign === 'right' ? 'flex-end' : 'flex-start'}; }`;
  // Hamburger
  if (!config.hamburger) navCss += `\n.hamburger { display: none !important; }`;
  // Sticky
  if (config.sticky) navCss += `\n.nav-header { position: sticky; top: 0; }`;
  // Breakpoint (use user value for both mobile and desktop, no overlap)
  const bp = config.breakpoint;
  navCss += `\n@media (max-width: ${bp - 1}px) { .nav-links { display: none; } .hamburger { display: block; } }`;
  navCss += `\n@media (min-width: ${bp}px) { .nav-links { display: flex; } .hamburger { display: none; } }`;
  // Colours
  navCss += `\n.nav-header { background: ${config.headerBg}; }`;
  navCss += `\n.nav-links a { color: ${config.linkColor}; }`;
  navCss += `\n.nav-links a:hover, .nav-links a:focus { color: ${config.linkHover}; }`;
  // Typography
  navCss += `\n.nav-header, .nav-links a { font-family: ${config.fontFamily}; font-size: ${config.fontSize}px; }`;
  return { navHtml, navCss };
}

// Update live preview and output
async function updatePreview() {
  const { navHtml, navCss } = await generateNavCode();
  // Live preview in iframe
  const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
  doc.open();
  doc.write(`<style>${navCss}</style>${navHtml}`);
  doc.close();
  // Output code
  outputHtml.textContent = navHtml;
  outputCss.textContent = navCss;
}

// Copy/export buttons
copyHtmlBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputHtml.textContent);
});
copyCssBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputCss.textContent);
});
downloadBtn.addEventListener('click', () => {
  const htmlBlob = new Blob([outputHtml.textContent], { type: 'text/html' });
  const cssBlob = new Blob([outputCss.textContent], { type: 'text/css' });
  const htmlUrl = URL.createObjectURL(htmlBlob);
  const cssUrl = URL.createObjectURL(cssBlob);
  const aHtml = document.createElement('a');
  aHtml.href = htmlUrl;
  aHtml.download = 'nav.html';
  aHtml.click();
  const aCss = document.createElement('a');
  aCss.href = cssUrl;
  aCss.download = 'nav.css';
  aCss.click();
  setTimeout(() => {
    URL.revokeObjectURL(htmlUrl);
    URL.revokeObjectURL(cssUrl);
  }, 1000);
});


// --- Resizable Preview Logic ---
const previewResizeContainer = document.querySelector('.preview-resize-container');
const navPreview = document.getElementById('nav-preview');
const resizeHandle = document.querySelector('.resize-handle');
const previewWidthLabel = document.getElementById('preview-width');
let isResizing = false;
let startX = 0;
let startWidth = 0;

function setPreviewWidth(px) {
  const min = 240;
  const max = previewResizeContainer.parentElement.offsetWidth;
  const width = Math.max(min, Math.min(px, max));
  previewResizeContainer.style.width = width + 'px';
  navPreview.style.width = '100%';
  previewWidthLabel.textContent = width + 'px';
}

resizeHandle.addEventListener('mousedown', e => {
  isResizing = true;
  startX = e.clientX;
  startWidth = previewResizeContainer.offsetWidth;
  document.body.style.userSelect = 'none';
});
window.addEventListener('mousemove', e => {
  if (!isResizing) return;
  const dx = e.clientX - startX;
  setPreviewWidth(startWidth + dx);
});
window.addEventListener('mouseup', () => {
  isResizing = false;
  document.body.style.userSelect = '';
});

// Keyboard accessibility for handle
resizeHandle.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const delta = e.key === 'ArrowLeft' ? -20 : 20;
    setPreviewWidth(previewResizeContainer.offsetWidth + delta);
    e.preventDefault();
  }
});

// Set initial preview width
window.addEventListener('DOMContentLoaded', () => {
  setPreviewWidth(previewResizeContainer.offsetWidth);
});

// Initial render
renderLinks();
updatePreview();