
window.addEventListener('load',()=>{
  auth.onAuthStateChanged(function (user) {
    if (user) {
      window.location.href= "/boards"
    } 
  });
})



const email = document.querySelector('#email')
const password = document.querySelector('#password')
const signerror = document.querySelector('.signerror')




document.querySelector('#signBtn').addEventListener('click',(e)=>{
  e.preventDefault();
  auth.signInWithEmailAndPassword(email.value,password.value).then(()=>{
    window.location.href= "/boards";
  }).catch(err => {
    var errCode = err.code;
    if (errCode == "auth/user-not-found") {
      signerror.textContent = "User does not exist.";
    } 
    else if (errCode == "auth/wrong-password") {
      signerror.textContent = "Wrong password.";
    }
    else if (errCode == "auth/invalid-email"){
      signerror.textContent = "Invalid email format.";
    }
  });
})
