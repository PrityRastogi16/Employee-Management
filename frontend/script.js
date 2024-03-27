const login = document.getElementById("login");
const register = document.getElementById("register");
const button = document.getElementById("btn");

function moveRegister() {
  login.style.left = "-400px";
  register.style.left = "50px";
  button.style.left = "110px";
}

function moveLogin() {
  login.style.left = "50px";
  register.style.left = "450px";
  button.style.left = "0";
}
const invalidspan = document.getElementById("invalidspan");
const invalidspan1 = document.getElementById("invalidspan1");

document.getElementById("login").addEventListener("submit",(e)=>{
    e.preventDefault();
})
document.getElementById("register").addEventListener("submit",(e)=>{
    e.preventDefault();
})

let url='https://employee-management-zojn.onrender.com'
document.getElementById('register_btn').addEventListener('click',()=>{
    const name=document.getElementById('sign-up-username').value
    const email=document.getElementById('sign-up-email').value
    const password=document.getElementById('sign-up-password').value
    const confirmPassword = document.getElementById('login-confirm-pass').value;
    fetch(`${url}/user/register`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            name, email,password,confirmPassword
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.msg==='User Registered Successful')
        {
            console.log("HEy")
            // localStorage.setItem('name',data.name)
            invalidspan.innerHTML=`${data.msg}`;
            invalidspan.style.color = "green"
        }
    })
    .catch(err=>console.log(err))
})

// Login
document.getElementById('login-button').addEventListener('click',()=>{
    const email=document.getElementById('login-email').value
    const password=document.getElementById('login-pass').value
    fetch(`${url}/user/login`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({email,
        password})
    })
    .then(res=>res.json())
    .then(data=>{
        console.log("HELLO")
        console.log(data)
        if(data.msg=='Login Successfull')
        {
            invalidspan1.innerHTML=`${data.msg}`;
            invalidspan1.style.color = "green"
            localStorage.setItem("email", data.email);
            localStorage.setItem('token',data.token);
            localStorage.setItem('name',data.name);
            
            location.href= './dashboard/dashboard.html';
           
            // frontend\public\landing.html
        }
    })
    .catch(err=>console.log(err))
})


