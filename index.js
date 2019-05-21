const ul = document.querySelector('#list');
const show = document.querySelector('#show-panel');
let element = null;

document.addEventListener("DOMContentLoaded", function() {
  loadBooks()
});

function loadBooks() {
  fetch("http://localhost:3000/books")
  .then(res => res.json())
  .then(books => {
    books.forEach(book => {
      const h2 = document.createElement("h2")
      h2.innerText = book.title
      ul.appendChild(h2)
      h2.addEventListener('click', () => {
        show.innerHTML = "";

        const showH2 = document.createElement("h2")
        showH2.innerText = book.title
        show.appendChild(showH2)

        const p = document.createElement("p")
        p.innerText = book.description
        show.appendChild(p)

        const img = document.createElement("img")
        img.src = book.img_url
        show.appendChild(img)

        const userUl = document.createElement("ul")
        userUl.innerText = "List of Users Who Like This Book:"
        book.users.forEach(user => {
          const li = document.createElement("li")
          li.innerText = user.username
          userUl.appendChild(li)
        })
        element = userUl
        show.appendChild(userUl)

        const button = document.createElement("button");
        button.innerText = "Like This Book"
        show.appendChild(button)
        const userArray = book.users
        const yaBoi = {"id": 1, "username": "ya boi"}
        userArray.push(yaBoi)
        button.addEventListener('click', () => {
          fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              users: userArray
            })
          })
          .then(res => res.json())
          .then(data => {
            let newInfo = data.users[(data.users.length - 1)]
            let li = document.createElement("li")
            li.innerText = newInfo.username
            element.appendChild(li)
          })
        });
      });
    })
  })
}
