<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Admin\DbSort;
use App\Http\Traits\TAdminBaseController;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends AppController
{
    // Массив гет ключей для поиска
    protected $queryArr = [
        'status',
        'user_id',
        'id',
    ];


    // Передать поля для вывода в index виде
    protected $thead = [
        'status' => 'l', // Вместо user_id покажем данные пользователя
        'user_id' => null, // Вместо user_id покажем данные пользователя
        'id' => null,
    ];


    // Правила валидации для метода Update
    protected $validateUpdate = [
        'note' => 'nullable|string',
        'status' => 'nullable|string|max:100',
    ];



    use TAdminBaseController;



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Получаем элемент по id, если нет - будет ошибка
        $values = $this->model::findOrFail($id);

        $products = $values->products->count() ? $values->products->keyBy('id')->toArray() : [];

        $f = __FUNCTION__;
        $title = __("a.{$f}");
        return view("{$this->viewPath}.{$this->view}.{$this->template}", compact('title', 'values', 'products'));
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


        // Удаляем товары из таблицы order_product
        OrderProduct::where('order_id', $id)->delete();


        // Удаляем элемент
        $values->delete();

        // Удалить все кэши
        cache()->flush();

        // Сообщение об успехе
        return redirect()
            ->route("admin.{$this->route}.index")
            ->with('success', __('s.removed_successfully', ['id' => $values->id]));
    }
}
