<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Admin\DbSort;
use App\Helpers\Admin\Img;
use App\Http\Traits\TAdminBaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use App\Models\PortfolioGallery;

class PortfolioGalleryController extends AppController
{
    // Связанные таблицы для удаления
    protected $relatedDelete = [

        // Портфолио
        'portfolios',
    ];


    // Связанная таблица, должен быть метод в моделе с названием таблицы
    protected $belongTable = 'portfolios';


    // Массив гет ключей для поиска
    protected $queryArr = [
        'title',
        'status',
        'sort',
        'id',
    ];


    // Передать поля для вывода в index виде
    protected $thead = [
        'img' => 'img',
        'title' => null,
        'status' => 'l',
        'sort' => null,
        'id' => null,
    ];


    protected $imgSize = 'imgMaxSizeHD';


    // Правила валидации для метода Store
    protected $validateStore = [
        'portfolio_id' => 'required|integer',
        'title' => 'required|string|max:250',
        'img' => 'required|mimes:$imagesExt|max:2000',
    ];

    // Правила валидации для метода Update
    protected $validateUpdate = [
        'portfolio_id' => 'required|integer',
        'title' => 'required|string|max:250',
        'img' => 'required|mimes:$imagesExt|max:2000',
    ];



    use TAdminBaseController;
}
