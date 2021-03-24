<?php

namespace App\Http\Controllers\Admin;

use App\Http\Traits\TAdminBaseController;

class LabelController extends AppController
{
    // Связанные таблицы для удаления
    protected $relatedDelete = [

        // Товары
        'products',
    ];


    // Массив гет ключей для поиска
    protected $queryArr = [
        'title',
        'icon',
        'color',
        'status',
        'sort',
        'id',
    ];


    // Передать поля для вывода в index виде
    protected $thead = [
        'title' => null,
        'icon' => null,
        'status' => 'l',
        'sort' => null,
        'id' => null,
    ];



    use TAdminBaseController;
}
