<?php

namespace App\Http\Controllers\Admin;

use App\Http\Traits\TAdminBaseController;

class ProductController extends AppController
{
    // Связанные таблицы для удаления
    protected $relatedTables = [

        // Категории
        'categories',

        // Модификаторы
        //'modifier_groups',

        // Цвета
        'colors',

        // Фильтры
        'filters',

        // Лэйблы
        'labels',
    ];


    // Связанные методы в моделе. Многие ко многим.
    protected $relatedMethods = [

        // Сопутствующие товары
        'related',
    ];


    protected $relatedManyToOne = [
        // Бренды
        'brands',
    ];


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
        'price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/', // numeric
        'old_price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
        'discount' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
    ];

    // Правила валидации для метода Update
    protected $validateUpdate = [
        'title' => 'required|string|max:250',
        'slug' => 'required|string|unique:$this->table,slug,$id|max:250',
        'price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
        'old_price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
        'discount' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
    ];



    use TAdminBaseController;
}
