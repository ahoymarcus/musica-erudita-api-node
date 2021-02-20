const musicSheets = [
	{
		id: 1,
		sheet: "O termo Ópera vem do latim Opus ou trabalho.",
		author: "",
		year: "",
		ref: "https://www.sticanada.com/blog/30-little-known-facts-about-opera"
	},
		{
		id: 2,
		sheet: "Cantores de ópera podem projetar suas vozes acima de toda orquestra, porque as suas frequeências de canto são diferenciadas.",
		author: "",
		year: "",
		ref: "https://www.sticanada.com/blog/30-little-known-facts-about-opera"
	},
		{
		id: 3,
		sheet: "Em certo momento da vida do compositor Wagner, havia o pensamento de que ele reprovava aplausos ao final dos atos de suas peças. Tudo mudou quando frustado pela falta de interação da platéia Wagner grita 'Bravo!' ao final do 2º ato da obra Parsifal.",
		author: "",
		year: "",
		ref: "https://www.sticanada.com/blog/30-little-known-facts-about-opera"
	},
		{
		id: 4,
		sheet: "Apesar da obra 'Madama Butterfly' de Puccini ser uma das mais adoradas óperas da história, em seu tempo ela foi considerada uma das piores operas de todos os tempos. Membros da audiênica chegavam a emitir sons de pássaros, gado e bodes, além de vairem constantemente!",
		author: "",
		year: "",
		ref: "https://www.sticanada.com/blog/30-little-known-facts-about-opera"
	},
		{
		id: 5,
		sheet: "A primeira casa pública de ópera foi aberta em Veneza em 1637, por Claudio Montiverdi, tendo sido ele também um influenciador na mudança de sentido das composições de óperas de uma estrutura mais baseada em diálogos, para outra mais baseada na musicalidade.",
		author: "",
		year: "",
		ref: "https://www.sticanada.com/blog/30-little-known-facts-about-opera"
	}
];


// Aqui exportamos apenas o pedaço de código desejado de maneira global
exports.getMusicSheet = () => {
	const idx = Math.floor(Math.random() * musicSheets.length);
	return musicSheets[idx];
}
