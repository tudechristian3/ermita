$(document).ready(function(){
    var base_url = $('.base_url').val();
    var table_user = $("#residence_table").DataTable({
        "processing": true,
        "serverSide": true,
        "order": [[0,'desc']],
        "columns":[
             {"data":"ermita_rid"},
             {"data": "ermita_rid","render":function(data, type, row, meta){
                       var str = '';
                       str += row.ermita_rlname +  ", " +row.ermita_rfname;
                       return str;
                  }
             },
             {"data": "ermita_rid","render":function(data, type, row, meta){
                var str = '';
                
                str += '<div class="btn-group">';
                     str += '<a href="" class="btn btn-danger btn-sm delete_residence_action" data-id="'+row.ermita_rid+'"><i class="fa fa-trash"></i></a>';
                     str += '<a href="" class="btn btn-primary btn-sm view_residence_action" data-id="'+row.ermita_rid+'"><i class="fa fa-eye"></i></a>';
                     //str += '<a href="" data-toggle="modal" data-target="#EditProduct" class="btn btn-primary btn-sm product_details_action" img-url="'+row.date_added+'|'+row.uploaded_file+'" data-id="'+row.product_id+'" data-product_name="'+row.product_name+'" data-product_price="'+row.product_price+'" data-product_image="'+row.uploaded_file+'"><i class="fa fa-edit"></i></a>';
                str += '</div>';
                return str;
           }
      },
        ],
        "ajax": {
             "url": "residence/get_residence",
             "type": "POST"
        },
        "columnDefs": [
             {
                  "targets": [],
                  "orderable": false,

              },
         ],
   });
   //<img src="<?php echo base_url().'uploads/'.$news_item['post_image'] ?>" class="img-responsive">

//    $(document).on('click','.delete_residence_action',function(e){
//         e.preventDefault();
//         var id = $(this).attr('data-id');
//         var status = $(this).attr('data-status');
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You will not be able to recover this brand",
//             type: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#1A6519",
//             confirmButtonText: "Yes",
//         }).then((confirm) => {
//             if (confirm.value) {
//                 Swal.fire(
//                     'Deleted!',
//                     'Your file has been deleted.',
//                     'success'
//                   ),
//                 $.ajax({
//                     url:base_url+'residence/delete',
//                     type:'post',
//                     //dataType:'json',
//                     data: {
//                         'id': id
//                     },
//                     success: function(res){
//                         $.toast({
//                             heading: 'Successfully Deleted',
//                             text: res.message,
//                             position: 'top-right',
//                             loaderBg: '#178472',
//                             icon: res.type,
//                             hideAfter: 2000,
//                             stack: 6
//                         })
//                         table_user.ajax.reload();
//                     }
//                 })
//             }
//         }); 
//     });


        $(document).on('click','.delete_residence_action',function(e){
            e.preventDefault();
            var id = $(this).attr('data-id');
            var status = $(this).attr('data-status');
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete this resident?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1A6519",
                confirmButtonText: "Yes",
            }).then((confirm) => {
                    if (confirm.value) {
                        if(status == 1){
                            Swal.fire(
                                'Activated!',
                                'Your file has been active.',
                                'success'
                            )
                        }
                            $.ajax({
                                url: base_url+'residence/delete',
                                type:'post',
                                //dataType:'json',
                                data: {
                                    'id': id,
                                    'status': status
                                },
                                success: function(res){
                                    $.toast({
                                        heading: 'Deactivate Successfully',
                                        text: res.message,
                                        position: 'top-right',
                                        loaderBg: '#178472',
                                        icon: res.type,
                                        hideAfter: 2000,
                                        stack: 6
                                    })
                                    table_user.ajax.reload();
                                }
                            })
                    }
            }); 
        });
        

        //if mo upload og pic using file upload e off ang content data and process data

        // $(document).on('click','.product_details_action',function(e){
        //     e.preventDefault();
        //     var id = $(this).attr('data-id');
        //     var name = $(this).attr('data-product_name');
        //     var price = $(this).attr('data-product_price');
        //     var img_url = $(this).attr('img-url');
        //     let img = img_url.split('|');
        //     console.log(img);
        //     let img_html = `<img src="${base_url+'upload/'+img[0]+'/'+img[1]}" class="img-circle" height="75" width="75" />`;
        //     $('.append_img').html(img_html);
        //   //  var img_url = 
     

        //     $('input[name="product_id"]').val(id);
        //     $('input[name="product_name"]').val(name);
        //     $('input[name="product_price"]').val(price);
        //     $('.modal-title').html('Update User');
        //     $('.action-btn').html('Update');
        // });
        // //Edit User
        // $('#EditProduct form').on('submit', function(e){
        //     e.preventDefault();
        //     const self = $(this);
        //     $.ajax({
        //         url: base_url+'product/edit_products',
        //         type: 'POST',
        //         dataType: 'json',
        //         data: self.serialize(),
        //         success: function(res){
        //             Swal.fire({
        //                 title: "Saved",
        //                 text: "Successfully Update",
        //                 type: "success",
        //                 //showCancelButton: true,
        //                 confirmButtonColor: "#1A6519",
        //                 confirmButtonText: "Yes",
        //               });
        //               $('#EditProduct').modal('hide');
        //               table_user.ajax.reload();
        //         }
        //     });
        // });

       

        $(document).on('click','.view_residence_action',function(e){
            e.preventDefault();
            var id = $(this).attr('data-id');
           
            let formdata = {id : id};
            $.ajax({
                url: base_url+'residence/view_profile/'+id,
                method:'POST',
                data: formdata,
                success: function(res){
                    //console.log(res);
                    //window.open(base_url+'upload/test.pdf');
                     window.location.href = 'residence/view_profile/'+id;
                }
            }) 
           
        });

        $(document).on('submit', '#addForm' , function(e){
            e.preventDefault();
            //console.log(e);
            let formdata = new FormData($('#addForm')[0]);
           
            const self = $(this);
            $.ajax({
                url: base_url+'residence/add_residence',
                type: 'POST',
                dataType: 'json',
                contentType: false,
                processData: false,
                data: formdata,
                success: function(res){
                    Swal.fire({
                        title: "Saved",
                        text: "Successfully Added",
                        type: "success",
                        //showCancelButton: true,
                        confirmButtonColor: "#1A6519",
                        confirmButtonText: "Yes",
                    });
                    $('#addResidence').modal('hide');
                    table_user.ajax.reload();
                }
            });
        });
});