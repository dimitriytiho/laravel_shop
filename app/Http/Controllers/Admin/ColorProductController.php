<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Admin\Img;
use App\Http\Traits\TAdminBaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ColorProductController extends AppController
{
    use TAdminBaseController;



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $values = $this->model::findOrFail($id);
        $product = DB::table(config('shop.product_table'))->find($values->product_id);
        $color = DB::table('colors')->find($values->color_id);
        $labels = DB::table('labels')->pluck('title', 'id');

        // id лэйблов записываем в массив
        $values->labels = explode(',', $values->labels);

        $f = __FUNCTION__;
        $title = __("a.{$f}");
        return view("{$this->viewPath}.{$this->view}.{$this->template}", compact('title', 'values', 'product', 'color', 'labels'));
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

        $rules = [
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

        // id лэйблов записываем строкой
        $data['labels'] = empty($data['labels']) ? null : implode(',', $data['labels']);

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
