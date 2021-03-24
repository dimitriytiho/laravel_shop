<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Admin\DbSort;
use App\Helpers\Admin\Img;
use App\Helpers\Date;
use App\Http\Traits\TAdminBaseController;
use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class PromoController extends AppController
{
    // Связанные таблицы для удаления
    protected $relatedTables = [

        // Товары
        'products',
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
        'price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
        'old_price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
        'discount' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
    ];

    // Правила валидации для метода Update
    /*protected $validateUpdate = [
        'title' => 'required|string|max:250',
        'slug' => 'required|string|unique:$this->table,slug,$id|max:250',
        'price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
        'old_price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
        'discount' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
    ];*/



    use TAdminBaseController;



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

        $rules = [
            'title' => 'required|string|max:250',
            'slug' => "required|string|unique:{$this->table},slug,{$id}|max:250",
            'price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
            'old_price' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
            'discount' => 'nullable|regex:/^\d+(\.\d{1,2})?$/',
        ];
        $request->validate($rules);
        $data = $request->all();

        if ($request->hasFile('img')) {

            // Обработка картинки
            $data['img'] = Img::upload($request, $this->class, $values->img);
            Img::copyWebp($data['img']);

        } else {

            // Если нет картинки
            $data['img'] = $values->img;
        }

        // Записываем дату в нужном формате
        if (!empty($data['start'])) {
            $date = explode(' - ', $data['start']);
            $data['start'] = empty($date[0]) ? null : Date::toTimestamp($date[0]);
            $data['end'] = empty($date[1]) ? null : Date::toTimestamp($date[1]);
        }

        // Если нет body, то ''
        if (empty($data['body'])) {
            $data['body'] = '';
        }


        // Сохраняем связи
        if (!empty($this->relatedTables)) {
            foreach ($this->relatedTables as $relatedTable) {
                $values->$relatedTable()->sync($request->$relatedTable);
            }
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
}
