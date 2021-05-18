/* client-side JavaScript here */

console.log(`Everything's perfectly all right now. We're fine. We're all fine here now, thank you. How are you?`);

const btn1 = document.querySelector('#btn1');
const para = document.querySelector('.box.box1');

btn1.addEventListener('click', () => {
  para.textContent = para.textContent += `Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo beet greens corn soko endive gumbo gourd.`;
});
