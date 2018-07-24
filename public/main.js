let submit = document.getElementById('submit')
let form = document.getElementById('form')
let guest = document.getElementById('guestList')

submit.addEventListener('click', registerUser)
guest.addEventListener('click', () => {

    window.location = '/guests';

})

console.log("hey")
function registerUser() {
    event.preventDefault()
    const userObj = {
        name: document.getElementById('contactname').value,
        email: document.getElementById('useremail').value,
        rsvp: form.rsvp.value,
        guests: form.guestCount.value
    }
    console.log(userObj)
    postData(userObj)
}

function postData(info) {

    postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    }

    fetch('./reply', postOptions)

    window.location = '/submission'

}


