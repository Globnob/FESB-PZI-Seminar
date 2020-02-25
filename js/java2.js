const narudzba = document.getElementById('narudzba')
narudzba.addEventListener('click', () => {  
    const nMenu = document.getElementById('pregled2');
    nMenu.classList.toggle('active');
  });

  const pregled2 = document.getElementById('p_title2')
pregled2.addEventListener('click', () => {  
    const pregledMenu = document.getElementById('pregled2');
    pregledMenu.classList.toggle('active');
  });


const buttonList = document.querySelectorAll('.button1');
for (let i = 0; i < buttonList.length; i++) {
  const button = buttonList[i];
  button.addEventListener('click', handleButtonClick);
}

function handleButtonClick(e){
  const clickedButton = e.currentTarget;

  const sushi = clickedButton.parentElement;
  const sushi_ime = sushi.querySelector('#title').textContent;
  const sushi_price = sushi.querySelector('#cijena').textContent;
  const onlyPrice = sushi_price.split(' ')[1];
  console.log(sushi_ime);
  console.log(onlyPrice);
  const sushiData = {
    name: sushi_ime,
    price: onlyPrice
  };
  const nabava= document.querySelector(
    `#pregled2 .pregled_item#${sushi_ime.toLowerCase()}`
  );
  if (!nabava) {
    createNewShopItem(sushiData);
  } else {
    const amountItem = nabava.querySelector('.kolicina #o3');
    let amountNumber = parseInt(amountItem.textContent);
    amountNumber++;
    amountItem.textContent = amountNumber;
  }
  calculateTotalPrice();

  const potvrdi = document.getElementById('potvrdi')

potvrdi.addEventListener('click', () => {    
  if(nabava){
      alert("naruceno!");
  }
  });
  
}

function createNewShopItem(sData) {

  const shopItem = document.createElement('div');
  shopItem.setAttribute('class', 'pregled_item'); 

  shopItem.setAttribute('id', sData.name.toLowerCase());


  const shopItemHeading = document.createElement('h3');
  shopItemHeading.setAttribute('id', 'o');
  shopItemHeading.textContent = sData.name;
  shopItem.appendChild(shopItemHeading);


  const shopItemDescription = document.createElement('div');
  shopItemDescription.setAttribute('class', 'description');
  const descriptionInnerHTML = `
    <div class="cijena">
      <p>Cijena:</p>
      <p id="o1">${sData.price}</p>
      <p>kn</p>
    </div>
    <div class="kolicina">
      <p>Količina:</p>
      <div class="kolicina">
        <p id="o3">1</p>
      </div>
    </div> `; 
  shopItemDescription.innerHTML = descriptionInnerHTML;
  shopItem.appendChild(shopItemDescription);

  const shopItemCloseIcon = document.createElement('i');
  shopItemCloseIcon.classList.add('fas', 'fa-times', 'close');
  shopItem.appendChild(shopItemCloseIcon);
  shopItemCloseIcon.addEventListener('click', removeShopItem);


  dodaj_na_pregled(shopItem);
  calculateTotalPrice();
}


function dodaj_na_pregled(newItem) {
  const pregled_menu = document.getElementById('pregled2');
  pregled_menu.appendChild(newItem);
}

function removeShopItem(e) {
  const clickedX = e.currentTarget;
  const shopItem = clickedX.parentElement;
  shopItem.remove();
  calculateTotalPrice();
}

function calculateTotalPrice() {
  let totalPrice = 0;
  const shopItems = document.querySelectorAll(
    '#pregled2 .pregled_item'
  );

  for (let i = 0; i < shopItems.length; i++) {
    const item = shopItems[i];
    const itemPrice = item.querySelector('.cijena #o1').textContent;
    const itemAmount = item.querySelector('.kolicina #o3').textContent;


    const itemTotalPrice = parseFloat(itemPrice) * parseInt(itemAmount);
    totalPrice += itemTotalPrice;
  }

  document.querySelector(
    '#pregled2 > .ukupna-cijena > em'
  ).textContent = totalPrice.toFixed(2) + "kn";
}



