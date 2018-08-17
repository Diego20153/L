function ResetTime(){

	clearInterval(cronometer);
}

function StarTime(){

	seconds=0;
	
	s = document.getElementById("seconds");

	m = document.getElementById("minutes");

	cronometer = setInterval(function(){

		seconds++;

		secs = seconds;

		mins = 0;

		while(secs>=60){
			mins++;
			secs-=60;
		}
		
		secs < 10 ? s.innerHTML = "0" + secs: s.innerHTML = secs;

		mins < 10 ? m.innerHTML = "0" + mins : m.innerHTML = mins;



		s.innerHTML = secs;

		m.innerHTML = mins;

		Total_secs = secs;

		Total_mins = mins;

	},1000);

}