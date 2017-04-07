$(function() {

function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function Column(name) {
    var self = this; // przyda się dla funkcji zagnieżdżonych

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
// TWORZENIE ELEMENTÓW SKŁADOWYCH KOLUMNY
  	var $column = $('<div>').addClass('column'),
  		$columnTitle = $('<h2>').addClass('column-title').text(self.name),
  		$columnCardList = $('<ul>').addClass('column-list'),
  		$columnDelete = $('<button>').addClass('btn-delete').text('x'),
  		$columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

// PODPINANIE ODPOWIEDNICH ZDARZEŃ
	$columnDelete.click(function() {
    	self.removeColumn();
	});
  	$columnAddCard.click(function(event) {
    	self.addCard(new Card(prompt("Wpisz nazwę karty")));
  	});

// KONSTRUOWANIE ELEMENTU KOLUMNY
  	$column.append($columnTitle)
    	.append($columnDelete)
    	.append($columnAddCard)
    	.append($columnCardList);

// ZWRACANIE STWORZONEJ  KOLUMNY
  	return $column;
	}

}

Column.prototype = {
    addCard: function(card) {
      	this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      	this.$element.remove();
    }
};

function Card(description) {
	var self = this;

	this.id = randomString();
	this.description = description;
	this.$element = createCard(); //

function createCard() {
	// TWORZENIE KLOCKÓW
	var $card = $('<li>').addClass('card'),
		$cardDescription = $('<p>').addClass('card-description').text(self.description),
		$card_ok = $('<button>').addClass('btn-ok').text('v'),
		$cardDelete = $('<button>').addClass('btn-delete1').text('x');

// PRZYPIĘCIE ZDARZENIA
$cardDelete.click(function(){
    self.removeCard();
});

// SKŁADANIE I ZWRACANIE KARTY
$card.append($cardDelete)
    .append($cardDescription);

  return $card;
}
}

Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
};

var board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
      	this.$element.append(column.$element);
      	initSortable();
    },
    $element: $('#board .column-container')
};

function initSortable() {
    $('.column-list').sortable({
      	connectWith: '.column-list',
      	placeholder: 'card-placeholder'
    }).disableSelection();
}

$('.create-column')
  	.click(function(){
		var name = prompt('Wpisz nazwę kolumny'),
			column = new Column(name);
    	board.addColumn(column);
});

// TWORZENIE KOLUMN
	var todoColumn = new Column('Do zrobienia'),
	doingColumn = new Column('W trakcie'),
	doneColumn = new Column('Skończone');

// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

});

