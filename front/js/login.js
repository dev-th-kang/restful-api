const loginBtn = document.querySelector(".loginBtn")
const logoutBtn = document.querySelector(".logoutBtn")
loginBtn.addEventListener("click",()=>{
    const ID = document.querySelector(".id").value;
    const PW = document.querySelector(".pw").value;

    fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify({
            userid: ID,
            userpw: PW,
        }),
        })
        .then((response) => response.json())
        .then((data) =>{
            document.querySelector('.result').innerHTML = `
            <h3>${data.msg}</h3>
            <h7>${data.token}</h7>`
            sessionStorage.setItem("token", data.token);
        });

})
logoutBtn.addEventListener("click",()=>{
    const token = sessionStorage.getItem("token")
    console.log(token);
    if(token!=null){
    sessionStorage.removeItem("token");
    fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }, 
        })
        .then((response) => {
            response.json()
        }
            )
        .then((data) =>{
            console.log("로그아웃 완료");
            document.querySelector('.result').innerHTML = `
            <h3>로그아웃 완료</h3>`
        });
    }
})