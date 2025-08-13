document.addEventListener('DOMContentLoaded',()=>{
    console.log('script cargado');
    // elementos a manipular

    // elementos en la cabecera
    const menu=document.getElementById('menuId');
    const iconClose=document.getElementById('iconCloseId');
    const navElement=document.querySelector('nav');
    const ulElement=document.querySelector('ul');
    const cartIcon=document.getElementById('cartIconId');
    const numberElementsCart=document.getElementById('numberElementsId');
    

    // elementos en la pantalla de carro de compra
    const displayCart=document.getElementById('displayCartId');
    const basket=document.getElementById('basketId');
    const numberUnits=document.getElementById('numberUnitsId');
    const totalCart=document.getElementById('totalCartId');
    const checkout=document.getElementById('checkoutId');

    // imagen, deslizadores y miniaturas
    const principalImage=document.getElementById('principalImageId');
    const slidePrevious=document.getElementById('slidePreviousId');
    const slideNext=document.getElementById('slideNextId');
    // miniaturas
    const thumbs=document.querySelectorAll('.thumbs');
    const img1=document.getElementById('img1Id');
    const img2=document.getElementById('img2Id');
    const img3=document.getElementById('img3Id');
    const img4=document.getElementById('img4Id');

    // incrementar y decrementar elementos
    const minus=document.getElementById('minusId');
    const quantity=document.getElementById('quantityId');
    const plus=document.getElementById('plusId');

    // boton añadir carro
    const addCart=document.getElementById('cartId');

    // despliegue de menu movil(se hace click se hace visible navElement, ulElement y iconClose, menu se hace oculto)
    menu.addEventListener('click',()=>{
        navElement.style.visibility='visible';
        ulElement.style.visibility='visible';
        iconClose.style.visibility='visible';
    });

    // ocultacion del menu movil
    iconClose.addEventListener('click',()=>{
        navElement.style.visibility='hidden';
        ulElement.style.visibility='hidden';
        iconClose.style.visibility='hidden';
    });

    // deslizamiento de las miniaturas
    slideNext.addEventListener('click', ()=>{
        // obtengo la imagen que tiene principalImageId a traves de src y saco el numero, incremento el numero en 1 y se lo añado al path de src si es menor o igual a 4, si el src de principalImageId es 4 le añado 1 en vez del 4
        // obtener la imagen de principalImageId
        console.log('next pulsado');
        const srcPrincipalImage=principalImage.getAttribute('src');
        const numberPrincipalImage=parseInt(srcPrincipalImage[srcPrincipalImage.length-5]);
        let pathImage='./images/image-product-';
        let endTextImg='';
        const newSrc='';
        let nextNumber=0;
        if(numberPrincipalImage<4 && numberPrincipalImage>=1){
            nextNumber=numberPrincipalImage + 1;
            endTextImg=nextNumber+'.jpg';
            pathImage=pathImage+endTextImg;
            // console.log(pathImage);
            principalImage.setAttribute('src',pathImage);
        }else{
            principalImage.setAttribute('src','./images/image-product-1.jpg');
        }
        
    });

    slidePrevious.addEventListener('click', ()=>{
        const srcPrincipalImage=principalImage.getAttribute('src');
        const numberPrincipalImage=parseInt(srcPrincipalImage[srcPrincipalImage.length-5]);
        let pathImage='./images/image-product-';
        let endTextImg='';
        const newSrc='';
        let previousNumber=0;
        if(numberPrincipalImage>1 && numberPrincipalImage<=4){
            previousNumber=numberPrincipalImage-1;
            endTextImg=previousNumber+'.jpg';
            pathImage=pathImage+endTextImg;
            principalImage.setAttribute('src',pathImage);
        }else{
            principalImage.setAttribute('src','./images/image-product-4.jpg');
        }
    });

    // Incremento y decremento en el numero de unidades y mostrar unidades encima del carrito de la compra

    let quantityNumber=parseInt(quantity.value);
    plus.addEventListener('click', ()=>{
        quantityNumber=quantityNumber+1;
        quantity.value=quantityNumber;
        // 
    });

    minus.addEventListener('click',()=>{
        if(quantityNumber>0){
            quantityNumber=quantityNumber-1;
            quantity.value=quantityNumber;
            // 
            // numberElementsCart.innerText=quantityNumber;
        }else{
            quantity.value=0;
        }
    });

    // mostrar carrito de la compra, cuando se pulsa add to cart se muestran las unidades encima del carrito y se muestra la foto, el numero de unidades(extraido de quantityNumber) y se calcula el precioTotal. Si no se ha presiona add to cart el carrito estara vacio y se mostrara en la clase body-cart "Your cart is empty" 

    function cartIsEmpty(){
        const numberElementsVisible=window.getComputedStyle(numberElementsCart).visibility;
        if(numberElementsVisible==='hidden'){
            return true;
        }else{
            return false;
        }

    }


    const innerBodyCart=document.querySelector('.body-cart');

    function clearBodyCart(){
        innerBodyCart.style.display = 'flex';
            innerBodyCart.style.justifyContent = 'center';
            innerBodyCart.style.alignItems = 'center'; // Corrige 'alignsItems'
            innerBodyCart.innerHTML = '<p>Your cart is empty</p>';
            quantity.value=0;
            numberElementsCart.style.visibility='hidden';
            quantityNumber=0;
    }

    cartIcon.addEventListener('click',()=>{
        if (displayCart.style.visibility === 'visible') {
        displayCart.style.visibility = 'hidden';
    } else {
        displayCart.style.visibility = 'visible';
        if (cartIsEmpty()) {
            clearBodyCart();
            
        } else {
            console.log('carro lleno'); 
            const price = document.querySelector('.price').innerText;
            const priceNumber = parseFloat(price.replace('$', ''));
            const totalCart=quantityNumber * priceNumber;
            innerBodyCart.style.display='flex';
            innerBodyCart.style.justifyContent = 'start';
            innerBodyCart.style.alignItems = 'center'; // Corrige 'alignsItems'
            innerBodyCart.style.gap='10px';
            innerBodyCart.innerHTML=`<div class='thumb-nameProduct-price-units-total-delete' id='basketId'><div class='image-title-price-delete'><img src='./images/image-product-1-thumbnail.jpg' alt='product' class='img-basket'/><div class='title-price-basket'><p class='title-product-cart'>Fall Limited Edition Sneakers</p><p><span class='price-x-unit'>$125.00</span><span>x</span><span id='numberUnitsId'></span><span class='total-cart' id='totalCartId'>$${totalCart}</span></p></div><img src='./images/icon-delete.svg' alt='Delete' class='icon-delete' id='deleteCartId'/></div><button class="checkout" id="checkoutId">Checkout</button>`;
            
            const numberUnits = document.getElementById('numberUnitsId');
            if (numberUnits) numberUnits.innerText = quantityNumber;
            
            const basketContent=document.querySelector('.thumb-nameProduct-price-units-total-delete');
            basketContent.style.flexDirection='column';

            const imagePrice=document.querySelector('.image-title-price-delete');
            imagePrice.style.display='flex';
            imagePrice.style.alignItems='center';
            imagePrice.style.gap='10px';
            imagePrice.style.flexDirection='row';

            const deleteCart=document.getElementById('deleteCartId');
            deleteCart.addEventListener('click', ()=>{
                // borramos el interior de .body-cart y ponemos your cart is empty
                clearBodyCart();
            });
        }
    }

    });


    // evento al cliclear add to cart para mostrar 
    addCart.addEventListener('click', ()=>{
        if(quantityNumber!==0){
            numberElementsCart.style.visibility='visible';
            numberElementsCart.innerText=quantityNumber;
        }else{
          numberElementsCart.style.visibility='hidden';
        }
    });

    // Selecciona todos los elementos del menú
    const menuItems = document.querySelectorAll('ul li');

    // borde inferior naranja al clikar sobre una palabra del menu

    menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Quita la clase active de todos
        menuItems.forEach(i => i.classList.remove('active'));
        // Añade la clase active al clicado
        this.classList.add('active');
    });
});

    // Mostrar en principalImageId la miniatura que se clika, dandole borde naranja a la miniatura y opacidad a la miniatura

    img1.addEventListener('click', ()=>{
        img2.style.border='none';
        img3.style.border='none';
        img4.style.border='none';
        img1.style.border='2px solid hsl(26, 100%, 55%)';
        principalImage.setAttribute('src','./images/image-product-1.jpg');
    });

    img2.addEventListener('click', ()=>{
        img1.style.border='none';
        img3.style.border='none';
        img4.style.border='none';
        img2.style.border='2px solid hsl(26, 100%, 55%)';
        principalImage.setAttribute('src','./images/image-product-2.jpg');
    });

    img3.addEventListener('click', ()=>{
        img1.style.border='none';
        img2.style.border='none';
        img4.style.border='none';
        img3.style.border='2px solid hsl(26, 100%, 55%)';
        principalImage.setAttribute('src','./images/image-product-3.jpg');
    });

    img4.addEventListener('click', ()=>{
        img1.style.border='none';
        img2.style.border='none';
        img3.style.border='none';
        img4.style.border='2px solid hsl(26, 100%, 55%)';
        principalImage.setAttribute('src','./images/image-product-4.jpg');
    });

});