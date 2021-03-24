<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Admin\Img;
use App\Http\Traits\TAdminBaseController;
use App\Models\Main;
use App\Helpers\Admin\DbSort;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PortfolioController extends AppController
{
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
        'preview' => 'img',
        'title' => 'l',
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
    /*protected $validateUpdate = [
        'parent_id' => 'nullable|integer|min:0',
        'title' => 'required|string|max:250',
        'slug' => 'required|string|unique:$this->table,slug,$id|max:250',
    ];*/



    use TAdminBaseController;



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'title' => 'required|string|max:250',
            'slug' => "required|string|unique:{$this->table}|max:250",
        ];
        $request->validate($rules);
        $data = $request->all();

        if ($request->hasFile('img')) {

            // Обработка картинки
            $data['img'] = Img::upload($request, $this->class, null, config('admin.imgMaxSizeHD'));
            Img::copyWebp($data['img']);

            // Картинка preview
            $data['preview'] = Img::upload($request, $this->class, null, null, 'img', true);
            Img::copyWebp($data['preview']);

        } else {

            // Если нет картинки
            $data['img'] = config("admin.img{$this->class}Default");
            $data['preview'] = config("admin.img{$this->class}Default");
        }


        // Создаём экземкляр модели
        $values = new $this->model();

        // Заполняем модель новыми данными
        $values->fill($data);

        // Сохраняем элемент
        $values->save();

        // Удалить все кэши
        cache()->flush();

        // Сообщение об успехе
        return redirect()
            ->route("admin.{$this->route}.edit", $values->id)
            ->with('success', __('s.created_successfully', ['id' => $values->id]));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Получаем элемент по id, если нет - будет ошибка
        $values = $this->model::findOrFail($id);

        // Валидация
        $rules = [
            'parent_id' => 'nullable|integer',
            'title' => 'required|string|max:250',
            'slug' => "required|string|unique:{$this->table},slug,{$id}|max:250",
        ];
        $request->validate($rules);
        $data = $request->all();

        if ($request->hasFile('img')) {

            // Обработка картинки
            $data['img'] = Img::upload($request, $this->class, $values->img, config('admin.imgMaxSizeHD'));
            Img::copyWebp($data['img']);

            // Картинка preview
            $data['preview'] = Img::upload($request, $this->class, $values->preview, null, 'img', true);
            Img::copyWebp($data['preview']);

        } else {

            // Если нет картинки
            $data['img'] = $values->img;
            $data['preview'] = $values->preview;
        }

        // Заполняем модель новыми данными
        $values->fill($data);

        // Обновляем элемент
        $values->update();

        // Удалить все кэши
        cache()->flush();

        // Сообщение об успехе
        return redirect()
            ->route("admin.{$this->route}.edit", $values->id)
            ->with('success', __('s.saved_successfully', ['id' => $values->id]));
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Получаем элемент по id, если нет - будет ошибка
        $values = $this->model::findOrFail($id);

        // Удалим картинки галереи
        Img::deleteImgAll('portfolio_galleries', "{$this->view}_id", $id);

        // Удаляем связанные элементы галлереи из БД
        if ($values->portfolio_galleries->count()) {
            DB::table('portfolio_galleries')
                ->whereIn('id', $values->portfolio_galleries->pluck('id'))
                ->delete();
        }

        // Удаляем элемент
        $values->delete();


        // Удалим картинку предпросмотра с сервера, кроме картинки по-умолчанию
        Img::deleteImg($values->preview, config("admin.img{$this->class}Default"));

        // Удалим картинку с сервера, кроме картинки по-умолчанию
        Img::deleteImg($values->img, config("admin.img{$this->class}Default"));


        // Удалить все кэши
        cache()->flush();

        // Сообщение об успехе
        return redirect()
            ->route("admin.{$this->route}.index")
            ->with('success', __('s.removed_successfully', ['id' => $values->id]));
    }
}
