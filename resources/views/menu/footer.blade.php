@php


    $menuTop = Menu::get(1, 'footer_menu');


@endphp
@if($menuTop->count())
    <nav>
        <ul class="nav justify-content-center">
            @foreach($menuTop as $key => $item)
                <li class="nav-item">
                    <a
                        href="{{ url($item['slug']) }}"
                        class="nav-link"
                        {{ $item['target'] ? ' target="_blank"' : null }}>{{ l($item['title']) }}</a>
                </li>
            @endforeach
        </ul>
    </nav>
@endif
