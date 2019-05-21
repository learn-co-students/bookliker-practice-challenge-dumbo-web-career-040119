const list = document.querySelector('#list');
const show = document.querySelector('#show-panel');
let element = null;
document.addEventListener("DOMContentLoaded", function() {
    console.log('loaded');
    loadBooks();
});

function like(){
    fetch(`http://localhost:3000/books/`)
}

function loadBooks(){
    fetch(`http://localhost:3000/books`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        data.forEach(book => {
            let h2 = document.createElement('h2');
            h2.innerText = book.title;
            list.appendChild(h2);
            
            h2.addEventListener('click',function(){
                show.innerHTML = "";
                let h1 = document.createElement('h1');
                h1.innerText = book.title
                let p = document.createElement('p');
                p.innerText = book.description;
                let img = document.createElement('img');
                img.src = book.img_url
                let ul = document.createElement('ul');
                book.users.forEach(user => {
                    let li = document.createElement('li');
                    li.innerText = user.username
                    ul.appendChild(li);
                })
                element = ul;
                let button = document.createElement('button');
                button.innerText = "Like";
                button.addEventListener('click', function(){
                    let booksUsers = book.users
                    booksUsers.push({"id": 1, "username": "ya boi"})
                    fetch(`http://localhost:3000/books/${book.id}/`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            users: booksUsers
                        })
                    })
                    .then(resp => resp.json())
                    .then(data => {
                    //console.log(data.users.length);
                    let newInfo = data.users[(data.users.length - 1)];
                    let li = document.createElement('li');
                    li.innerText = newInfo.username
                    element.appendChild(li);
                })
            })
                show.appendChild(h1);
                show.appendChild(p);
                show.appendChild(img);
                show.appendChild(ul);
                show.appendChild(button);
            })
        })
    })
}


// let p = document.createElement('p');
//             p.innerText = book.description;
//             let img = document.createElement('img');
//             img.src = book.img_url
//             let ul = document.createElement('ul');
//             list.appendChild(h2);
//             list.appendChild(p);
//             list.appendChild(img);
//             list.appendChild(ul);