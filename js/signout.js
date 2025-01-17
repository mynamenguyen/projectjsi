let auth = JSON.parse(localStorage.getItem('currentuser'))
console.log(auth);

let signOut = document.getElementById('signOut')
let signIn = document.getElementById('signin')
let welcome = document.getElementById('welcome')
let avatar = document.getElementById('avatar')

console.log(signOut);
signOut.style.display = 'none'

if (auth) {
    signOut.style.display = 'block'
    signIn.style.display = 'none'
    welcome.innerText = "Hello, " + auth.fullName
    avatar.src = auth.avatar      
}

function handleSignOut (){
    localStorage.removeItem("currentuser")
    window.location.href = '/signin.html'
}

signOut.addEventListener('click', handleSignOut)