const fs = require('fs');
const path = require('path');

console.log("==================================================");
console.log("   FRONTEND DOM INTEGRITY AUDIT                   ");
console.log("==================================================\n");

const htmlPath = path.join(__dirname, '..', 'index.html');
const jsPath = path.join(__dirname, '..', 'date-invitation.js');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

const requiredIds = [
    'passcodeInput',
    'passcodeBtn',
    'passcodeError',
    'passcodeGate',
    'invitationContent',
    'invitationForm',
    'successState',
    'sushiSubList',
    'khacSubList',
    'rooftopSubList',
    'cocktailSubList',
    'khacActivitySubList',
    'otherDinnerInput',
    'otherActivityInput',
    'datePicker',
    'timePicker',
    'noteInput',
    'activeMovieIframe',
    'activeMovieTitle',
    'venueModal',
    'modalVenueTitle',
    'modalVenueDesc',
    'modalGalleryContainer',
    'closeModalBtn'
];

let missing = 0;
requiredIds.forEach(id => {
    const exists = htmlContent.includes(`id="${id}"`) || htmlContent.includes(`id='${id}'`);
    if (exists) {
        console.log(`  [OK] id="${id}" exists in index.html`);
    } else {
        console.log(`❌ [MISSING] id="${id}" NOT found in index.html`);
        missing++;
    }
});

console.log(`\nDOM AUDIT RESULT: ${requiredIds.length - missing}/${requiredIds.length} IDs present.`);
