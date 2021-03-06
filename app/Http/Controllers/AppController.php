<?php

namespace App\Http\Controllers;


use App\Models\Category;
use App\Models\Main;
use Illuminate\Http\Request;
use App\Libs\Breadcrumbs;
use Illuminate\Support\Str;
use Illuminate\Pagination\Paginator;

class AppController extends Controller
{
    protected $namespaceModels;
    protected $namespaceHelpers;

    protected $statusActive;
    protected $perPage;
    protected $breadcrumbs;

    protected $userTable = 'users';
    protected $userModel = 'App\\Models\\User';
    protected $viewPath;


    public function __construct()
    {
        parent::__construct();

        $namespaceModels = $this->namespaceModels = config('add.namespace_models');
        $namespaceHelpers = $this->namespaceHelpers = config('add.namespace_helpers');

        $statusActive = $this->statusActive = config('add.page_statuses')[1] ?: 'active';
        $this->perPage = config('add.pagination');
        $this->breadcrumbs = new Breadcrumbs();

        // Пагинация Bootstrap
        Paginator::useBootstrap();


        // Если пользователь зашёл по UTM метке, то сохраним её в сессию utm
        if ($utmSource = request()->query('utm_source')) {
            session()->put('utm.source', $utmSource);
            $get = request()->query();
            foreach ($get as $name => $value) {
                if (Str::is('utm*', $name)) {
                    $utm[$name] = $value;
                }
            }
            if (!empty($utm)) {
                $utm = serialize($utm);
                session()->put('utm.all', $utm);
            }
        }


        // Строка поиска
        $searchQuery = s(request()->query('s')) ?: Main::get('search_query');

        // Только внутри этой конструкции работают некоторые методы
        $this->middleware(function ($request, $next) {

            if (auth()->check()) {

                // Сохраняем в сессию страницу с которой пользователь перешёл из админки
                $previousUrl = url()->previous();
                $adminPrefix = config('add.admin');
                if (Str::is("*{$adminPrefix}*", $previousUrl)) { // Если url не содержит админский префикс
                    session()->put('back_link_admin', $previousUrl);
                }
            }

            // Вручную аутентифицировать каждого пользователя как тестового
            /*if (!auth()->check()) {
                $user = $this->userModel::find(4);
                auth()->login($user);
            }*/

            return $next($request);
        });


        // Получаем все категории, кэшируем запрос
        if (cache()->has('categories_all')) {
            $cats = cache()->get('categories_all');
        } else {
            $cats = Category::select('id', 'parent_id', 'title', 'slug', 'img')
                ->active()
                ->orderBy('sort')
                ->get()
                ->keyBy('id')
                ->toArray();
            cache()->forever('categories_all', $cats);
        }



        // Удалить все кэши
        //cache()->flush();


        // Передаём в виды
        view()->share(compact('namespaceHelpers', 'namespaceModels', 'statusActive', 'searchQuery', 'cats'));
    }
}
