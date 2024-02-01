import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';


// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

// 장바구니 버튼 클릭시 메뉴 보여지게 안보여지게
basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation(); // 장바구니 클릭이 윈도우까지 전파되지 않게 막음
  if (basketEl.classList.contains('show')) { //없으면 false  있으면 true
    // 없으면 hide(false)
    hideBasket ();
  }else {
    // 있으면 show(true)
    showBasket ();
  }
});

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}

 //드롭다운 메뉴 영역 클릭시 안닫히게
basketEl.addEventListener('click', function (event) {
  event.stopPropagation(); 
});

//윈도우 화면 클릭시 장바구니 메뉴버튼 사라지게
window.addEventListener('click', function() {
  basketEl.classList.remove('show');
} );



// 검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch(){
  headerEl.classList.add('searching');
  document.documentElement.classList.add('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    });
  searchDelayEls.forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}
function hideSearch(){
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    });
  searchDelayEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  });
  searchDelayEls.reverse();
  searchInputEl.value = '';
}

// 요소의 가시성 관칠
const io = new IntersectionObserver(function (entries){
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show');
  });
});

const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function (el) {
  io.observe(el);
});

// 비디오 재생
const video = document.querySelector('.stage video');
const platBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

platBtn.addEventListener('click', function (){
  video.play();
  platBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', function (){
  video.pause();
  platBtn.classList.remove('hide');
  pauseBtn.classList.add('hide');
});

//데이터기반 랜더링 ipad compare부분
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function(ipad){
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`
  });

  itemEl.innerHTML = /* html */`
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl);
});


//데이터 기반 랜더링 푸터 네비게이션 부분
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach(function(nav) {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList +=/*html*/ `<li>
    <a href="${map.url}">${map.name}</a>
    </li>`
  });

  mapEl.innerHTML = /* html */`
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl);
});

//푸터 현재 연도 숫자 변경
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();
