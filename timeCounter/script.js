const endDate = new Date("24 Mar, 2025 22:35:00").getTime();
const startDate = new Date().getTime();



let x = setInterval(function updateTimer(){
    const now = new Date().getTime();

    const distanceCovered = now - startDate;
    //the time overed is in time -> milliseconds
    const distancepending = endDate - now;

    //calculate days,min,hrs,secs;
    //1day = 24*60*60*1000ms
    const days = Math.floor(distancepending/(24*60*60*1000));
    const hrs = Math.floor(distancepending % (24*60*60*1000) / (60*60*1000));
    const mins = Math.floor(distancepending % (60*60*1000)/(60*1000));
    const secs = Math.floor(distancepending %(60*1000)/(1000));

    // populate in the UI
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hrs;
    document.getElementById("minutes").innerHTML = mins;
    document.getElementById("seconds").innerHTML = secs;

    // calculate width percentage for the progress bar
    const totalDistance = endDate - startDate;
    const percentageDistance = (distanceCovered/totalDistance)*100;

    document.getElementById("progress-bar").style.width = percentageDistance + "%";

    if(distancepending < 0){
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
        document.getElementById("progress-bar").style.width = "100%";
    }
},1000);
