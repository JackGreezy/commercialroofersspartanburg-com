const cardDisplayNum = document.getElementById('cardDisplayNum');

let itemsTextIconCards = document.querySelectorAll('.text-icon-cards .carousel .carousel-item')

if (itemsTextIconCards.length) {
  itemsTextIconCards.forEach((el) => {
      const minPerSlide = cardDisplayNum.value;
      let next = el.nextElementSibling
      for (var i=1; i<minPerSlide; i++) {
          if (!next) {
              // wrap carousel by using first child
            next = itemsTextIconCards[0]
          }
          let cloneChild = next.cloneNode(true)
          el.appendChild(cloneChild.children[0])
          next = next.nextElementSibling
      }
  });
}