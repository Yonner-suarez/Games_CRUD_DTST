<?php

class Console {
    public $value;
    public $label;

    public function __construct($id, $name) {
        $this->value = $id;
        $this->label = $name;
    }
}

class Game {   
    public $name;
    public $description;
    public $code;
    public $numberOfPlayers;
    public $releaseYear;
    public $image;
    public $console; // Objeto Console asociado

    public function __construct($name, $description, $code, $numberOfPlayers, $releaseYear, $image, Console $console) {
        $this->name = $name;
        $this->description = $description;
        $this->code = $code;
        $this->numberOfPlayers = $numberOfPlayers;
        $this->releaseYear = $releaseYear;
        $this->image = $image;
        $this->console = $console; // Asignamos la consola
    }
}
