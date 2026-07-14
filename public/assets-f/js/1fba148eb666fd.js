const regionLocation = document.getElementById('region-location');
const essentialsDownload = document.getElementById('essentials-download')

if(!!regionLocation) {
  let regionValue = window.location.pathname.split('/');
  regionLocation.value = regionValue[regionValue.length - 2];
}

/*
TODO: CHANGE QUERY SELECTOR TO ADD SECTION ID
*/
if (document.querySelector('.wpcf7-radio')) {
  document.addEventListener('wpcf7mailsent', (e) => {
    e.preventDefault();
    document.querySelector('.form-block__form').innerHTML = `
      <p>Thank you! You can download the file <a href="${essentialsDownload.value}" target="_blank">here</a>.
    `;
    /* 
    TODO: UPDATE UPLOAD HREF TO MATCH PROPER LOCATION
    */
  });
}