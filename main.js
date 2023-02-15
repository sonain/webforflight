/* new button */
document.querySelector("button[type='reset']").addEventListener("click", function() {
    const inputs = document.querySelectorAll("input[type='tel'], input[type='number'], input[type='radio']");
    inputs.forEach(input => {
    if (input.type === "radio") {
        input.checked = false;
    } else {
        input.value = "";
    }
    });

    let elements = [
    "timeForm",
    "threeResult",
    "three",
    "fourResult",
    "leg",
    "localTimeResult",
    "fahrenheitResult",
    "time-difference-1",
    "time-difference-2",
    "fuel-difference",
    ];
    elements.forEach(function(element) {
    document.getElementById(element).style.display = "none";
    });
});

/* dark mode */
var button = document.getElementById("toggle-dark-mode");
        button.addEventListener("click", function () {
        document.body.classList.toggle("dark");
    });

/* for slplit , ETA buttons */ 
let totalMinutes;
let teamA;
let teamB;
function threeCrew() {
    //display threeResult &
    document.getElementById("three").style.display = "block";
    document.getElementById("leg").style.display = "none";
    document.getElementById("fourResult").style.display = "none";
    document.getElementById("timeForm").style.display = "none";
    // split Time
    let resultElement = document.getElementById("threeResult");
    resultElement.style.display = "";
    // Get time from form
    var time = document.querySelector('#flight-time').value;
    var takeoffTime = document.querySelector('#takeoff-time').value;


    // Convert time to minutes
    var hours = Math.floor(time / 100);
    var minutes = time % 100;
    totalMinutes = hours * 60 + minutes;
    var takeoffHours = Math.floor(takeoffTime / 100);
    var takeoffMinutes = takeoffTime % 100;
    var totalTakeoffMinutes = takeoffHours * 60 + takeoffMinutes;

    // Split time 4/6 for each pilot
    let eachCrew = totalMinutes / (3/2);
    let eachCrewHours = Math.floor(eachCrew / 60);
    let eachCrewMinutes = Math.round(eachCrew % 60);
    // each Box time
    let eachBox = totalMinutes / 6;
    let eachBoxHours = Math.floor(eachBox / 60);
    let eachBoxMinutes = Math.round(eachBox % 60);
    // Display results
    document.querySelector('#threeResult').innerHTML ="each crew " + eachCrewHours + "h " +eachCrewMinutes + "m" ;
    
    for (let i = 1; i <= 6; i++) {
        let boxId = "box" + i;
        let boxMinutes = eachBoxMinutes + eachBox * (i - 1);
        let boxHours = eachBoxHours + Math.floor(boxMinutes / 60);
        boxMinutes = Math.round(boxMinutes % 60);
        let totalBoxMinutes = boxMinutes + takeoffMinutes + 60 * (boxHours + takeoffHours);
        let totalBoxHours = Math.floor(totalBoxMinutes / 60);
        totalBoxMinutes = totalBoxMinutes % 60;
        document.getElementById(boxId).innerHTML ='~' + totalBoxHours + ':' + (totalBoxMinutes < 10 ? "0" + (totalBoxMinutes) : (totalBoxMinutes));
    }
}

// select boxes to dark
const tableCells = document.querySelectorAll('.selectBox td');
tableCells.forEach(cell => {
  cell.addEventListener('click', function() {
    this.classList.toggle('selected');
  });
});

function fourCrew() {
    //display fourResult &the leg
    document.getElementById("leg").style.display = "block";
    document.getElementById("three").style.display = "none";
    document.getElementById("threeResult").style.display = "none";
    // split Time
    let resultElement = document.getElementById("fourResult");
    resultElement.style.display = "";
    // Get time from form
    var time = document.querySelector('#flight-time').value;

    // Convert time to minutes
    var hours = Math.floor(time / 100);
    var minutes = time % 100;
    totalMinutes = hours * 60 + minutes;

    // Split time evenly between team A and team B
    var halfMinutes = Math.floor(totalMinutes / 2);
    teamA = halfMinutes;
    teamB = totalMinutes - halfMinutes;

    // Convert time back to hhmm format
    var teamAHours = Math.floor(teamA / 60);
    var teamAMinutes = teamA % 60;
    var teamBHours = Math.floor(teamB / 60);
    var teamBMinutes = teamB % 60;

    // Display results
    document.querySelector('#fourResult').innerHTML ="team A&B each " + teamAHours + "h " + teamAMinutes + "m" ;
}

