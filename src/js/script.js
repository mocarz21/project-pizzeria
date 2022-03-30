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
      thisProduct.getElements();                                                                                // po co początek thisProductn ?
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.processOrder();
      console.log('new product : ', thisProduct);                                                              //w mozilla kiedy widze na co wskazuje this upewnic sie ze to co jest kolorem  ??
    }
    initAccordion(){
      const thisProduct = this;
      
      
      /* find the clickable trigger (the element that should react to clicking) */
      //const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);              //powtorzyc na co wskazuje this i kiedy !!
      

      /* START: add event listener to clickable trigger on event click */
      //clickableTrigger.addEventListener('click', function(event){

      thisProduct.accrdionTrigger.addEventListener('click', function(event){

        /* prevent default action for event */
        event.preventDefault();

        /* find active product (product that has active class) */
        let activeProduct = document.querySelector(select.all.menuProductsActive);                     // Czy mogę użyć classList po querySelector w celu wyszukania klasy ?

        /* if there is active product and it's not thisProduct.element, remove class active from it */
        if (activeProduct && (thisProduct.element != activeProduct)){                                         //czemu nie działał zapis thisProduct.element != activeProduct ? czemu tak (activeProduct && (thisProduct.element != activeProduct))??
          activeProduct.classList.remove('active');
        }
        console.log('active product : ', activeProduct);
        /* toggle active class on thisProduct.element */
        thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);

      });                                                                                                      // po co tenm nawias ????

    }
    initOrderForm(){
      const thisProduct = this;
      console.log('initOrderForm :', this)

      thisProduct.form.addEventListener('submit', function(event){
        event.preventDefault();
        thisProduct.processOrder();
      });
      for(let input of thisProduct.formInputs){
        input.addEventListener('change' , function(){
          thisProduct.processOrder();
        });
      }
      thisProduct.cartButton.addEventListener('click' , function (event){
        event.preventDefault();
        thisProduct.processOrder();
      });
    }
    processOrder(){
      const thisProduct = this;

      // covert form to object structure e.g. { sauce: ['tomato'], toppings: ['olives', 'redPeppers']}
      const formData = utils.serializeFormToObject(thisProduct.form);
      

      // set price to default price
      let price = thisProduct.data.price;

      // for every category (param)...
      for(let paramId in thisProduct.data.params) {

        // determine param value, e.g. paramId = 'toppings', param = { label: 'Toppings', type: 'checkboxes'... }
        const param = thisProduct.data.params[paramId];
        

        // for every option in this category
        for(let optionId in param.options) {

          // determine option value, e.g. optionId = 'olives', option = { label: 'Olives', price: 2, default: true }
          const option = param.options[optionId];
          
          //sprawdzenie czy jest zaznaczona opcja default: true

          //jezeli nie jest zaznaczona dodaj do price optionId(element prowadzacy do wartosci w obiekcie price) jeżeli nie odejmij od price  optionId(element prowadzacy do wartosci w obiekcie price)
          
        }
      }
      // update calculated price in the HTML
      thisProduct.priceElem.innerHTML = price;

      

      console.log('price :', price);
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
    getElements(){
      const thisProduct = this;

      thisProduct.accrdionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
      console.log('sprawdzenie przewidywan : ',thisProduct.formInputs)
    } 
  }
  app.init();
}
