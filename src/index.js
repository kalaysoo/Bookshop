let itemsPerPage = 6;
let category = 'Architecture'


function showBooks(data) {
  const booksEl = document.querySelector(".books");
  booksEl.innerHTML = ''

  data.items.forEach((book) => {
   const bookList = document.createElement("div");
   bookList.className = "bookList";
   const bookImage = document.createElement("img");
          if (
            book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.thumbnail
          ) {
            bookImage.src = book.volumeInfo.imageLinks.thumbnail;
          } else {
            bookImage.src = "placeholder.jpg";
          }
          bookList.appendChild(bookImage);

          const bookInfo = document.createElement("div");
          bookInfo.className = "book-info"
         if (book.volumeInfo.authors) {
            const bookAuthors = document.createElement("p");
            bookAuthors.className = "book-description";
            bookAuthors.textContent = `${book.volumeInfo.authors.join(", ")}`;
            bookInfo.appendChild(bookAuthors);
          }
          const bookTitle = document.createElement("h3");
          bookTitle.className = "book-title";
          bookTitle.textContent = book.volumeInfo.title;
          bookInfo.appendChild(bookTitle);
          
         

          if (book.volumeInfo.averageRating && book.volumeInfo.ratingsCount) {
            const rating = Math.round(book.volumeInfo.averageRating);
            const ratingsCount = book.volumeInfo.ratingsCount;
            const bookRating = document.createElement("p");
            bookRating.className = "book-description";
            const MAX_RATING = 5;
            const YELLOW_STARS = rating;
            const GRAY_STARS = MAX_RATING - rating;

            const yellowStars = "★".repeat(YELLOW_STARS);
            const grayStars = "☆".repeat(GRAY_STARS);

            bookRating.innerHTML = `<span style="color: #F2C94C">${yellowStars}</span><span style="color: gray">${grayStars}</span> (${ratingsCount} reviews)`;
            bookInfo.appendChild(bookRating);
          }
          

          if (book.volumeInfo.description) {
            const description =
              book.volumeInfo.description.length > 150
                ? `${book.volumeInfo.description.substring(0, 150)}...`
                : book.volumeInfo.description;
            const bookDescription = document.createElement("p");
            bookDescription.className = "book-description";
            bookDescription.textContent = description;
            bookInfo.appendChild(bookDescription);
          }
         if (
            book.saleInfo &&
            book.saleInfo.listPrice &&
            book.saleInfo.listPrice.amount
          ) {
            const price = book.saleInfo.listPrice.amount;
            const currencyCode = book.saleInfo.listPrice.currencyCode;
            const bookPrice = document.createElement("p");
            bookPrice.className = "price";
            bookPrice.textContent = `Price: ${price} ${currencyCode}`;
            bookInfo.appendChild(bookPrice);
          } else {
            const notForSale = document.createElement("p");
            notForSale.className = "not-for-sale";
            notForSale.textContent = "Not for sale";
            bookInfo.appendChild(notForSale);
          }
          const buyButton = document.createElement("button");
          buyButton.className = "buy-button";
          buyButton.href = "#";
          buyButton.textContent = "Buy now";
          bookInfo.appendChild(buyButton);

          bookList.appendChild(bookInfo);
          booksEl.appendChild(bookList);
          
    buyButton.addEventListener('click', clickOnBuyNow);
    booksEl.appendChild(bookList);
  });
}

async function getBooks() {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyCq3RQgYV2x8IR9VhY5D0oK-TXqgnycAGQ&printType=books&startIndex=0&maxResults=${itemsPerPage}&langRestrict=en`
  );

  const data = await response.json()
  showBooks(data)
}

getBooks()

const categories = document.querySelectorAll('.menu-navigation_item')

categories.forEach((category) => {
    category.addEventListener('click', showBooksByCategory)
})

console.log(categories);

function showBooksByCategory() {
    const activeCategoty = document.querySelector('.active_item')
    activeCategoty.classList.remove('active_item')
    this.classList.add('active_item');

    category = this.dataset.name
    itemsPerPage = 6;
    getBooks()
}

const loadMoreButton = document.querySelector('.load-more-button')

loadMoreButton.addEventListener('click', loadMoreBooks)
console.log(loadMoreButton);
function loadMoreBooks() {
    console.log('click');
    itemsPerPage += 6;
    getBooks()
}


// shop bag
const shopBag = document.querySelector('.circle')

let shopBagItems = localStorage.getItem('shopBagItems') ||  0;

if (shopBagItems > 0) {
    shopBag.style.opacity = 1;
    shopBag.textContent = shopBagItems
}

function clickOnBuyNow() {
    if (this.classList.contains('buy-now_active')) {
        deleteItemFromShopBag()
        this.textContent = 'buy now'
        this.classList.remove('buy-now_active')
    } else {
        addItemInShopBag()
        this.textContent = 'in the cart'
        this.classList.add('buy-now_active')
    }
    console.log('update', shopBagItems);
    localStorage.setItem('shopBagItems', shopBagItems)
}

function addItemInShopBag() {
    if (shopBagItems === 0) {
        shopBag.style.opacity = 1;
    }

    shopBagItems++;
    shopBag.textContent = shopBagItems
}

function deleteItemFromShopBag() {
    shopBagItems--;

    if (shopBagItems === 0) {
        shopBag.style.opacity = 0;
    }
    shopBag.textContent = shopBagItems
}
// slider

const slider = document.querySelector(".slider");
  const images = slider.getElementsByTagName("img");
  const dotsContainer = document.querySelector(".dots");
  const dots = dotsContainer.getElementsByClassName("dot");

  let currentSlideIndex = 0;
  let slideInterval;

 function showSlide(index) {
    for (let i = 0; i < images.length; i++) {
      images[i].classList.remove("active");
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    images[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlideIndex = index;
  }

 function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % images.length;
    showSlide(currentSlideIndex);
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => {
      showSlide(i);
    });
  }

 slideInterval = setInterval(nextSlide, 5000);


 showSlide(0);