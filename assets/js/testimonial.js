class Testimonial {
  #massage = "";
  #image = "";

  constructor(massage, image) {
    this.#massage = massage;
    this.#image = image;
  }

  get massage() {
    return this.#massage;
  }

  get image() {
    return this.#image;
  }

  get ShowTesti() {
    return `<div class="card-testi">
    <img src="${this.image}" style="height: 50%" alt="" /><br />
    <h2 class="user-testi">${this.massage}</h2>
    <br />
    <h4 class="user">- ${this.author}</h4>
    <br />
  </div>`;
  }
}

class Author extends Testimonial {
  #author = "";

  constructor(author, massage, image) {
    super(massage, image);
    this.#author = author;
  }

  get author() {
    return this.#author;
  }
}

class Company extends Testimonial {
  #company = "";

  constructor(company, massage, image) {
    super(massage, image);
    this.#company = company;
  }

  get author() {
    return this.#company + `Corperation`;
  }
}

const user = new Author("Surya eldianto", "Mantap sekali jasanya", "assets/img/christian-buehner-DItYlc26zVI-unsplash.jpg");
const user1 = new Company("Surya eldianto", "Wuih keren", "assets/img/christian-buehner-DItYlc26zVI-unsplash.jpg");
const user2 = new Company("Wadidaw ", "Mantap sekali jasanya", "assets/img/irene-strong-v2aKnjMbP_k-unsplash.jpg");

let data = [user, user1, user2];

let renderTesti = "";

for (let i = 0; i < data.length; i++) {
  renderTesti += data[i].ShowTesti;
}

document.getElementById("testimonial").innerHTML = renderTesti;
