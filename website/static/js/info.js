function compareTimes(time1, time2){
    // Determine if two time objects are equal 
    if (time1 == undefined || time2 == undefined){
        return false;
    }
    else if (time1.start_time != time2.start_time){
        return false;
    }
    else if (time1.end_time != time2.end_time){
        return false;
    }
    return true;
}

days = {
    0:"Mon",
    1:"Tues",
    2:"Wed",
    3:"Thu",
    4:"Fri",
    5:"Sat",
    6:"Sun"
}

$(document).ready(function() {
    var lastClicked = null;
    $('#info-body').click(function() {
        // Only allow closing the info pane via click on larger screens
        if ($(window).width() >= 992) {
            $(this).slideUp(350);
        } 
    });
    $('#info-close').click(function() {
        $('#info-body').slideUp(350);
    });
    // Displays more info about a restaurant on-click
    $(document).on('click', '.grid-box', function() {
        // If the user clicks on the same box twice it will close the info menu
        grid_id = $(this).attr('id');
        if (lastClicked == grid_id){
            $('#info-body').slideToggle(300)
        }
        else {
            // Empty the schedule before sliding down in case the new
            // schedule is shorter
            $('#info-schedule').empty();
            $('#info-body').slideDown(300);
            lastClicked = grid_id;
        }
        // Search though the restaurnts object to find the selected restaurant's info
        var restaurant;
        $.each(restaurants, function(idx, restaurant_i) { 
            if (restaurant_i.id == grid_id) {
                restaurant = restaurant_i;
                return false;
            }
        });
        // Display restaurant info in the info-body
        $('#info-name').text(restaurant.name);
        if (restaurant.open){
            $('#info-status').html('<b>Status:</b>  Open');
            var closing = Date.parse(restaurant.current.end_time);
            // Print the time the restaurant closes in local format with the seconds removed via regex
            $('#info-next').html('<b>Open Till:</b> ' + closing.toLocaleTimeString().replace(/(\d+:\d{2})(:\d+ )/, "$1 "));
        }
        else {
            $('#info-status').html('<b>Status:</b>  Closed');
            $('#info-next').html("");
        }
        // Display all open times for the main schedule 
        var open_times = restaurant.main_schedule.open_times;
        var element = '';
        $('#info-schedule').empty();
        for(var i = 0; i < open_times.length; i++){
            if (!compareTimes(open_times[i], open_times[i-1])){
                element += '<div class="col-md-3"><b>';
            }
            if (!compareTimes(open_times[i], open_times[i-1]) &&
                // Add: "StartDay - " 
                compareTimes(open_times[i], open_times[i+1])){
                element += days[open_times[i].start_day] + ' - ';
            }
            if (!compareTimes(open_times[i], open_times[i+1])){
                // Add "EndDay: OpenTime - CloseTime"
                opening = Date.parse(open_times[i].start_time);
                closing = Date.parse(open_times[i].end_time);
                element += days[open_times[i].start_day] + '</b>: ' + 
                opening.toLocaleTimeString().replace(/(\d+:\d{2})(:\d+ )/, "$1 ") + ' - ' + 
                closing.toLocaleTimeString().replace(/(\d+:\d{2})(:\d+ )/, "$1 ") + '</div>';
                $("#info-schedule").append(element);
                element = '';
            }
        }
    });
});