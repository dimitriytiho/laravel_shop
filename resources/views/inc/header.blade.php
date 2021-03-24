<header class="container-fluid header_fluid">
    <div class="container header">
        <div class="d-none d-lg-block">
            <div class="row header_top">
                <a href="{{ route('index') }}" class="col header_top__logo">
                    <picture>
                        <source srcset="{{ asset("{$img}/logo/logotype.svg") }}">
                        <img src="{{ asset("{$img}/logo/logotype.png") }}" class="header_top__logo--img" alt="{{ Main::site('name') }}">
                    </picture>
                </a>
                <form action="{{ route('search') }}" class="col search_js header_top__search icon_in_input search_js" autocomplete="off">
                    <div class="form-group">
                        <label for="search" class="sr-only">@lang('a.search')</label>
                        <input type="text" class="form-control header_top__search--input search_js__input" id="search" name="s" placeholder="@lang('a.search')" aria-label="Search" value="{{ $searchQuery ?? null }}">
                    </div>
                    <button type="submit" class="btn header_top__search--btn">
                        <i class="fas fa-search"></i>
                    </button>
                    <div class="search_js__child a-black remove_active"></div>
                </form>
                <div class="col a-black header_top__tel">
                    <a href="tel:+{{ onlyPhoneNumber(Main::site('tel')) }}" itemprop="telephone" content="+{{ onlyPhoneNumber(Main::site('tel')) }}" class="h5 header_top__tel--item">{{ Main::site('tel') }}</a>
                </div>
                <div class="col header_top__icons px-0">
                    <a href="{{ route('login') }}" class="btn header_top__icons--auth">
                        <i class="fas fa-user"></i>
                        <span>@lang(auth()->check() ? 's.account' : 's.login')</span>
                    </a>
                    <a href="{{ route('cart') }}" class="btn btn-outline-primary btn-sm pulse header_top__icons--cart cart_show">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart_count_sum">{!! session()->has('cart.sum') ? priceFormat(session('cart.sum')) : __('s.cart') !!}</span>
                    </a>
                </div>
            </div>
        </div>
        @include('menu.top')
    </div>
</header>