// function eta() {
//     // Get takeoff time from form
//     var takeoff = document.querySelector('#takeoff-time').value;
//     var time = document.querySelector('#flight-time').value;

//     // Convert takeoff time to minutes
//     var takeoffHours = Math.floor(takeoff / 100);
//     var takeoffMinutes = takeoff % 100;
//     var takeoffTotalMinutes = takeoffHours * 60 + takeoffMinutes;

//     // Convert flight time to minutes
//     var hours = Math.floor(time / 100);
//     var minutes = time % 100;
//     flightTimeTotalMinutes = hours * 60 + minutes;

//     // Add flight time to takeoff time
//     var etaTotalMinutes = takeoffTotalMinutes + flightTimeTotalMinutes;

//     // Convert ETA time back to hhmm format
//     var etaHours = Math.floor(etaTotalMinutes / 60);
//     var etaMinutes = etaTotalMinutes % 60;

//     // Display ETA time in hhmm format
//     document.getElementById("eta").style.display = "block";
//     document.querySelector('#eta').innerHTML = "ETA : " + (etaHours < 10 ? "0" + etaHours : etaHours) + (etaMinutes < 10 ? "0" + etaMinutes : etaMinutes) + "z";
// }

/* leg */
function toggle(legInputs) {
    // 시간을 나눌 단위
    var rangeMin = totalMinutes / legInputs;
    let teamACount = Math.floor(legInputs / 2) + 1;
    let teamBCount = legInputs - teamACount;
    let teamARange = teamA / teamACount;
    let teamBRange = teamB / teamBCount;

    let timeFormElement = document.getElementById("timeForm");
    timeFormElement.style.display = "";

    const timeInputsElement = document.getElementById("timeInputs");
    timeInputsElement.innerHTML = "";
for (let i = 1; i <= legInputs; i++) {
        
    let inputValue;
    //odd for teamA, even for teamB
    //evenly distributed
    let isTeamA = i % 2 == 1;
    if (isTeamA) {
        //teamA
        inputValue = teamARange
    } else {
        inputValue = teamBRange
    }
    //variable for disabling range for last range of each team
    let disableString = ""
    if (i == legInputs || i == legInputs - 1) {
        disableString = "disabled"
    }

    //value to be assigned to the input
    timeInputsElement.innerHTML += `
    <div class="line">
    <label for="leg${i}">Leg${i}</label>
    <button id="decrement${i}" class="step" onclick="decrementValue(${i})">-</button>
    <input type="range" id="leg${i}" name="leg${i}" style="width:50%;" value="${inputValue}" min="0" max="${teamA}" step="1" oninput="updateTime(${i})" ${disableString}>
    <button id="increment${i}" class="step" onclick="incrementValue(${i})">+</button>
    <label id="legLabel${i}"></label>
    </div> 
    <div class="shift">
    <br>
    <label id="legRange${i}" class="shiftZ"></label>
    <label id="kst${i}" class="shiftKst"></label>
    </div>
    `;
    updateTime(i)
}
    const leg1 = document.getElementById('leg1')
    const leg2 = document.getElementById('leg2')
    const leg3 = document.getElementById('leg3')
    const leg4 = document.getElementById('leg4')
    const leg5 = document.getElementById('leg5')

    leg1.addEventListener("input", e => {
        var leg5Value = leg5 ? leg5.value : 0;
        leg3.value = teamA - leg5Value - e.target.value;
        updateTime(3);
        if (leg3.value <= 0) {
            leg1.setAttribute("disabled", "true");
        }
    })

    ////////// for the legRange
    /* 간결하게 시도해본 것.
    const legRanges = [
    document.getElementById("legRange1"),
    document.getElementById("legRange2"),
    document.getElementById("legRange3"),
    document.getElementById("legRange4"),
    document.getElementById("legRange5")
    ];
    const leg = [
    document.getElementById("leg1"),
    document.getElementById("leg2"),
    document.getElementById("leg3"),
    document.getElementById("leg4"),
    document.getElementById("leg5")
    ];
    const takeoffTime = document.getElementById("takeoff-time");
    
    leg[0].addEventListener("input", function(event) {
    var totalTakeoffMinutes = (takeoffTime.value % 100) + (Math.floor(takeoffTime.value / 100) * 60);
    var shift = totalTakeoffMinutes + parseInt(event.target.value);
    var shiftHours = Math.floor(shift / 60);
    var shiftMinutes = shift % 60;
    legRanges[0].textContent = parseInt(shiftHours) + ":" + parseInt(shiftMinutes);
    for (var i = 1; i < leg.length; i++) {
    shift += parseInt(leg[i].value);
    var shiftHours = Math.floor(shift / 60);
    var shiftMinutes = shift % 60;
    legRanges[i].textContent = parseInt(shiftHours) + ":" + parseInt(shiftMinutes);
    }
    });
    */
    const legRange1 = document.getElementById(`legRange1`);
    const legRange2 = document.getElementById(`legRange2`);
    const legRange3 = document.getElementById(`legRange3`);
    const legRange4 = document.getElementById(`legRange4`);
    const legRange5 = document.getElementById(`legRange5`);

    leg1.addEventListener("input", f => {
        var leg4Value = leg4 ? leg4.value : 0;
        var leg5Value = leg5 ? leg5.value : 0;
        const takeoffTime = document.getElementById('takeoff-time').value;
        // Convert time to minutes
        var takeoffHours = Math.floor(takeoffTime / 100);
        var takeoffMinutes = takeoffTime % 100;
        var totalTakeoffMinutes = takeoffHours * 60 + takeoffMinutes;
        // Convert time back to hhmm format
        var shift1 = totalTakeoffMinutes + parseInt(f.target.value);
        var shift1Hours = Math.floor(shift1 / 60);
        var shift1Minutes = shift1 % 60;

        var shift2 = shift1 + parseInt(leg2.value);
        var shift2Hours = Math.floor(shift2 / 60);
        var shift2Minutes = shift2 % 60;

        var shift3 = shift2 + parseInt(leg3.value);
        var shift3Hours = Math.floor(shift3 / 60);
        var shift3Minutes = shift3 % 60;

        var shift4 = shift3 + parseInt(leg4Value);
        var shift4Hours = Math.floor(shift4 / 60);
        var shift4Minutes = shift4 % 60;

        var shift5 = shift4 + parseInt(leg5Value);
        var shift5Hours = Math.floor(shift5 / 60);
        var shift5Minutes = shift5 % 60;

        legRange1.textContent = (shift1Hours < 10 ? '0' : '') + shift1Hours + ':' + (shift1Minutes < 10 ? '0' : '') + shift1Minutes + 'z';
        legRange2.textContent = (shift2Hours < 10 ? '0' : '') + shift2Hours + ':' + (shift2Minutes < 10 ? '0' : '') + shift2Minutes + 'z';
        legRange3.textContent = (shift3Hours < 10 ? '0' : '') + shift3Hours + ':' + (shift3Minutes < 10 ? '0' : '') + shift3Minutes + 'z';
        legRange4.textContent = (shift4Hours < 10 ? '0' : '') + shift4Hours + ':' + (shift4Minutes < 10 ? '0' : '') + shift4Minutes + 'z';
        legRange5.textContent = (shift5Hours < 10 ? '0' : '') + shift5Hours + ':' + (shift5Minutes < 10 ? '0' : '') + shift5Minutes + 'z';
    })

    leg2.addEventListener("input", f => {
        const takeoffTime = document.getElementById('takeoff-time').value;
        // Convert time to minutes
        var takeoffHours = Math.floor(takeoffTime / 100);
        var takeoffMinutes = takeoffTime % 100;
        var totalTakeoffMinutes = takeoffHours * 60 + takeoffMinutes;
        // Convert time back to hhmm format
        var shift2 = totalTakeoffMinutes + parseInt(f.target.value) + parseInt(leg1.value);
        var shift2Hours = Math.floor(shift2 / 60);
        var shift2Minutes = shift2 % 60;

        var shift3 = shift2 + parseInt(leg3.value);
        var shift3Hours = Math.floor(shift3 / 60);
        var shift3Minutes = shift3 % 60;


        legRange2.textContent = (shift2Hours < 10 ? '0' : '') + shift2Hours + ':' + (shift2Minutes < 10 ? '0' : '') + shift2Minutes + 'z';
        legRange3.textContent = (shift3Hours < 10 ? '0' : '') + shift3Hours + ':' + (shift3Minutes < 10 ? '0' : '') + shift3Minutes + 'z';
        })

    leg3.addEventListener("input", f => {
        const takeoffTime = document.getElementById('takeoff-time').value;
        // Convert time to minutes
        var takeoffHours = Math.floor(takeoffTime / 100);
        var takeoffMinutes = takeoffTime % 100;
        var totalTakeoffMinutes = takeoffHours * 60 + takeoffMinutes;
        // Convert time back to hhmm format
        var shift3 = totalTakeoffMinutes + parseInt(f.target.value) + parseInt(leg1.value) + parseInt(leg2.value);
        var shift3Hours = Math.floor(shift3 / 60);
        var shift3Minutes = shift3 % 60;

        var shift4 = shift3 + parseInt(leg4.value);
        var shift4Hours = Math.floor(shift4 / 60);
        var shift4Minutes = shift4 % 60;

        legRange3.textContent = (shift3Hours < 10 ? '0' : '') + shift3Hours + ':' + (shift3Minutes < 10 ? '0' : '') + shift3Minutes + 'z';
        legRange4.textContent = (shift4Hours < 10 ? '0' : '') + shift4Hours + ':' + (shift4Minutes < 10 ? '0' : '') + shift4Minutes + 'z';
    })
    // // for the kstRange
    // const kst1 = document.getElementById(`kst1`);
    // const kst2 = document.getElementById(`kst2`);
    // const kst3 = document.getElementById(`kst3`);
    // const kst4 = document.getElementById(`kst4`);
    // const kst5 = document.getElementById(`kst5`);

    // leg1.addEventListener("input", f => {
    //     var leg4Value = leg4 ? leg4.value : 0;
    //     var leg5Value = leg5 ? leg5.value : 0;
    //     const takeoffTime = document.getElementById('takeoff-time').value;
    //     // Convert time to minutes
    //     const totalTakeoffMinutes = (takeoffTime % 100) + (Math.floor(takeoffTime / 100) * 60) + 540;
    //     // Convert time back to hhmm format
    //     var shift1 = totalTakeoffMinutes + parseInt(f.target.value);
    //     var shift1Hours = Math.floor(shift1 / 60);
    //     var shift1Minutes = shift1 % 60;

    //     var shift2 = shift1 + parseInt(leg2.value);
    //     var shift2Hours = Math.floor(shift2 / 60);
    //     var shift2Minutes = shift2 % 60;

    //     var shift3 = shift2 + parseInt(leg3.value);
    //     var shift3Hours = Math.floor(shift3 / 60);
    //     var shift3Minutes = shift3 % 60;

    //     var shift4 = shift3 + parseInt(leg4Value);
    //     var shift4Hours = Math.floor(shift4 / 60);
    //     var shift4Minutes = shift4 % 60;

    //     var shift5 = shift4 + parseInt(leg5Value);
    //     var shift5Hours = Math.floor(shift5 / 60);
    //     var shift5Minutes = shift5 % 60;

    //     kst1.textContent = (shift1Hours < 10 ? '0' : '') + shift1Hours + ':' + (shift1Minutes < 10 ? '0' : '') + shift1Minutes + 'kst';
    //     kst2.textContent = (shift2Hours < 10 ? '0' : '') + shift2Hours + ':' + (shift2Minutes < 10 ? '0' : '') + shift2Minutes + 'kst';
    //     kst3.textContent = (shift3Hours < 10 ? '0' : '') + shift3Hours + ':' + (shift3Minutes < 10 ? '0' : '') + shift3Minutes + 'kst';
    //     kst4.textContent = (shift4Hours < 10 ? '0' : '') + shift4Hours + ':' + (shift4Minutes < 10 ? '0' : '') + shift4Minutes + 'kst';
    //     kst5.textContent = (shift5Hours < 10 ? '0' : '') + shift5Hours + ':' + (shift5Minutes < 10 ? '0' : '') + shift5Minutes + 'kst';
    // })

    // leg2.addEventListener("input", f => {
    //     const takeoffTime = document.getElementById('takeoff-time').value;
    //     // Convert time to minutes
    //     var takeoffHours = Math.floor(takeoffTime / 100);
    //     var takeoffMinutes = takeoffTime % 100;
    //     var totalTakeoffMinutes = takeoffHours * 60 + takeoffMinutes + 540;
    //     // Convert time back to hhmm format
    //     var shift2 = totalTakeoffMinutes + parseInt(f.target.value) + parseInt(leg1.value);
    //     var shift2Hours = Math.floor(shift2 / 60);
    //     var shift2Minutes = shift2 % 60;

    //     var shift3 = shift2 + parseInt(leg3.value);
    //     var shift3Hours = Math.floor(shift3 / 60);
    //     var shift3Minutes = shift3 % 60;

    //     kst2.textContent = (shift2Hours < 10 ? '0' : '') + shift2Hours + ':' + (shift2Minutes < 10 ? '0' : '') + shift2Minutes + 'kst';
    //     kst3.textContent = (shift3Hours < 10 ? '0' : '') + shift3Hours + ':' + (shift3Minutes < 10 ? '0' : '') + shift3Minutes + 'kst';
    // })

    // leg3.addEventListener("input", f => {
    //     const takeoffTime = document.getElementById('takeoff-time').value;
    //     // Convert time to minutes
    //     var takeoffHours = Math.floor(takeoffTime / 100);
    //     var takeoffMinutes = takeoffTime % 100;
    //     var totalTakeoffMinutes = takeoffHours * 60 + takeoffMinutes + 540;
    //     // Convert time back to hhmm format
    //     var shift3 = totalTakeoffMinutes + parseInt(f.target.value) + parseInt(leg1.value) + parseInt(leg2.value);
    //     var shift3Hours = Math.floor(shift3 / 60);
    //     var shift3Minutes = shift3 % 60;

    //     var shift4 = shift3 + parseInt(leg4.value);
    //     var shift4Hours = Math.floor(shift4 / 60);
    //     var shift4Minutes = shift4 % 60;

    //     kst3.textContent = (shift3Hours < 10 ? '0' : '') + shift3Hours + ':' + (shift3Minutes < 10 ? '0' : '') + shift3Minutes + 'kst';
    //     kst4.textContent = (shift4Hours < 10 ? '0' : '') + shift4Hours + ':' + (shift4Minutes < 10 ? '0' : '') + shift4Minutes + 'kst';
    // })
    // // for the kstRange
    ////////// for the legRange

    leg2.addEventListener("input", e => {
        leg4.value = teamB - e.target.value;
        updateTime(4);
    })

    leg3.addEventListener("input", e => {
        leg5.value = teamA - leg1.value - e.target.value;
        updateTime(5);
        if (leg5.value <= 0) {
            leg3.setAttribute("disabled", "true");
        }
    })

    leg4.addEventListener("input", e => {
        leg2.value = teamB - e.target.value;
        updateTime(2);
    })

    leg5.addEventListener("input", e => {
        ;
        updateTime(1);
    })
}

