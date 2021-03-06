<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Main;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use Illuminate\Support\Str;

class PageController extends AppController
{
    public function __construct()
    {
        parent::__construct();

        $class = $this->class = str_replace('Controller', '', class_basename(__CLASS__));
        $c = $this->c = Str::lower($this->class);
        $model = $this->model = "{$this->namespaceModels}\\{$class}";
        $table = $this->table = with(new $model)->getTable();
        $view = $this->view = Str::snake($this->c);

        view()->share(compact('class', 'c', 'model', 'table', 'view'));
    }


    public function index()
    {
        //Mail::to('dimitriyyuliya@gmail.com')->send(new SendMail(__('a.code'), '12345'));

        /*$mobileDetect = new \Mobile_Detect();
        dump($mobileDetect->isMobile());
        dump($mobileDetect->isTablet());*/

        // Удалить все кэши
        //cache()->flush();


        $dbLimit = config('add.db_limit');

        // Получаем максимально 24 категории, сортируем по сортировке, кэшируем запрос
        if (cache()->has('categories_main_page')) {
            $cats = cache()->get('categories_main_page');
        } else {
            $cats = Category::active()
                ->where('hide', '0')
                ->where('parent_id', '0')
                ->orderBy('sort')
                ->orderBy('popular', 'desc')
                ->limit($dbLimit)
                ->get();
            cache()->forever('categories_main_page', $cats);
        }

        // Хлебные крошки
        //$breadcrumbs = $this->breadcrumbs->get();

        $f = __FUNCTION__;
        $title = __('s.' . config('add.title_main'));
        //$description = __('s.You_are_on_home');
        return view("{$this->view}.{$f}", compact('title', 'cats'));
    }


    public function show($slug)
    {
        // Если пользователя есть разрешение к админскому классу, то будут показываться неактивные страницы
        if (checkPermission($this->class)) {

            $values = $this->model::whereSlug($slug)
                ->firstOrFail();

        } else {

            $values = $this->model::whereSlug($slug)
                ->active()
                ->firstOrFail();
        }


        /*
         * Если есть подключаемые файлы (текст в контенте ##!!!inc_name, а сам файл в /app/Modules/views/inc), то они автоматически подключатся.
         * Если нужны данные из БД, то в моделе сделать метод, в котором получить данные и вывести их, в подключаемом файле.
         * Дополнительно, в этот файл передаются данные страницы $values.
         */
        $values->body = Main::inc($values->body, $values);

        // Использовать скрипты в контенте, они будут перенесены вниз страницы.
        $values->body = Main::getDownScript($values->body);


        // Передаём в контейнер id и view элемента
        Main::set('id', $values->id);
        Main::set('view', $this->view);

        // Хлебные крошки
        $breadcrumbs = $this->breadcrumbs
            ->values($this->table)
            ->dynamic($values->id)
            ->get();

        $f = Str::snake(__FUNCTION__);
        $title = $values->title ?? null;
        $description = $values->description ?? null;
        return view("{$this->view}.{$f}", compact('title', 'description', 'values', 'breadcrumbs'));
    }


    public function contactUs(Request $request)
    {
        $f = Str::snake(__FUNCTION__);
        $title = __('s.contact_us');
        $description = ' ';

        // Хлебные крошки
        $breadcrumbs = $this->breadcrumbs
            ->end(['contact_us' => $title])
            ->get();

        return view("{$this->view}.{$f}", compact('title', 'description', 'breadcrumbs'));
    }


    public function successPage(Request $request)
    {
        $f = Str::snake(__FUNCTION__);
        $title = __('s.order_successfully');
        return view("{$this->view}.{$f}", compact('title'));
    }


    // Записать куку через Ajax, после получения ответа перезагрузите страницу
    public function setCookie(Request $request)
    {
        if ($request->ajax()) {
            $name = $request->name ?? null;
            $value = $request->value ?? null;

            if ($name && $value) {

                // Ставим на очередь создание куки
                cookie()->queue($name, $value);
                return 1;
            }
        }
        Main::getError('Request No Ajax', __METHOD__);
    }
}
