window.onload = function() {
	var iframe = document.getElementById("my-iframe");
	if (window.innerWidth <= 768) {
		iframe.style.height = "300px";
	}
	else {
		iframe.style.height = "400px";
	}
};
