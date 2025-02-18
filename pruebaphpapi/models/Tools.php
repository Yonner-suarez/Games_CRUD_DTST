<?php
class Tools
{   
  public $name;
  public $description;
  public $price;
  public $stock;
  public $image;

  public function __construct($name, $description, $price, $stock, $image)
  {
    $this->name = $name;
    $this->description = $description;
    $this->price = $price;
    $this->stock = $stock;
    $this->image = $image;
  }
}

