$(function(){

 $('#getproducts').on('click', ()=>{
  $.ajax({
   url: '/products',
   success: function(products){
     //console.log(products);
     let tbody = $('tbody');
     tbody.html('');
     products.forEach(product =>{
        tbody.append(`
          <tr>
            <td class="id">${product.id}</td>
            <td>
               <input type="text" class="name" value="${product.name}"/>
            </td>

            <td>
             <button class="update-button">Update</button>
             <button class="delete-button">Delete</button>
            </td>
          </tr>
        `)
     });
   }
  });
 });

 $('#productform').on('submit', (event)=>{
   event.preventDefault();
   let newproduct = $('#newproduct');
    
    $.ajax({
     url: '/products',
     method: 'POST',
     data: {
      name: newproduct.val()
     },
     success: (reponse)=>{
       $('#getproducts').click();
     }
    })

 });
 
 $('table').on('click', '.delete-button', function(){
  let row = $(this).closest('tr');
  let id = row.find('.id').text();
   
  alert(id);

  $.ajax({
    url: '/products/' + id,
    method: 'DELETE',
    success: function(res){
     $('#getproducts').click();
    }
    
  });
 
 });

   
 $('table').on('click', '.update-button', function() {
  let row = $(this).closest('tr');
  let id = row.find('.id').text();
   let name = row.find('.name').val();
  //alert(name);

      $.ajax({
        url:'/products/'+ id,
        method:'PUT',
        data: {
        name:name
        },
        success: function(res){
        $('#getproducts').click();
        }
        
      });
 
 });

});