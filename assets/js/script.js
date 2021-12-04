let jumbotronEl = $('.jumbotron');
let currentDayEl = $('#currentDay');
let containerEl = $('.container');
let contentEl = $('#input');
let saveEl = $('.saveBtn');
containerEl.addClass('col row justify-content-center');

/*Using Moment.js, we grab the current date and put it on the jumbotron,
we set current time to the current hour only */
currentDayEl.text(moment().format('dddd MMMM DD, YYYY'));
let currentHour = moment().format('HH');


/*These will be the timeslots on the planner. The text will show on the planner,
the value will be used to compare against the current time*/
const weeklyPlanEl = [
    { value:'09', text: '9AM',},
    { value:'10', text: '10AM',},
    { value:'11', text: '11AM',},
    { value:'12', text: '12PM',},
    { value:'13', text: '1PM',},
    { value:'14', text: '2PM',},
    { value:'15', text: '3PM',},
    { value:'16', text: '4PM',},
    { value:'17', text: '5PM',},    
];
/*Using a for loop, we create the weekly planner and append it to the page,
For every object in the weeklyPlanEl array, we create a row with the hour, 
a text area, and a save button.*/
for (let i = 0; i < weeklyPlanEl.length; i++) {
    /*Dynamically create the timeblocks for the planner */
    let hourEl = $('<li>');
    hourEl.text(weeklyPlanEl[i].text);
    hourEl.attr('value', "row " + i);
    hourEl.addClass('hour col-1');    
    hourEl.css({'list-style-type': 'none', 'font-weight': 'bold'});
    let contentEl = $('<input>');
    contentEl.attr('type', 'text');
    contentEl.attr('id', 'input' + [i]);
    /*Get the info saved in local storage, set equal to data*/
    let data = (localStorage.getItem(i + 'userInput'));
    /*Set the value of the input box equal to the data, which we recieve from local storage*/
    contentEl.attr('value', data);
    console.log(contentEl);
    contentEl.addClass('time-block description col-10');
    contentEl.css({'border-top': '1px solid black'});  
    /*Dynamically create the save button for the timeblocks*/
    let saveEl = $('<button>Save</button>');
    saveEl.addClass('saveBtn row col-1');
    saveEl.addClass('save ' + [i]);
    /*Append the hour, input, and save button to the container*/
    containerEl.append(hourEl);
    containerEl.append(contentEl);
    containerEl.append(saveEl);    
    /*When the save button is clicked, save the input of the content box to local storage*/
    saveEl.on('click', function(event) {
        localStorage.setItem(i + 'userInput', contentEl.val());
    })

    /*We style the planner based on whether an hour is in the past, present, or future
    We do so using a 24 hr clock and comparing it to the value of the object in the
    current weeklyPlanEl array */
    if (currentHour < weeklyPlanEl[i].value) {
        contentEl.addClass('future');
    } else if (currentHour > weeklyPlanEl[i].value) {
        contentEl.addClass('past');
    } else {
        contentEl.addClass('present');
    }
};