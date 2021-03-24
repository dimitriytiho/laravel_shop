<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Admin\DbSort;
use App\Http\Traits\TAdminBaseController;
use App\Models\Modifier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ModifierController extends AppController
{
    // Является наследником для связанного элемента
    protected $belongChildren = true;

    // Условие выборки, название колонки
    protected $belongColumn = 'parent_id';

    // Связанная таблица, должен быть метод в моделе с названием таблицы
    protected $belongTable = 'modifier_groups';

    // Связанный маршрут
    protected $belongRoute = 'modifier-group';

    // Связанный элемент, возможность удалить
    //protected $belongDelete = false;


    // Массив гет ключей для поиска
    protected $queryArr = [
        'title',
        'price',
        'status',
        'sort',
        'parent_id',
        'id',
    ];


    // Передать поля для вывода в index виде
    protected $thead = [
        'title' => null,
        'price' => null,
        'status' => 'l',
        'sort' => null,
        'parent_id' => null,
        'id' => null,
    ];


    // Правила валидации для метода Store
    protected $validateStore = [
        'parent_id' => 'required|integer|min:0',
        'title' => 'required|string|unique:$this->table|max:250',
    ];

    // Правила валидации для метода Update
    protected $validateUpdate = [
        'parent_id' => 'required|integer|min:0',
        'title' => 'required|string|unique:$this->table,title,$id|max:250',
    ];


    // Чексбоксы в таблице, перечислить с массиве
    protected $checkboxInTable = [
        'default'
    ];



    use TAdminBaseController;
}