function updateTime(leg) {
    const inputElement = document.getElementById(`leg${leg}`);
    const labelElement = document.getElementById(`legLabel${leg}`);
    const hours = Math.floor(inputElement.value / 60);
    const minutes = inputElement.value % 60;
    labelElement.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

function decrementValue(idx) {
    let input = document.getElementById(`leg${idx}`);
    if (!input.disabled) {
    input.value = parseInt(input.value) - 1;
    updateTime(idx);
    document.getElementById(`leg${idx}`).dispatchEvent(new Event("input"));
    }
}

function incrementValue(idx) {
    let input = document.getElementById(`leg${idx}`);
    if (!input.disabled) {
    input.value = parseInt(input.value) + 1;
    updateTime(idx);
    document.getElementById(`leg${idx}`).dispatchEvent(new Event("input"));
    }
}

/* PA */
const convertBtn = document.getElementById('convertBtn');
convertBtn.addEventListener('click', function() {
const utcTime = document.getElementById('utcTime').value || "0000";
const offset = document.getElementById('offset').value || 0;
const utcHours = parseInt(utcTime.substr(0, 2), 10);
const utcMinutes = parseInt(utcTime.substr(2), 10);
let utcTotalMinutes = (utcHours * 60 + utcMinutes + offset * 60 + 1440) % 1440;
let localHour = Math.floor(utcTotalMinutes / 60);
let localMinute = utcTotalMinutes % 60;
localHour = localHour < 10 ? '0' + localHour : localHour;
localMinute = localMinute < 10 ? '0' + localMinute : localMinute;
const localTime = localHour + '' + localMinute;
document.getElementById("localTimeResult").style.display = "block";
document.getElementById('localTimeResult').innerHTML = localTime + "L";
});

convertBtn.addEventListener('click', function() {
const celsius = document.getElementById('celsius').value;
const fahrenheit = (celsius * 9 / 5) + 32;
document.getElementById("fahrenheitResult").style.display = "block";
document.getElementById('fahrenheitResult').innerHTML = fahrenheit + "℉" ;
});

/* flight log */
function calculateTimeDifference(column) {
    // Get the start and end time for the specified column
    let startTime = document.getElementById(`start-time-${column}`).value || "0000";
    let endTime = document.getElementById(`end-time-${column}`).value || "0000";

    // If the time is entered in the form "hhmm", add a colon
    if (startTime.length === 4) {
        startTime = startTime.slice(0, 2) + ":" + startTime.slice(2);
    }
    if (endTime.length === 4) {
        endTime = endTime.slice(0, 2) + ":" + endTime.slice(2);
    }

    // Split the start and end times into hours and minutes
    const startHours = parseInt(startTime.split(":")[0]) || 0;
    const startMinutes = parseInt(startTime.split(":")[1]) || 0;
    const endHours = parseInt(endTime.split(":")[0]) || 0;
    const endMinutes = parseInt(endTime.split(":")[1]) || 0;

    // Calculate the difference in hours
    let timeDifferenceHours = endHours - startHours;

    // Calculate the difference in minutes
    let timeDifferenceMinutes = endMinutes - startMinutes;

    // If the difference in minutes is negative, adjust the difference in hours
    if (timeDifferenceMinutes < 0) {
        timeDifferenceHours--;
        timeDifferenceMinutes += 60;
    }

    // If the difference in hours is negative, adjust it to be more than 24 hours
    if (timeDifferenceHours < 0) {
        timeDifferenceHours += 24;
    }

    // Display the time difference
    document.getElementById(`time-difference-${column}`).innerHTML = `${timeDifferenceHours}:${timeDifferenceMinutes.toString().padStart(2, "0")}`;
    document.getElementById(`time-difference-${column}`).style.display = "";
}


function calculateFuelDifference() {
    // Get the values from the input fields
    let startFuel = document.getElementById("start-fuel").value;
    let endFuel = document.getElementById("end-fuel").value;

    // Calculate the difference between the values
    let fuelDifference = startFuel - endFuel;

    // Display the difference in the table
    document.getElementById("fuel-difference").innerHTML = fuelDifference;
    document.getElementById("fuel-difference").style.display = "";
}

