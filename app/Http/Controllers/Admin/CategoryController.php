<?php

namespace App\Http\Controllers\Admin;

use App\Http\Traits\TAdminBaseController;

class CategoryController extends AppController
{
    // Массив гет ключей для поиска
    protected $queryArr = [
        'title',
        'slug',
        'status',
        'sort',
        'parent_id',
        'id',
    ];


    // Передать поля для вывода в index виде
    protected $thead = [
        'img' => 'img',
        'title' => null,
        'slug' => null,
        'status' => 'l',
        'sort' => null,
        'parent_id' => null,
        'id' => null,
    ];


    // Правила валидации для метода Store
    protected $validateStore = [
        'title' => 'required|string|max:250',
        'slug' => 'required|string|unique:$this->table|max:250',
        'img' => 'nullable|mimes:$imagesExt',
    ];

    // Правила валидации для метода Update
    protected $validateUpdate = [
        'parent_id' => 'required|integer|min:0',
        'title' => 'required|string|max:250',
        'slug' => 'required|string|unique:$this->table,slug,$id|max:250',
        'img' => 'nullable|mimes:$magesExt',
    ];


    // Чексбоксы в таблице, перечислить с массиве
    protected $checkboxInTable = [
        'hide'
    ];



    use TAdminBaseController;
}
