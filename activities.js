function formatDuration(duration){
    var sec_num = parseInt(duration, 10); // don't forget the second param
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - (minutes * 60);

   
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes + ':' + seconds;
    

}

function formatTime(time) {
    var timeMap = {
        0: "12AM",
        1: "1AM",
        2: "2AM",
        3: "3AM",
        4: "4AM",
        5: "5AM",
        6: "6AM",
        7: "7AM",
        8: "8AM",
        9: "9AM",
        10: "10AM",
        11: "11AM",
        12: "12PM",
        13: "1PM",
        14: "2PM",
        15: "3PM",
        16: "4PM",
        17: "5PM",
        18: "6PM",
        19: "7PM",
        20: "8PM",
        21: "9PM",
        22: "10PM",
        23: "11PM"
    };
    return timeMap[time];
}
function formatPlayBtn(cell){
    return `
        <iframe
            scrolling="no"
            frameborder="0"
            allowTransparency="true"
            src="https://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=80&height=80&color=007FEB&layout=dark&size=small&type=tracks&id=${cell.getValue()}&app_id=1"
            width="80"
        height="80">
        </iframe>
    `;

}


var allActivities=JSON.parse(localStorage.getItem("activityPlaylist"));
if(allActivities === null) {
    allActivities =[];
}
//  looping over allActivities from localStor and creating a table for each activity
allActivities.forEach(function(activity, i){
    var tabDiv = $('<div>');
    tabDiv.attr("id", "playlist-table-" + i);
    $("#tables").append(tabDiv);


    //parsing over playlist arr to get 
    var tabledata = activity.playlist.map(function(item) {
      var parsedItem = JSON.parse(item);
      parsedItem.duration = formatDuration(parsedItem.duration);
      return parsedItem;
      
    });
    //create Tabulator on DOM element with id "example-table"
    var table = new Tabulator("#playlist-table-" + i, {
        height:300, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data:tabledata, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ {//create column group
            title: activity.name + " " +  formatTime(activity.time),
            columns:[
                {title:"Title", field:"title", hozAlign:"center"},
                {title:"Artist", field:"artist", hozAlign:"center"},
                {title:"Album", field:"album", hozAlign:"center"},
                {title:"Duration", field:"duration", hozAlign:"center"},
                {title: "Play", field:"songId",hozAlign:"center",formatter:formatPlayBtn}

            ],
        }],
      
    });

});
