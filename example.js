function getDay(dt){

    var date = new Date(dt);
    var day_from_date = date.getDay();
   
     return day_from_date;
}
  

console.log(getDay(1688104779));