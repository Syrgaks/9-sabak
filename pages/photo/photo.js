const photoList = document.querySelector("#photoList");

async function fetchPhotos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await res.json();

    data.slice(0, 21).forEach((photo) => {
      const photoElement = document.createElement("div");
      photoElement.innerHTML = `
            <div class='w-[300px] shadow-2xl'>
                <img class='w-[300px]' src=${photo.url}>
                <p class='text-xl font-bold'>${photo.title}</p>
                <button id='add-to-cart' class='border py-[7px] w-full font-semibold hover:bg-[red] hover:text-white'>Добавить в корзину</button>
                
            </div>
        `;
      const btn = photoElement.querySelector("#add-to-cart");
      btn.addEventListener("click", () => addToCart(photo));

      photoList.appendChild(photoElement);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  setTimeout(() => {
    alert("Товар успешно добавлен в корзину");
  }, 1000);
}

fetchPhotos();