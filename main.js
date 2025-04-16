var currentChance = 1;
document.addEventListener("DOMContentLoaded", function() {
    reset();
  });
function reset()
{
	currentChance = 1;
	resetForm();
	document.querySelector('.oneIn').textContent = "Add one or more traits to see your uniqueness";
	document.querySelector('.onceEvery').textContent = "Add one or more traits to see how often someone like you comes about";
	document.querySelector('.tip').textContent = "";
	document.querySelector('.share').innerHTML = "";
	document.querySelector('.traits ul').innerHTML = "";
}
function resetForm()
{
	document.getElementsByName('name')[0].value = "Enjoys playing football";
	document.getElementsByName('percent')[0].value = "10";
}
function addTrait()
{
	const traitName = document.getElementsByName('name')[0].value;
	const traitPercent = parseFloat(document.getElementsByName('percent')[0].value);
	const ul = document.querySelector('.traits ul');
	const li = document.createElement('li');
	li.innerHTML = `${escapeHTML(traitName)}: <b>${traitPercent}%</b>`;
	ul.appendChild(li);
	currentChance = currentChance * (traitPercent / 100);
	document.querySelector('.oneIn').textContent = oneIn();
	document.querySelector('.onceEvery').textContent = onceEvery();
	document.querySelector('.tip').innerHTML = "Keep going! Add more traits to show how unique you really are! :)";
	document.querySelector('.share').innerHTML = '<button id="fb-share-btn">Share your uniqueness on Facebook</button>';
	resetForm();
	document.getElementById('fb-share-btn').addEventListener('click', function() {
	    var uniquenessText = document.querySelector('.oneIn').textContent;
	    var pageUrl = window.location.href;
	    var fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl) +
	                     '&quote=' + encodeURIComponent(uniquenessText);
	    window.open(fbShareUrl, '_blank', 'width=600,height=400');
	});	
}
function oneIn()
{
	return "So far you are 1 in " + Math.round(1 / currentChance).toLocaleString('en-US') + " people";
}
function onceEvery()
{
	var ret = "Someone like you only comes around once every ";
	var aveAge = 80;
	var popu = 8000000000;
	var peopleBornPerYear = popu / aveAge;
	var yearsPerPeopleLikeYou = 1 / (currentChance * peopleBornPerYear);
	var monthsPerPeopleLikeYou = yearsPerPeopleLikeYou * 12;
	var daysPerPeopleLikeYou = yearsPerPeopleLikeYou * 365.24;
	var hoursPerPeopleLikeYou = daysPerPeopleLikeYou * 24;
	var minutesPerPeopleLikeYou = hoursPerPeopleLikeYou * 60;
	var secondsPerPeopleLikeYou = minutesPerPeopleLikeYou * 60;
	if (yearsPerPeopleLikeYou > 10)
	{
		return ret + formatFrequency(yearsPerPeopleLikeYou, "years");		
	}
	else if (monthsPerPeopleLikeYou > 10)
	{
		return ret + formatFrequency(monthsPerPeopleLikeYou, "months");
	}
	else if (daysPerPeopleLikeYou > 10)
	{
		return ret + formatFrequency(daysPerPeopleLikeYou, "days");
	}
	else if (hoursPerPeopleLikeYou > 10)
	{
		return ret + formatFrequency(hoursPerPeopleLikeYou, "hours");
	}
	else if (minutesPerPeopleLikeYou > 10)
	{
		return ret + formatFrequency(minutesPerPeopleLikeYou, "minutes");
	}
	else 
	{
		return ret + formatFrequency(secondsPerPeopleLikeYou, " seconds");
	}
}
function formatFrequency(num, unit)
{
	return Number(num.toFixed(1)).toLocaleString("en-US") + " " + unit;
}
function escapeHTML(str) {
    return str.replace(/[&<>"'`=\/]/g, function(s) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#96;',
            '=': '&#61;',
            '/': '&#47;'
        })[s];
    });
}