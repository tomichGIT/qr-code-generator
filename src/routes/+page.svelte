<script>
import { onMount } from "svelte/internal";
import { page } from "$app/stores";

let qr;

onMount ( () => {
  console.log("+page", $page.url);
  const form = document.getElementById('generate-form');
  qr = document.getElementById('qrcode');
  hideSpinner();
  form.addEventListener('submit', onGenerateSubmit);
});




// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  let url = document.getElementById('url').value;
  let size = document.getElementById('size').value;

  // Validate url
  if (url === '') {
    alert('Please enter a URL');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};
// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  });
};
// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }
};
// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};
// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};
// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};

//const basePath= $page.url.pathname; // /test/qr-code-svelte/build
let basePath= $page.url.origin+$page.url.pathname; // http://localhost/test/qr-code-svelte/build

// si no tiene barra se la agrego (varía dependiendo si estoy en dev, o en apache)
const last = basePath.charAt(basePath.length - 1);
if(last != '/') { basePath = basePath+'/'; } 

</script>


<header class="p-4 mb-10 bg-red-500">
  <div class="max-w-5xl m-auto">
    <div class="text-xl font-bold text-white">QR Code Generator</div>
  </div>
</header>
<img src="{basePath}img/spinner.svg" alt="" />

<main>

  <div
  class="flex flex-col-reverse align-center justify-center m-auto md:max-w-4xl p-10 md:flex-row"
>
  <div class="w-full md:w-2/3 mr-24">
    <h1 class="text-3xl font-bold mb-5 md:text-4xl">QR Code Generator</h1>
    <p class="mb-4">
      QR Codes allow smartphone users to access your website simply and
      quickly.
    </p>
    <p>
      Enter your URL below to generate a QR Code and download the image.
    </p>

    <form id="generate-form" class="mt-4">
      <input
        id="url"
        type="url"
        placeholder="Enter a URL"
        class="w-full border-2 border-gray-200 rounded p-3 text-grey-dark mr-2 focus:outline-none mb-5"
      />

      <select
        class="w-full border-2 border-gray-200 rounded p-3 text-grey-dark mr-2 focus:outline-none"
        name="size"
        id="size"
      >
        <option value="100">100x100</option>
        <option value="200">200x200</option>
        <option value="300" selected>300x300</option>
        <option value="400">400x400</option>
        <option value="500">500x500</option>
        <option value="600">600x600</option>
        <option value="700">700x700</option>
      </select>
      <button
        class="bg-gray-600 rounded w-full text-white py-3 px-4 mt-5 hover:bg-black"
        type="submit"
      >
        Generate QR Code
      </button>
    </form>
  </div>
  <div class="w-full md:w-1/3 self-center">
    <img  class="w-1/2 m-auto mb-10 md:w-full" src="{basePath}img/qr-code.svg" alt=""  />
  </div>
</div>

<div
  id="generated"
  class="max-w-5xl m-auto flex flex-col text-center align-center justify-center mt-20"
>
  <!-- Spinner -->
  <div id="spinner" role="status">
    <svg
      class="inline mr-2 w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>

  <div id="qrcode" class="m-auto"></div>
</div>


</main>

<style>

</style>
