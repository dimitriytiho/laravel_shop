@php


    $menuTop = Menu::get(1);
    $catTree = Menu::treeOfArr($cats ?? []);
    $i = 0;


@endphp
@if($menuTop->count())
    <nav class="navbar navbar-expand-lg py-2 py-lg-0 navbar-light">
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-toggler" aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <div class="d-flex d-lg-none align-items-center header_nav__mobile">
            <a href="tel:{{ onlyPhoneNumber(Main::site('tel')) }}" class="text-dark header_nav__mobile--tel">{{ Main::site('tel') }}</a>
            <a href="{{ route('cart') }}" class="btn btn-outline-primary btn-sm pulse header_top__icons--cart cart_show">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart_count_sum">{!! session()->has('cart.sum') ? priceFormat(session('cart.sum')) : __('s.cart') !!}</span>
            </a>
        </div>

        <div class="collapse navbar-collapse" id="navbar-toggler">
            <a href="{{ route('index') }}" class="header_nav__logo">
                <picture>
                    <source srcset="{{ asset("{$img}/logo/logotype.svg") }}">
                    <img src="{{ asset("{$img}/logo/logotype.png") }}" class="header_nav__logo--img" alt="{{ Main::site('name') }}">
                </picture>
            </a>
            <ul class="navbar-nav mx-auto header_nav__menu no-wrap smartmenus">
                @foreach($menuTop as $key => $item)
                    @php

                        $active = !$i && Str::contains(request()->path(), ['catalog', 'category', 'product']) || Str::contains(request()->path(), $item['slug']) ? 'active' : null;

                    @endphp
                    <li class="nav-item {{ !$i ? 'dropdown' : null }}">
                        <a
                            href="{{ url($item['slug']) }}"{{ $item['target'] ? ' target="_blank"' : null }}
                        class="nav-link header_nav__menu--a {{ $item['class'] . $active }} {{ !$i ? 'dropdown-toggle' : null }}">{{ l($item['title']) }}</a>
                        @if(!$i)
                            <ul class="dropdown-menu">
                                {!! Menu::getView('top_child', $catTree) !!}
                            </ul>
                        @endif
                    </li>
                    @php

                        $i++;

                    @endphp
                @endforeach
            </ul>
            <a href="{{ route('login') }}" class="d-block d-lg-none text-{{ request()->path() === 'home' ? 'primary' : 'dark' }} mt-2 mb-4">@lang(auth()->check() ? 's.account' : 's.login')</a>
        </div>
    </nav>
@endif
