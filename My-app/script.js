document.getElementById('register-form').addEventListener('submit',async function(e)
{
e.preventDefault();
const name=document.getElementById('name').value;
const email=document.getElementById('email').value;
const password=document.getElementById('password').value;


const response=await fetch('/user/register',
    {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name,email,password})
    })

    const data= await response.json();
    alert(data.message);

});

document.getElementById('login-form').addEventListener('submit',async function(e){
    e.preventDefault();
    const email=document.getElementById('login-email').value;
    const password=document.getElementById('login-password').value;
    const response= await fetch('/user/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})

    });

    const data=await response.json();

if(data.success)
{
document.getElementById('profile-name').innerText="Name:${data.user.name}";
document.getElementById('profile-email').innerHtml="Email:${data.user.email}";
document.getElementById('profile').style.display="block";

document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';



}

else {
    alert(data.message);
  }



});


document.getElementById('logout').addEventListener("click",function(){

    document.getElementById('profile').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'block';

})