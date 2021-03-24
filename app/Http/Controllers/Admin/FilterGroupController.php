<?php

namespace App\Http\Controllers\Admin;

use App\Http\Traits\TAdminBaseController;

class FilterGroupController extends AppController
{
    // Связанные таблицы для удаления
    protected $relatedDelete = [

        // Фильтры
        'filters',
    ];


    // Связанная таблица, должен быть метод в моделе с названием таблицы
    protected $belongTable = 'filters';


    // Массив гет ключей для поиска
    protected $queryArr = [
        'title',
        'slug',
        'type',
        'function',
        'status',
        'sort',
        'id',
    ];


    // Передать поля для вывода в index виде
    protected $thead = [
        'title' => null,
        'slug' => null,
        'type' => null,
        'status' => 'l',
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
