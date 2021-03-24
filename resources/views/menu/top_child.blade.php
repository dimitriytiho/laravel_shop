@if(!empty($viewName) && isset($item) && isset($id) && isset($i))
    <li class="{{ isset($item['child']) ? 'dropdown' : null }}">
        <a
            href="{{ route('category', $item['slug']) }}"
            class="dropdown-item {{ isset($item['child']) ? 'dropdown-toggle' : null }} {{ Str::contains(request()->path(), $item['slug']) ? 'active' : null }}">{{ $item['title'] }}</a>
        @isset($item['child'])
            <ul class="dropdown-menu">
                {!! Menu::getView($viewName, $item['child']) !!}
            </ul>
        @endisset
    </li>
@endif
