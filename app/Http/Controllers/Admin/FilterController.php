<?php

namespace App\Http\Controllers\Admin;

use App\Http\Traits\TAdminBaseController;

class FilterController extends AppController
{
    // Связанные таблицы для удаления
    protected $relatedDelete = [

        // Товары
        'products',
    ];


    // Является наследником для связанного элемента
    protected $belongChildren = true;

    // Условие выборки, название колонки
    protected $belongColumn = 'parent_id';

    // Связанная таблица, должен быть метод в моделе с названием таблицы
    protected $belongTable = 'filter_groups';

    // Связанный маршрут
    protected $belongRoute = 'filter-group';


    // Массив гет ключей для поиска
    protected $queryArr = [
        'title',
        'slug',
        'status',
        'sort',
        'id',
    ];


    // Передать поля для вывода в index виде
    protected $thead = [
        'img' => 'img',
        'title' => null,
        'slug' => null,
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
        'parent_id' => 'required|integer|min:0',
        'title' => 'required|string|max:250',
        'slug' => 'required|string|unique:$this->table,slug,$id|max:250',
    ];


    // Чексбоксы в таблице, перечислить с массиве
    protected $checkboxInTable = [
        'default'
    ];



    use TAdminBaseController;
}
