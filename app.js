const setInputFilter = (textbox, inputFilter) => {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
		textbox.addEventListener(event, function() {
		if (inputFilter(this.value)) {
			this.oldValue = this.value;
			this.oldSelectionStart = this.selectionStart;
			this.oldSelectionEnd = this.selectionEnd;
		} else if (this.hasOwnProperty("oldValue")) {
			this.value = this.oldValue;
			this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
		} else {
			this.value = "";
		}
		});
	});
}

const izracunRada = () => {
	const BROJ_SATI_DNEVNO = 24;
	const BROJ_RADNIH_SATI_DNEVNO = 8;
	const izracun = {
		neto: document.getElementById("neto").value,
		dani: document.getElementById("dani").value,
		iznos: document.getElementById("iznos").value,
	};
	const brojSatiRada = izracun.iznos / (izracun.neto / (izracun.dani * BROJ_RADNIH_SATI_DNEVNO)) / BROJ_RADNIH_SATI_DNEVNO * BROJ_SATI_DNEVNO;
	
	const konacniIzracun = brojSatiRada <= 8
		? `Potreban broj sati rada za željeni iznos novaca: ${brojSatiRada}`
		: formatiraj(brojSatiRada);

	document.getElementById("result").innerHTML = konacniIzracun;
	
}

const formatiraj = (brojSatiRada) => {
    const dani = Math.floor(brojSatiRada / 24);
    const ostatak = brojSatiRada % 24;
    const sati = Math.floor(ostatak);
    return(`Potreban broj dana: ${dani} i sati: ${sati} za željeni iznos novaca`);
}


setInputFilter(document.getElementById("dani"), value => /^\d*$/.test(value));
setInputFilter(document.getElementById("neto"), value => /^-?\d*[.,]?\d{0,2}$/.test(value));
setInputFilter(document.getElementById("iznos"), value => /^-?\d*[.,]?\d{0,2}$/.test(value));