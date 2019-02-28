var strt  = 0;
$(document).on('click', 'table tr', function(e) {
    console.log('You clicked row '+ ($(this).index()+1) )
    strt = ($(this).index()+1);
    console.log(strt);
    if($('table').attr('id') === 'First_table' ) {
        console.log("First");
    } else if($('table').attr('id') === 'Second_table') {
        console.log("Second");
    } else {
        console.log("err");
    }
});
console.log(strt);
$("#first-date").val() = strt;
$("#added").click(function() {
    var StrFirst =  $("#first-date").val();
    var strSecond =  $("#second-date").val();
    var strThird =  $("#third-date").val();
   });