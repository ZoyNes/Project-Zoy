function cart_item_row(data)
{
	$('#CARTITEM'+data.item.id).remove();
	
	var itemrow = $('.sidebar-cart-product-wrapper .navbar-cart-product.clone').clone();
	
	itemrow.attr('id', 'CARTITEM'+data.item.id).removeClass('clone hide').addClass('qs-cart-item');
	itemrow.find('.navbar-cart-product-id').addClass('qs-cart-pid').attr('value', data.item.id);
	itemrow.find('.navbar-cart-product-link').attr('href', data.item.url).html(data.item.title + (data.is_variant > 0 ? ' <small>' + data.variant_name + '</small>': ''));
	itemrow.find('.navbar-cart-product-url').attr('href', data.item.url);
	itemrow.find('.navbar-cart-product-price').text(data.item.price);
	itemrow.find('.navbar-cart-product-image').attr('src', data.item.firstimage);
	itemrow.find('.navbar-cart-product-qty').attr('value', data.qty).addClass('qs-cart-qty');
	itemrow.find('.qs-cart-delete').attr('data-pid', data.item.id);

	$('.sidebar-cart-product-wrapper').append(itemrow);
}
function QS_CART_SET(data)
{ // update cart when .qs-cart-view has been clicked.
	if(!$('.qs-cart-empty').hasClass('d-none')) $('.qs-cart-empty').addClass('d-none');

	$('.qs-cart-item').remove();

	$.each(data.items, function(index, data_item) {
		cart_item_row(data_item);
	});

	$('.navbar-cart-totals').text(data.total_amount);
	$('.basket-count-items').text(data.total_qty);

	if (data.total_qty > 0) {
		$('.basket-count-items').removeClass('icon-count-hidden');
	} else {
		$('.basket-count-items').addClass('icon-count-hidden');
	}

	$('.navbar-checkout-btn').removeClass('disabled');
}

function QS_CART_PRODUCT_ADDED(data)
{
	/* 
	 * Callback function when a product has been added to the cart.
	 * 
	 * Parameter "item" is a JSON object and provides:
	 * data.qty 			@ qty of the product
	 * data.amount 			@ amount of the product
	 * data.amount_raw 		@ amount of the product in raw-format
	 * data.is_variant 		@ tells if its a product variant
	 * data.item.firstimage @ first image of the product
	 * data.item.id 		@ id
	 * data.item.price 		@ single price of the product
	 * data.item.price_raw 	@ single price of the product in raw-format
	 * data.item.title 		@ title of the product
	 * data.item.url 		@ url of the product
	 * data.success 		@ tells if it has successfully been added to the cart.
	 * 
	*/
	
	if(data.success)
	{
		QS_CART_SET(data);
		
		// open the cart box
		$('#sidebarCart').modal('show');
		
	}else{
		alert(data.error);
	}
	
}

function QS_CART_PRODUCT_UPDATED(data)
{
	/* 
	 * Callback function when a product has been updated in the cart.
	 * 
	 * Parameter "data" is a JSON object and provides:
	 * data.item_id 	@ of the product added
	 * data.subtotal 	@ current total for the product added
	 * data.total 		@ current total for all the products in the cart
	 * 
	*/
	
	$('.navbar-cart-totals').text(data.total);
	$('.basket-count-items').text(data.total_qty);
	
	if(data.total_qty > 0)
	{
	    $('.navbar-checkout-btn').removeClass('disabled');
	}else{
	    $('.navbar-checkout-btn').addClass('disabled');
	}
	
	//$('.price_display_' + data.item_id).text(data.subtotal);
}
	
function QS_CART_PRODUCT_BEFORE_DELETE(item_id)
{
	/* 
	 * This function runs before deleting the product from the cart.
	 * 
	 * Parameter "item" is a string and provides:
	 * item_id	@ of the product that will be deleted
	 * 
	*/
	
	
}
function QS_CART_PRODUCT_DELETED(item_id)
{
	/* 
	 * Callback function when a product has been deleted from the cart.
	 * 
	 * Parameter "item" is a string and provides:
	 * item_id	@ of the product deleted
	 * 
	*/
	
	$('#CARTITEM'+item_id).slideUp(function(){
	    $('#CARTITEM'+item_id).remove();
	    
    	// Hide the empty-text
    	if( $('.navbar-cart-product:not(.clone)').length == 0 )
    	{
    		$('.qs-cart-empty').slideDown().removeClass('d-none');
    		
    		$('.basket-count-items').text('0').addClass('icon-count-hidden');
    		$('.navbar-cart-totals').text('-');
    		
    		$('.navbar-checkout-btn').addClass('disabled');
        	
    	}else{
    		// Trigger change to recalculate total
    		$('.qs-cart-item:not(.clone)').find('.qs-cart-qty:first').trigger('change');
    	}
    	
	});
	
}
function QS_PRODUCT_VARIANT_CHANGED(data)
{
	if(data.image_id > 0) {
		$('.qs-product-image'+data.image_id).click();
	}
	
	$('.qs-cart .qs-product-price').show();
    
    var instock_text = $('.product-current-stock-status').data('in-stock-text');
    var outofstock_text = $('.product-current-stock-status').data('out-of-stock-text');
	
	if(data.sku != null) {
	    $('.product-current-sku').text(data.sku);
	} else {
        $('.product-current-sku').text('');
	}
	
	if(data.qty != null) {
        $('.product-current-stock-qty-box').show();
        if(data.qty <= 0 && data.allow_minusqty != 1) {
            $('.product-current-stock-qty-box').hide();
            $('.product-current-stock-status').html(outofstock_text).removeClass('instock').addClass('outofstock');
        } else {
            $('.product-current-stock-status').html('<i class="fa fa-check"></i> ' + instock_text).removeClass('outofstock').addClass('instock');
            $('.product-stock-balance').text(data.qty);
        }
        if(data.qty <= 0 && data.allow_minusqty == 1) {
            $('.product-current-stock-qty-box').hide();
        }
	} else {
        $('.product-current-stock-qty-box').hide();
        $('.product-current-stock-status').html('<i class="fa fa-check"></i> ' + instock_text).removeClass('outofstock').addClass('instock');
	}
	
	//$(".qs-cart-option").selectOrDie("update");
}

function QS_PRODUCT_VARIANT_NOT_CHANGED() {

    var combinationdoesnotexist_text = $('.product-current-stock-status').data('combination-not-exist-text');

    $('.product-current-stock-qty-box').hide();
    $('.product-current-sku').text('');
    $('.product-current-stock-status').html(combinationdoesnotexist_text).removeClass('instock').addClass('outofstock');

    $('.qs-product-price').hide();

}