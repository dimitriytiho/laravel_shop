<?php

namespace App\Http\Controllers\Admin;

use App\Http\Traits\TAdminBaseController;

class ColorController extends AppController
{

    // Связанные таблицы для удаления
    protected $relatedDelete = [

        // Товары
        'products',
    ];


    // Массив гет ключей для поиска
    protected $queryArr = [
        'title',
        'code',
        'sort',
        'id',
    ];


    // Передать поля для вывода в index виде
    protected $thead = [
        'img' => 'img',
        'title' => null,
        'code' => null,
        'sort' => null,
        'id' => null,
    ];


    // Правила валидации для метода Store
    protected $validateStore = [
        'title' => 'required|string|max:250',
        'slug' => 'required|string|unique:$this->table|max:250',
    ];

    // Правила валидации для метода Update
    protected $validateUpdate = [
        'title' => 'required|string|max:250',
        'slug' => 'required|string|unique:$this->table,slug,$id|max:250',
    ];



    use TAdminBaseController;
}
