/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  const app = {
    initMenu: function(){
      const thisApp = this;

      console.log('this app.data : ' ,thisApp.data);

      for(let productData in thisApp.data.products){
        new Product(productData, thisApp.data.products[productData]);                                           //jak to się dzieje ze on pobiera dane z obiektu nie rozumiem składni ?? skad wie ze ma odniesc sie do pliku data skoro jest zamkniete w petli czy to oznacza ze przy takim zapisie mozemy wychodzic poza script.js ale z zewnatrz nikt nie moze sie odwołac ?
      }
    },
    
    initData: function(){
      const thisApp = this;
  
      thisApp.data = dataSource;
    },
    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initMenu();

    },
  };
  class Product{
    constructor(id, data){
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      thisProduct.renderInMenu();
      thisProduct.initAccordion();
      console.log('new product : ', thisProduct);                                                              //w mozilla kiedy widze na co wskazuje this upewnic sie ze to co jest kolorem  ??
    }
    initAccordion(){
      const thisProduct = this;
      /* find the clickable trigger (the element that should react to clicking) */
      const clickableTrigger = document.querySelector(select.menuProduct.clickable);
      /* START: add event listener to clickable trigger on event click */
      clickableTrigger.addEventListener('click' , function(event){

        /* prevent default action for event */
        event.preventDefault();

        /* find active product (product that has active class) */
        let activeProduct = document.querySelector(classNames.menuProduct.wrapperActive);                     // Czy mogę użyć classList po querySelector w celu wyszukania klasy ?
        

        /* if there is active product and it's not thisProduct.element, remove class active from it */
        if (activeProduct && (thisProduct.element != activeProduct)){                                         //czemu nie działał zapis thisProduct.element != activeProduct ? czemu tak (activeProduct && (thisProduct.element != activeProduct))??
          activeProduct.classList.remove('active')
        }
console.log('active product : ', activeProduct)
        /* toggle active class on thisProduct.element */
        thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive)

      });                                                                                                     // po co tenm nawias ????
    }
    renderInMenu(){
      const thisProduct = this;
      
      /* generate HTML based on temlate */
      const generatedHTML = templates.menuProduct(thisProduct.data);
      
      /* create element DOM using utils.createElementFromHTML */
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);  

      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.menu);

      /*add element to menu */
      menuContainer.appendChild(thisProduct.element);


    }
  }
  app.init();
}
