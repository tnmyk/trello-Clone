window.addEventListener('load',()=>{
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // window.location.href= "/boards"
      } 
    });
  });

  const email = document.querySelector('#email')
  const password = document.querySelector('#password')
  const cpassword = document.querySelector('#cpassword')
  const iname = document.querySelector('#name')
  const signerror = document.querySelector('.signerror')

  document.querySelector('#signBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    auth.onAuthStateChanged(function (user) {
        if (user) {
          signerror.textContent = "You are already signed in."
        }
        else{
            if (password.value != cpassword.value) {
                signerror.textContent =  "Passwords do not match.";
              } else {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email.value, password.value)
                  .then((userCredential) => {
                    var userid = userCredential.user.uid;
                    const userCurrent = auth.currentUser;
                    userCurrent
                      .updateProfile({
                        displayName: iname.value,
                      })
                      .then(()=>{
                        signerror.style.color="green"
                      signerror.textContent= "Logging into Boards."
                          
                          db.collection("users").doc(userid).set({
                            name: iname.value,
                            email: email.value,
                            password: password.value,
                            contents:''
                          }).then(()=>{
                            setTimeout(()=>{
                              window.location.href="/boards"
                            },2000)
                          }).catch(err=>{
                              console.log(err)
                          });
                      })
                      .catch(function (error) {
                        console.log(error)
                      });
                  })
                  .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == "auth/email-already-in-use"){
                      signerror.textContent= errorMessage
                    }
                    else if (errCode == "auth/invalid-email"){
                        signerror.textContent = "Invalid email format.";
                      }
                    
                  });
              }
        }
    });
    
  })


