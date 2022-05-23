import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const formData = new FormData(form);

    const familyId = formData.get('family-id');
    const name = formData.get('bunny-name');
    // use createBunny to create a bunny with this name and family id
    await createBunny({
        name: name,
        family_id: familyId
    });
    form.reset();
    window.location.href = '/families';
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const select = document.querySelector('select');
    const families = await getFamilies();
    // go get the families from supabase
    // for each family
    for (let family of families){
    // create an option tag
        const familyOption = document.createElement('option');
    // set the option's value and text content
        familyOption.value = family.id;
        familyOption.textContent = family.name;
    // and append the option to the select
        select.append(familyOption);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
