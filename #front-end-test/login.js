

document.querySelector(".btn1").addEventListener("click",()=>{
    

    const userID = document.querySelector('.id').value
    const userPW = document.querySelector('.pw').value
    fetch("127.0.0.1:3000/api/login", {
        method: "POST",
        body: JSON.stringify({
            userid: userID,
            userpw: userPW,
        }),
    })
    .then((response) => response.json())
    .then((result) => console.log(result));
})