
function approveVisit(user) {
  Swal.fire(
                'Confirmed!',
                'Your visit with ' + user + ' is confirmed.',
                'Ok'
              )
}

function cancelVisit(user){
	//Warning Message
        
            
            Swal.fire({
                title: 'Are you sure?',
                text: "Would you like to cancel your visit with " + user + "?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel!',
                reverseButtons: false
              }).then((result) => {
                if (result.value) {
                  swal.fire(
                    'Canceled!',
                    'Your visit with ' + user + ' has been canceled.',
                    'success'
                  )
                } else if (
                  // Read more about handling dismissals
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  /*swal.fire(
                    'Cancelled',
                    ' ',
                    'error'
                  )*/
                }
              })
      
}


function deleteCC(cc){
	//Warning Message
        
            
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to delete credit card ending in " + cc + "?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel!',
                reverseButtons: false
              }).then((result) => {
                if (result.value) {
                  swal.fire(
                    'Card Deleted',
                    'Your credit card number ending with ' + cc + ' has been deleted.',
                    'success'
                  )
                } else if (
                  // Read more about handling dismissals
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swal.fire(
                    'Cancelled',
                    ' ',
                    'error'
                  )
                }
              })
      
}


function cancelSubscription(date){
	//Warning Message
        
            
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to cancel your subscription? You can still use you account until " + date,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No, keep it.',
                reverseButtons: false
              }).then((result) => {
                if (result.value) {
                  swal.fire(
                    'Subscription Canceled',
                    'You can still use you account until ' + date,
                    'success'
                  )
                } else if (
                  // Read more about handling dismissals
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swal.fire(
                    'Cancelled',
                    ' ',
                    'error'
                  )
                }
              })
      
}





